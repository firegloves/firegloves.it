import {TERMINAL_THEMES} from "../components/terminal/terminalThemes.js";

export function getWorkExpTitle(workExp) {
  return `${workExp.title} at ${workExp.company} (${workExp.period})`;
}

export function getCoreSkills(skills) {
  return skills
    .filter((sk) => sk.coreSkill === true);
}

export const openLinkInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

export function themesToListToShow() {
  return Object.entries(TERMINAL_THEMES).map(([title, properties]) => ({
    title,
    ...properties
  }));
}

export function selectRandomTheme() {
  const themes = themesToListToShow();
  const themeName = themes[Math.floor(Math.random()*themes.length)].title;
  return TERMINAL_THEMES[themeName];
}
