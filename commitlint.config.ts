import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Types allowed: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    // Scope can reference app names
    "scope-enum": [
      1,
      "always",
      ["web", "api", "mobile", "packages", "deps", "release"],
    ],
    "subject-case": [2, "always", "lower-case"],
    "header-max-length": [2, "always", 100],
  },
};

export default config;
