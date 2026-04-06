import type { UserShortcuts } from "unocss";
import type { Theme } from "./theme";

export const SHORTCUTS = [
  // {
  //   btn: "",
  //   tag: "",
  // },
  // [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
  // [/^tag-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-1 px-2 rounded`],
] satisfies UserShortcuts<Theme>;
