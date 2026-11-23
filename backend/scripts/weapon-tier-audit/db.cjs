'use strict';

const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { PrismaClient } = require('@prisma/client');

function loadEnv() {
  const path = join(__dirname, '..', '..', '.env');
  const out = {};
  const text = readFileSync(path, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const match = /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line.trim());
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[match[1]] = value;
  }
  return out;
}

/**
 * Open a Prisma client limited to the local development database.
 * These audit scripts only call read methods (findMany / $queryRaw SELECT).
 * Refuses to run when the resolved database name or host is not development.
 */
function openReadOnly() {
  const env = loadEnv();
  const url = new URL(env.DATABASE_URL);
  const database = decodeURIComponent(url.pathname.slice(1));
  const host = url.hostname;
  if (!/genshinhub/i.test(database) || !/^(127\.0\.0\.1|localhost)$/.test(host)) {
    throw new Error(`Refusing non-development database: ${host}/${database}`);
  }
  const prisma = new PrismaClient({ datasources: { db: { url: url.toString() } } });
  return { prisma, target: `${host}:${url.port || 5432}/${database}` };
}

module.exports = { loadEnv, openReadOnly };
