"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resetArtifactSetLookup = resetArtifactSetLookup;
const enka_network_api_1 = require("enka-network-api");
const enka = new enka_network_api_1.EnkaClient({ defaultLanguage: 'en' });
const cache_1 = require("./cache");
const mutations_1 = require("./mutations");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const prisma_1 = require("./prisma");
const backupService_1 = require("./backupService");
// Map mix set name → component set Vietnamese names
const mixSetsMap = {
    "Mix 2 bộ Trái Tim Trầm Luân & 2 bộ Thiên Nham Vững Chắc": ["Trái Tim Trầm Luân", "Thiên Nham Vững Chắc"],
    "Mix 2 bộ Nghi Thức Tông Thất Cổ & 2 bộ Thiên Nham Vững Chắc": ["Nghi Thức Tông Thất Cổ", "Thiên Nham Vững Chắc"],
    "Mix 2 bộ Giấc Mộng Hoàng Kim & 2 bộ Thiên Nham Vững Chắc": ["Giấc Mộng Hoàng Kim", "Thiên Nham Vững Chắc"],
    "Mix 2 bộ Sát Thương Hỏa & 2 bộ Tinh Thông / HP": ["Diệm Liệt Ma Nữ Cháy Rực", "Đoàn Hát Lang Thang Đại Lục", "Thiên Nham Vững Chắc"],
    "Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn": ["Như Sấm Thịnh Nộ", "Nghi Thức Tông Thất Cổ", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Dấu Ấn Ngăn Cách"],
    "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc": ["Vầng Sáng Vourukasha", "Thiên Nham Vững Chắc"],
    "Mix 2 bộ Thiên Nham Vững Chắc & 2 bộ Giấc Mộng Hoàng Kim": ["Thiên Nham Vững Chắc", "Giấc Mộng Hoàng Kim"],
    "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Giấc Mộng Hoàng Kim": ["Vầng Sáng Vourukasha", "Giấc Mộng Hoàng Kim"],
    "Mix 2 bộ Thủy / HP / Thợ Săn": ["Trái Tim Trầm Luân", "Thiên Nham Vững Chắc", "Thợ Săn Marechaussee"],
    "Mix 2 bộ Thủy / Đoàn Kịch / HP / Dấu Ấn": ["Trái Tim Trầm Luân", "Đoàn Kịch Hoàng Kim", "Thiên Nham Vững Chắc", "Dấu Ấn Ngăn Cách"],
    "Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu": ["Lửa Trắng Xám", "Kỵ Sĩ Đạo Nhuốm Máu"],
    "Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ": ["Dấu Ấn Ngăn Cách", "Physical DMG +25% set"],
    "Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp": ["Lửa Trắng Xám", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Nghi Thức Tông Thất Cổ", "Thiên Nham Vững Chắc"],
    "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất": ["Dấu Ấn Ngăn Cách", "Thiên Nham Vững Chắc", "Trái Tim Trầm Luân", "Nghi Thức Tông Thất Cổ"],
    "Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu": ["Đoàn Hát Lang Thang Đại Lục", "Ký Ức Rừng Sâu"],
    "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn": ["Lễ Bế Mạc Của Giác Đấu Sĩ", "Diệm Liệt Ma Nữ Cháy Rực", "Thợ Săn Marechaussee"],
    "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công": ["Diệm Liệt Ma Nữ Cháy Rực", "Đoàn Hát Lang Thang Đại Lục", "Lễ Bế Mạc Của Giác Đấu Sĩ"],
    "Mix 2 bộ Tinh Thông / Dấu Ấn": ["Đoàn Hát Lang Thang Đại Lục", "Dấu Ấn Ngăn Cách"],
    "Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công": ["Diệm Liệt Ma Nữ Cháy Rực", "Nghi Thức Tông Thất Cổ", "Lễ Bế Mạc Của Giác Đấu Sĩ"],
    "Mix 2 bộ Tấn Công / Hiệu Quả Nạp": ["Lễ Bế Mạc Của Giác Đấu Sĩ", "Dấu Ấn Ngăn Cách"],
    "Mix 2 món Ma Nữ / Tông Thất / Tấn Công / Tinh Thông / Dấu Ấn": ["Diệm Liệt Ma Nữ Cháy Rực", "Nghi Thức Tông Thất Cổ", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Đoàn Hát Lang Thang Đại Lục", "Dấu Ấn Ngăn Cách"],
    "Mix 2 bộ Ma Nữ / Tấn Công / Tinh Thông / Hiệu Quả Nạp": ["Diệm Liệt Ma Nữ Cháy Rực", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Đoàn Hát Lang Thang Đại Lục", "Dấu Ấn Ngăn Cách"],
    "Mix 2 bộ Hiệu Quả Nạp +20%": ["Dấu Ấn Ngăn Cách", "Kẻ Lưu Đày", "Học Sĩ"],
    "Mix 2 bộ Thủy & 2 bộ Tấn Công": ["Trái Tim Trầm Luân", "Giấc Mộng Thủy Tiên", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Dòng Hồi Ức Bất Tận", "Dư Âm Tế Lễ", "Thần Sa Vãng Sinh Lục"],
    "Mix 2 bộ Trị Liệu / Thủy / HP": ["Thiếu Nữ Đáng Yêu", "Xà Cừ Đại Dương", "Trái Tim Trầm Luân", "Giấc Mộng Thủy Tiên", "Thiên Nham Vững Chắc", "Vầng Sáng Vourukasha"],
};
// Collect all unique artifact set names from a mix map key
function getAllMixComponentNames() {
    const names = new Set();
    for (const components of Object.values(mixSetsMap)) {
        for (const name of components) {
            if (name !== "Physical DMG +25% set")
                names.add(name);
        }
    }
    return Array.from(names);
}
// LRU Caches are now imported from ./cache
// Pre-warm artifact set lookup cache (all sets + mix components in 1 query)
let artifactSetLookup = null;
function resetArtifactSetLookup() { artifactSetLookup = null; }
async function getArtifactSetLookup() {
    if (artifactSetLookup)
        return artifactSetLookup;
    const sets = await prisma_1.prisma.artifactSet.findMany();
    const lookup = {};
    for (const s of sets) {
        lookup[s.nameVi] = s;
        lookup[s.nameEn] = s;
    }
    artifactSetLookup = lookup;
    return lookup;
}
// Enrich a character's bestArtifacts using a pre-loaded artifact lookup (no extra DB calls)
async function enrichArtifacts(artifacts, setLookup) {
    return artifacts.map((a) => {
        const isMix = a.setNameVi?.startsWith("Mix") || a.setNameEn?.startsWith("Mix");
        const dbArtifact = setLookup[a.setNameVi] || setLookup[a.setNameEn];
        let mixSets = [];
        let matchedComponents = mixSetsMap[a.setNameVi];
        // Dynamic mix parsing for newly created mixes
        if (isMix && !matchedComponents) {
            const cleanedEn = a.setNameEn.replace("Mix 2-Piece ", "").replace("Mix 2 bộ ", "");
            const cleanedVi = a.setNameVi.replace("Mix 2 bộ ", "").replace("Mix 2-Piece ", "");
            const partsEn = cleanedEn.split(/ & 2-Piece | & 2 bộ /);
            const partsVi = cleanedVi.split(/ & 2 bộ | & 2-Piece /);
            // Prefer Vi names for internal lookup matching, but fallback to En
            matchedComponents = partsVi.length >= 2 ? partsVi : partsEn;
        }
        if (matchedComponents) {
            mixSets = matchedComponents.map((cName) => {
                if (cName === "Physical DMG +25% set") {
                    return {
                        nameEn: "Physical DMG +25% set",
                        nameVi: "Bộ Sát Thương Vật Lý +25%",
                        iconUrl: "/assets/artifacts/UI_RelicIcon_15008_4.webp",
                        artifactSetId: "15008",
                    };
                }
                const compDb = setLookup[cName];
                return {
                    nameEn: compDb?.nameEn || cName,
                    nameVi: compDb?.nameVi || cName,
                    iconUrl: compDb?.iconUrl || null,
                    artifactSetId: compDb?.id || "",
                };
            });
        }
        return {
            ...a,
            setNameEn: dbArtifact?.nameEn || a.setNameEn,
            setNameVi: dbArtifact?.nameVi || a.setNameVi,
            iconUrl: isMix ? "/assets/artifacts/UI_RelicIcon_15001_4.webp" : (dbArtifact?.iconUrl || null),
            rarity: dbArtifact ? Math.max(...dbArtifact.rarityList) : (a.rarity ?? 5),
            artifactSetId: dbArtifact?.id || null,
            mixSets,
        };
    });
}
// Enrich bestWeapons using a pre-loaded weapon lookup (no extra DB calls)
function enrichWeapons(weapons, weaponByName) {
    return weapons
        .map((w) => {
        const dbWeapon = weaponByName[w.nameVi] || weaponByName[w.nameEn];
        return {
            ...w,
            id: w.id || w.weaponId || dbWeapon?.id,
            iconUrl: dbWeapon?.iconUrl || w.iconUrl,
            rarity: dbWeapon?.rarity ?? w.rarity,
            subStat: dbWeapon?.subStat || w.subStat,
            nameEn: dbWeapon?.nameEn || w.nameEn || w.nameVi,
            nameVi: dbWeapon?.nameVi || w.nameVi,
        };
    })
        .sort((a, b) => a.rank - b.rank);
}
exports.resolvers = {
    JSON: graphql_type_json_1.default,
    Query: {
        characters: async () => {
            const cached = cache_1.charactersCache.get('all_basic');
            if (cached)
                return cached;
            const data = await prisma_1.prisma.character.findMany({
                orderBy: [{ rarity: 'desc' }, { nameEn: 'asc' }],
                include: { teams: { include: { members: { orderBy: { order: 'asc' } } }, orderBy: { order: 'asc' } } },
            });
            cache_1.charactersCache.set('all_basic', data);
            return data;
        },
        addCharacterArtifact: async (_, args) => {
            const existing = await prisma_1.prisma.characterArtifact.findFirst({
                where: { characterId: args.characterId },
                orderBy: { order: 'desc' }
            });
            const newOrder = existing ? existing.order + 1 : 0;
            await prisma_1.prisma.characterArtifact.create({
                data: {
                    characterId: args.characterId,
                    setNameEn: args.setNameEn,
                    setNameVi: args.setNameVi,
                    pieces: args.pieces,
                    sands: args.sands,
                    goblet: args.goblet,
                    circlet: args.circlet,
                    subStatsPriority: args.subStatsPriority,
                    order: newOrder,
                    constellation: args.constellation || "C0",
                }
            });
            return true;
        },
        character: async (_, args) => {
            const cached = cache_1.characterCache.get(args.id);
            if (cached)
                return cached;
            const data = await prisma_1.prisma.character.findUnique({
                where: { id: args.id },
                include: { bestWeapons: { orderBy: { order: 'asc' } }, bestArtifacts: { orderBy: { order: 'asc' } }, teams: { include: { members: { orderBy: { order: 'asc' } } }, orderBy: { order: 'asc' } } },
            });
            if (!data)
                return null;
            // --- BATCH: Load all needed weapons in 1 query ---
            const weaponNames = data.bestWeapons
                .map((w) => [w.nameVi, w.nameEn])
                .flat()
                .filter(Boolean);
            const weaponRecords = weaponNames.length > 0
                ? await prisma_1.prisma.weapon.findMany({
                    where: { OR: [{ nameVi: { in: weaponNames } }, { nameEn: { in: weaponNames } }] },
                })
                : [];
            const weaponByName = {};
            for (const w of weaponRecords) {
                if (w.nameVi)
                    weaponByName[w.nameVi] = w;
                if (w.nameEn)
                    weaponByName[w.nameEn] = w;
            }
            // --- BATCH: Use pre-warmed artifact set lookup (1 global query, cached) ---
            const setLookup = await getArtifactSetLookup();
            const enriched = {
                ...data,
                bestWeapons: enrichWeapons(data.bestWeapons, weaponByName),
                bestArtifacts: await enrichArtifacts(data.bestArtifacts, setLookup),
            };
            cache_1.characterCache.set(args.id, enriched);
            return enriched;
        },
        weapons: async () => {
            const cached = cache_1.weaponsCache.get('all');
            if (cached)
                return cached;
            const data = await prisma_1.prisma.weapon.findMany({
                orderBy: [{ rarity: 'desc' }, { nameEn: 'asc' }],
            });
            cache_1.weaponsCache.set('all', data);
            return data;
        },
        addCharacterWeapon: async (_, args) => {
            const weapon = await prisma_1.prisma.weapon.findUnique({ where: { id: args.weaponId } });
            if (!weapon)
                throw new Error("Weapon not found");
            await prisma_1.prisma.characterWeapon.create({
                data: {
                    characterId: args.characterId,
                    weaponId: args.weaponId,
                    nameEn: weapon.nameEn,
                    nameVi: weapon.nameVi,
                    rank: args.rank,
                    isF2P: args.isF2P,
                    iconUrl: weapon.iconUrl,
                    subStat: weapon.subStat,
                    passiveDescEn: weapon.passiveDescEn,
                    passiveDescVi: weapon.passiveDescVi,
                    constellation: args.constellation || "C0",
                }
            });
            return true;
        },
        weapon: async (_, args) => {
            return await prisma_1.prisma.weapon.findUnique({ where: { id: args.id } });
        },
        charactersByWeaponType: async (_, args) => {
            return await prisma_1.prisma.character.findMany({
                where: { weapon: args.weaponType },
                select: { id: true, nameEn: true, nameVi: true, element: true, rarity: true, avatarUrl: true, weapon: true },
                orderBy: [{ rarity: 'desc' }, { nameEn: 'asc' }],
            });
        },
        artifacts: async () => {
            const cached = cache_1.artifactsCache.get('all');
            if (cached)
                return cached;
            const data = await prisma_1.prisma.artifactSet.findMany({ orderBy: [{ id: 'asc' }] });
            cache_1.artifactsCache.set('all', data);
            return data;
        },
        artifactSet: async (_, args) => {
            return await prisma_1.prisma.artifactSet.findUnique({ where: { id: args.id } });
        },
        materials: async () => {
            const cached = cache_1.materialsCache.get('all');
            if (cached)
                return cached;
            const data = await prisma_1.prisma.material.findMany({ orderBy: { nameEn: 'asc' } });
            cache_1.materialsCache.set('all', data);
            return data;
        },
        tierRanks: async () => {
            return await prisma_1.prisma.tierRank.findMany({ orderBy: { order: 'asc' } });
        },
        showcase: async (_, args) => {
            const cached = cache_1.showcaseCache.get(args.uid);
            if (cached)
                return cached;
            try {
                const user = await enka.fetchUser(args.uid);
                if (!user)
                    return null;
                const detailedCharacters = user.characters ? user.characters.map((c) => {
                    let maxDmg = 0;
                    try {
                        const elements = ['pyroDamage', 'hydroDamage', 'cryoDamage', 'electroDamage', 'anemoDamage', 'geoDamage', 'dendroDamage', 'physicalDamage'];
                        for (const el of elements) {
                            if (c.stats[el] && c.stats[el].value > maxDmg)
                                maxDmg = c.stats[el].value;
                        }
                    }
                    catch (e) { }
                    return {
                        id: c.characterData.id.toString(),
                        name: c.characterData.name.get("en"),
                        element: c.characterData.element?.id || 'Unknown',
                        level: c.level,
                        friendship: c.friendship,
                        constellation: c.unlockedConstellations ? c.unlockedConstellations.length : 0,
                        weapon: c.weapon ? {
                            name: c.weapon.weaponData.name.get("en"),
                            level: c.weapon.level,
                            refinement: c.weapon.refinement ? c.weapon.refinement.level : 1,
                        } : null,
                        artifacts: c.artifacts ? c.artifacts.map((a) => ({
                            setName: a.artifactData.set.name.get("en"),
                            type: a.artifactData.equipType,
                            level: a.level,
                            mainStat: a.mainstat ? {
                                type: a.mainstat.type.get("en"),
                                value: a.mainstat.value
                            } : null,
                            subStats: a.substats ? a.substats.map((s) => ({
                                type: s.type.get("en"),
                                value: s.value
                            })) : []
                        })) : [],
                        stats: c.stats ? {
                            maxHp: c.stats.maxHp?.value || 0,
                            attack: c.stats.attack?.value || 0,
                            defense: c.stats.defense?.value || 0,
                            critRate: c.stats.critRate?.value || 0,
                            critDamage: c.stats.critDamage?.value || 0,
                            energyRecharge: c.stats.energyRecharge?.value || 0,
                            elementalMastery: c.stats.elementalMastery?.value || 0,
                            highestDamageBonus: maxDmg
                        } : {}
                    };
                }) : [];
                const result = {
                    uid: args.uid,
                    nickname: user.nickname || 'Unknown',
                    level: user.level || 1,
                    avatarUrl: user.profilePicture?.icon?.url || null,
                    characters: user.characters ? user.characters.map((c) => c.characterData.id.toString()) : [],
                    detailedCharacters
                };
                cache_1.showcaseCache.set(args.uid, result);
                return result;
            }
            catch (error) {
                console.error("Lỗi fetch Enka:", error);
                return null;
            }
        },
        // === Backup Queries ===
        listBackups: async (_, __, context) => {
            if (!context.isAdmin)
                throw new Error("Unauthorized: Admin access required.");
            return (0, backupService_1.listBackups)();
        },
        getBackup: async (_, { id }, context) => {
            if (!context.isAdmin)
                throw new Error("Unauthorized: Admin access required.");
            const backup = (0, backupService_1.getBackupById)(id);
            if (!backup)
                throw new Error(`Backup not found: ${id}`);
            return backup;
        },
    },
    Character: {
        signatureWeapons: async (parent) => {
            if (!parent.signatureWeapons || parent.signatureWeapons.length === 0)
                return [];
            return prisma_1.prisma.weapon.findMany({ where: { nameEn: { in: parent.signatureWeapons } } });
        },
        bestWeapons: async (parent) => {
            if (parent.bestWeapons)
                return parent.bestWeapons;
            return prisma_1.prisma.characterWeapon.findMany({ where: { characterId: parent.id } });
        },
        bestArtifacts: async (parent) => {
            if (parent.bestArtifacts)
                return parent.bestArtifacts;
            return prisma_1.prisma.characterArtifact.findMany({ where: { characterId: parent.id } });
        }
    },
    Mutation: {
        ...mutations_1.Mutation,
        // === Backup Mutations ===
        createBackup: async (_, __, context) => {
            if (!context.isAdmin)
                throw new Error("Unauthorized: Admin access required.");
            return await (0, backupService_1.createJsonBackup)();
        },
        deleteBackup: async (_, { id }, context) => {
            if (!context.isAdmin)
                throw new Error("Unauthorized: Admin access required.");
            return (0, backupService_1.deleteBackup)(id);
        },
        restoreFromBackup: async (_, { id }, context) => {
            if (!context.isAdmin)
                throw new Error("Unauthorized: Admin access required.");
            const result = await (0, backupService_1.restoreFromBackup)(id);
            (0, cache_1.clearAllCaches)();
            return result;
        },
        cleanupBackups: async (_, { keepCount }, context) => {
            if (!context.isAdmin)
                throw new Error("Unauthorized: Admin access required.");
            return await (0, backupService_1.cleanupOldBackups)(keepCount || 10);
        },
    }
};
