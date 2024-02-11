const loadJsonResource = async (path) => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load resource from ${path}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading JSON resource:", error);
    throw error;
  }
};


export const loadSkills = async () => {
  return loadJsonResource('/skills.json');
};


export const loadWorkExperiences = async () => {
  return loadJsonResource('/work-exps.json');
};

export const loadLinks = async () => {
  return loadJsonResource('links.json');
};

export const loadPublications = async () => {
  return loadJsonResource('publications.json');
};

export const loadProjects = async () => {
  return loadJsonResource('projects.json');
};
