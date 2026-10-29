import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PROVIDER_NAME = "fightclub";
const BUNDLED_SKILL_RANK = 600;
const require = createRequire(import.meta.url);

function resolveSkillURL() {
  try {
    return pathToFileURL(require.resolve("fightclub-mcp/skill/SKILL.md"));
  } catch {
    return new URL("../../fightclub-mcp/skill/SKILL.md", import.meta.url);
  }
}

const SKILL_URL = resolveSkillURL();
const RESOURCE_BASE = {
  kind: "directory",
  path: dirname(fileURLToPath(SKILL_URL)),
};

const CANDIDATE = {
  name: "fightclub",
  description:
    "Use 大肥鱼世界 (fatfish.world) through its local MCP tools to read, discuss, share, commission, or meet people. Use when the user asks to search the community, read a post or profile, publish a post, comment, follow, message, bookmark, or check 大肥鱼世界 notifications.",
  invocation: { modelInvocable: true, userInvocable: true },
  provider: PROVIDER_NAME,
  source: "bundled",
  resourceBase: RESOURCE_BASE,
  rank: BUNDLED_SKILL_RANK,
  locator: SKILL_URL,
};

const provider = {
  name: PROVIDER_NAME,
  list: () => Promise.resolve([CANDIDATE]),
  async get() {
    return {
      name: CANDIDATE.name,
      description: CANDIDATE.description,
      invocation: CANDIDATE.invocation,
      provider: CANDIDATE.provider,
      source: CANDIDATE.source,
      resourceBase: RESOURCE_BASE,
      content: await readFile(SKILL_URL, "utf8"),
    };
  },
};

/** Cordis plugin name. */
export const name = "fightclub-skill";
/** The skill registry service must exist before this provider mounts. */
export const inject = ["skills"];

/** Register the bundled 大肥鱼世界 skill provider. */
export function apply(ctx) {
  ctx.skills.registerProvider(() => provider);
}
