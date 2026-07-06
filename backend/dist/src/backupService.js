"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonBackup = createJsonBackup;
exports.listBackups = listBackups;
exports.getBackupById = getBackupById;
exports.getBackupFilePath = getBackupFilePath;
exports.deleteBackup = deleteBackup;
exports.restoreFromBackup = restoreFromBackup;
exports.cleanupOldBackups = cleanupOldBackups;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("./prisma");
// ===== Configuration =====
const BACKUPS_DIR = path_1.default.join(__dirname, '../backups');
const MAX_BACKUPS_DEFAULT = 10;
// Ensure backups directory exists
function ensureBackupsDir() {
    if (!fs_1.default.existsSync(BACKUPS_DIR)) {
        fs_1.default.mkdirSync(BACKUPS_DIR, { recursive: true });
    }
}
// ===== Core Functions =====
/**
 * Create a versioned JSON backup of the entire database.
 * File is named with ISO timestamp for easy sorting and identification.
 */
async function createJsonBackup() {
    ensureBackupsDir();
    console.log('[Backup] Creating JSON backup...');
    // Fetch all data from database
    const [characters, weapons, artifacts, materials] = await Promise.all([
        prisma_1.prisma.character.findMany({
            include: {
                bestWeapons: { orderBy: [{ rank: 'asc' }, { id: 'asc' }] },
                bestArtifacts: { orderBy: [{ order: 'asc' }, { id: 'asc' }] },
                teams: {
                    include: { members: { orderBy: { id: 'asc' } } },
                    orderBy: [{ order: 'asc' }, { id: 'asc' }]
                }
            }
        }),
        prisma_1.prisma.weapon.findMany({ orderBy: [{ rarity: 'desc' }, { nameEn: 'asc' }] }),
        prisma_1.prisma.artifactSet.findMany({ orderBy: [{ id: 'asc' }] }),
        prisma_1.prisma.material.findMany({ orderBy: { nameEn: 'asc' } }),
    ]);
    const stats = {
        characters: characters.length,
        weapons: weapons.length,
        artifacts: artifacts.length,
        materials: materials.length,
    };
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    const filename = `backup_${timestamp}.json`;
    const id = timestamp;
    const backupPayload = {
        metadata: {
            id,
            filename,
            createdAt: now.toISOString(),
            version: '1.0',
            stats,
        },
        data: {
            characters,
            weapons,
            artifacts,
            materials,
        },
    };
    const filePath = path_1.default.join(BACKUPS_DIR, filename);
    const content = JSON.stringify(backupPayload, null, 2);
    fs_1.default.writeFileSync(filePath, content, 'utf-8');
    const sizeBytes = Buffer.byteLength(content, 'utf-8');
    console.log(`[Backup] Created: ${filename} (${(sizeBytes / 1024).toFixed(1)} KB) — ${stats.characters} chars, ${stats.weapons} weapons, ${stats.artifacts} artifacts, ${stats.materials} materials`);
    // Auto-cleanup old backups
    await cleanupOldBackups(MAX_BACKUPS_DEFAULT);
    return {
        id,
        filename,
        createdAt: now.toISOString(),
        sizeBytes,
        stats,
    };
}
/**
 * List all available backups, sorted newest first.
 */
function listBackups() {
    ensureBackupsDir();
    const files = fs_1.default.readdirSync(BACKUPS_DIR)
        .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
        .sort()
        .reverse();
    return files.map(filename => {
        const filePath = path_1.default.join(BACKUPS_DIR, filename);
        const stat = fs_1.default.statSync(filePath);
        // Read metadata from file without loading full data
        try {
            const raw = fs_1.default.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(raw);
            const meta = parsed.metadata;
            return {
                id: meta.id,
                filename: meta.filename,
                createdAt: meta.createdAt,
                sizeBytes: stat.size,
                stats: meta.stats,
            };
        }
        catch {
            // Fallback for corrupted files
            return {
                id: filename.replace('backup_', '').replace('.json', ''),
                filename,
                createdAt: stat.mtime.toISOString(),
                sizeBytes: stat.size,
                stats: { characters: 0, weapons: 0, artifacts: 0, materials: 0 },
            };
        }
    });
}
/**
 * Get a specific backup by ID (includes full data).
 */
