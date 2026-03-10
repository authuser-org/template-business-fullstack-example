#!/usr/bin/env node

// Builds and pushes Docker images for web and api.
// Called by semantic-release during the publish phase:
// node scripts/docker-publish.mjs <version>
//
// Required env vars (set in CI):
// DOCKER_REGISTRY  — e.g. ghcr.io/org/repo  or  registry.gitlab.com/org/repo

import { execSync } from 'child_process';

const version = process.argv[2];
const registry = process.env.DOCKER_REGISTRY;

if (!version || !registry) {
	console.error('DOCKER_REGISTRY env var and version argument are required.');
	process.exit(1);
}

const apps = ['web', 'api'];
const exec = (cmd) => execSync(cmd, { stdio: 'inherit' });

for (const app of apps) {
	const base = `${registry}/${app}`;
	console.log(`\n🐳 Building ${app}:${version}...`);
	exec(
		`docker build -f apps/${app}/Dockerfile -t ${base}:${version} -t ${base}:latest .`,
	);
	console.log(`🚀 Pushing ${app}...`);
	exec(`docker push ${base}:${version}`);
	exec(`docker push ${base}:latest`);
}

console.log('\n✅ All images pushed.');
