#!/usr/bin/env node

// Updates the version field in all apps/*/package.json files.
// Called by semantic-release during the prepare phase:
// node scripts/set-version.mjs <newVersion>

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, statSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const newVersion = process.argv[2];

if (!newVersion) {
	console.error('Usage: set-version.mjs <version>');
	process.exit(1);
}

// Update root package.json
const rootPkg = resolve(root, 'package.json');
const rootJson = JSON.parse(readFileSync(rootPkg, 'utf-8'));
rootJson.version = newVersion;
writeFileSync(rootPkg, JSON.stringify(rootJson, null, 2) + '\n');
console.log(`✔ root → ${newVersion}`);

// Update all apps/*/package.json
const appsDir = resolve(root, 'apps');
for (const app of readdirSync(appsDir)) {
	const pkgPath = resolve(appsDir, app, 'package.json');
	try {
		if (!statSync(pkgPath).isFile()) continue;
		const json = JSON.parse(readFileSync(pkgPath, 'utf-8'));
		json.version = newVersion;
		writeFileSync(pkgPath, JSON.stringify(json, null, 2) + '\n');
		console.log(`✔ apps/${app} → ${newVersion}`);
	} catch {
		// skip if no package.json
	}
}
