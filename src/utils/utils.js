export function getWorkExpTitle(workExp) {
  return `${workExp.title} at ${workExp.company} (${workExp.period})`;
}

export function getCoreSkills(skills) {
  return skills
    .filter((sk) => sk.coreSkill === true);
}

export function skillNames(skills) {
  return Object.entries(skills).map(([skill, details]) => skill);
}

export const openLinkInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};
