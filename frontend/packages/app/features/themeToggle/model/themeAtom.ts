import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage('themeName', "light"); // "light" | "dark"
