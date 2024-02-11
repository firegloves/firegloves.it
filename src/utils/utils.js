export function getWorkExpTitle(workExp) {
  return `${workExp.title} at ${workExp.company} (${workExp.period})`;
}

export function coreSkills(skills) {
  return Object.entries(skills)
    .filter((data) => data[1]['coreSkill'] === true);
}

export function skillNames(skills) {
  return Object.entries(skills).map(([skill, details]) => skill);
}

export const openLinkInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};
