import { writable, derived, get } from "svelte/store";
import { translate } from "./core.js";

export const lang = writable(localStorage.getItem("lang") || "to");
export const input = writable("");
export const output = derived([lang, input], ([$lang, $input], set) => {
  console.log("lang", get(lang));
  set(translate($lang, $input));
});

// persist store
lang.subscribe((val) => localStorage.setItem("lang", val));
