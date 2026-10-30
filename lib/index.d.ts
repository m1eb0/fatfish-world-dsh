import type { Context } from "@deepseek-ai/cordis";
export declare const name: "fatfish-world-skill";
export declare const inject: readonly ["skills"];
export declare function apply(ctx: Context & { skills: { registerProvider: (create: () => unknown) => () => void } }): void;