function getBackupById(id) {
    ensureBackupsDir();
    const filename = `backup_${id}.json`;
    const filePath = path_1.default.join(BACKUPS_DIR, filename);
    if (!fs_1.default.existsSync(filePath))
        return null;
    try {
        const raw = fs_1.default.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        const stat = fs_1.default.statSync(filePath);
        return {
            info: {
                id: parsed.metadata.id,
                filename: parsed.metadata.filename,
                createdAt: parsed.metadata.createdAt,
                sizeBytes: stat.size,
                stats: parsed.metadata.stats,
            },
            data: parsed.data,
        };
    }
    catch {
        return null;
    }
}
/**
 * Get the file path of a backup (for REST download endpoint).
 */
function getBackupFilePath(id) {
    const filename = `backup_${id}.json`;
    const filePath = path_1.default.join(BACKUPS_DIR, filename);
    if (!fs_1.default.existsSync(filePath))
        return null;
    return filePath;
}
/**
 * Delete a specific backup by ID.
 */
function deleteBackup(id) {
    const filename = `backup_${id}.json`;
    const filePath = path_1.default.join(BACKUPS_DIR, filename);
    if (!fs_1.default.existsSync(filePath))
        return false;
    fs_1.default.unlinkSync(filePath);
    console.log(`[Backup] Deleted: ${filename}`);
    return true;
}
/**
 * Restore the database from a backup.
 * This will CLEAR all existing data and replace it with backup data.
 */
async function restoreFromBackup(id) {
    const backup = getBackupById(id);
    if (!backup)
        throw new Error(`Backup not found: ${id}`);
    console.log(`[Backup] Restoring from: ${backup.info.filename}...`);
    const { characters, weapons, artifacts, materials } = backup.data;
    // Use a transaction to ensure atomicity
    await prisma_1.prisma.$transaction(async (tx) => {
        // Clear all existing data (in dependency order)
        await tx.teamMember.deleteMany();
        await tx.characterTeam.deleteMany();
        await tx.characterWeapon.deleteMany();
        await tx.characterArtifact.deleteMany();
        await tx.character.deleteMany();
        await tx.weapon.deleteMany();
        await tx.artifactSet.deleteMany();
        await tx.material.deleteMany();
        // Restore weapons
        for (const w of weapons) {
            const { id: wId, ...rest } = w;
            await tx.weapon.create({ data: { id: wId, ...rest } });
        }
        // Restore artifact sets
        for (const a of artifacts) {
            const { id: aId, ...rest } = a;
            await tx.artifactSet.create({ data: { id: aId, ...rest } });
        }
        // Restore materials
        for (const m of materials) {
            const { id: mId, ...rest } = m;
            await tx.material.create({ data: { id: mId, ...rest } });
        }
        // Restore characters with relations
        for (const char of characters) {
            const { bestWeapons, bestArtifacts, teams, ...charData } = char;
            await tx.character.create({ data: charData });
            // Restore character weapons
            if (bestWeapons && bestWeapons.length > 0) {
                for (const w of bestWeapons) {
                    const { id: bwId, ...rest } = w;
                    await tx.characterWeapon.create({ data: { id: bwId, ...rest } });
                }
            }
            // Restore character artifacts
            if (bestArtifacts && bestArtifacts.length > 0) {
                for (const a of bestArtifacts) {
                    const { id: baId, ...rest } = a;
                    await tx.characterArtifact.create({ data: { id: baId, ...rest } });
                }
            }
            // Restore teams
            if (teams && teams.length > 0) {
                for (const t of teams) {
                    const { members, id: tId, ...teamData } = t;
                    await tx.characterTeam.create({
                        data: {
                            id: tId,
                            ...teamData,
                            members: {
                                create: members.map((m) => {
                                    const { id: mId, teamId, ...memberData } = m;
                                    return memberData;
                                }),
                            },
                        },
                    });
                }
            }
        }
    });
    console.log(`[Backup] Restore complete! ${characters.length} chars, ${weapons.length} weapons, ${artifacts.length} artifacts, ${materials.length} materials`);
    return true;
}
/**
 * Cleanup old backups, keeping only the N most recent.
 * Returns the number of deleted backups.
 */
async function cleanupOldBackups(keepCount = MAX_BACKUPS_DEFAULT) {
    ensureBackupsDir();
    const files = fs_1.default.readdirSync(BACKUPS_DIR)
        .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
        .sort()
        .reverse();
    if (files.length <= keepCount)
        return 0;
    const toDelete = files.slice(keepCount);
    for (const filename of toDelete) {
        fs_1.default.unlinkSync(path_1.default.join(BACKUPS_DIR, filename));
        console.log(`[Backup] Cleanup: deleted ${filename}`);
    }
    console.log(`[Backup] Cleanup complete: deleted ${toDelete.length} old backup(s), keeping ${keepCount}`);
    return toDelete.length;
}
