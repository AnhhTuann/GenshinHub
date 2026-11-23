#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import { PrismaClient } from '@prisma/client';
import { authService } from './auth.service';

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (current.startsWith('--')) {
      const key = current.substring(2).replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
      const next = argv[index + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        index += 1;
      } else {
        args[key] = 'true';
      }
    }
  }
  return args;
}

function promptVisible(question: string): Promise<string> {
  if (!process.stdin.isTTY) return Promise.reject(new Error('TTY required; pass --username instead'));
  const readline = require('node:readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer: string) => {
    rl.close();
    resolve(answer.trim());
  }));
}

function promptHidden(question: string): Promise<string> {
  if (!process.stdin.isTTY) {
    return Promise.reject(new Error('TTY required; set ADMIN_BOOTSTRAP_PASSWORD for non-interactive use'));
  }
  process.stdout.write(question);
  const stdin = process.stdin;
  stdin.setRawMode?.(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  let value = '';
  return new Promise((resolve) => {
    const cleanup = () => {
      stdin.off('data', onData);
      stdin.setRawMode?.(false);
      stdin.pause();
      process.stdout.write('\n');
    };
    const onData = (chunk: string) => {
      const char = chunk.toString();
      if (char === '\n' || char === '\r') {
        cleanup();
        resolve(value);
      } else if (char === '\u0003') {
        cleanup();
        process.exit(130);
      } else if (char === '\u007f' || char === '\b') {
        value = value.slice(0, -1);
      } else {
        value += char;
      }
    };
    stdin.on('data', onData);
  });
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const prisma = new PrismaClient();

  try {
    const username = args.username || await promptVisible('Admin username: ');
    // Never default to a known password and never echo it to stdout or logs.
    const password = process.env.ADMIN_BOOTSTRAP_PASSWORD || await promptHidden('New Admin password (hidden): ');
    const created = await authService.bootstrapOwner(prisma, {
      username,
      email: args.email,
      displayName: args.displayName,
      password,
    });
    console.log(`Owner Admin created: ${created.username}`);
    console.log('Store the chosen password in your secret manager. It is not printed here.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: Error) => {
  console.error(`Bootstrap failed: ${error.message}`);
  process.exitCode = 1;
});
