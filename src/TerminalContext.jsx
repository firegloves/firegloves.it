import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {loadLinks, loadPublications, loadSkills, loadWorkExperiences} from "./utils/api.js";

const initialState = {
  skills: [],
  workExps: [],
  links: [],
  publications: [],
  projects: []
};

const TerminalContext = createContext(initialState);
console.log('createContext')

// Azioni
export const ACTIONS = {
  SET_SKILLS: 'set-skills',
  SET_WORK_EXPERIENCES: 'set-work-experiences',
  SET_LINKS: 'set-links',
  SET_PUBLICATIONS: 'set-publications',
  SET_PROJECTS: 'set-projects',
};

// Reducer
const terminalReducer = (state, action) => {
  console.log('terminalReducer', action.type)
  switch (action.type) {
    case ACTIONS.SET_SKILLS:
      return {
        ...state,
        skills: action.payload,
      };
    case ACTIONS.SET_WORK_EXPERIENCES:
      return {
        ...state,
        workExps: action.payload,
      };
    case ACTIONS.SET_LINKS:
      return {
        ...state,
        links: action.payload,
      };
    case ACTIONS.SET_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
      };
    case ACTIONS.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return state;
  }
};

export const TerminalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(terminalReducer, initialState);
  console.log('state reducer')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsData = await loadSkills();
        dispatch({ type: ACTIONS.SET_SKILLS, payload: skillsData });
        const workExperiencesData = await loadWorkExperiences();
        dispatch({ type: ACTIONS.SET_WORK_EXPERIENCES, payload: workExperiencesData });
        const linksData = await loadLinks();
        dispatch({ type: ACTIONS.SET_LINKS, payload: linksData });
        const pubsData = await loadPublications();
        dispatch({ type: ACTIONS.SET_PUBLICATIONS, payload: pubsData });
        const projsData = await loadPublications();
        dispatch({ type: ACTIONS.SET_PROJECTS, payload: projsData });
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
    console.log('use effect terminal provider running')
  }, []);
  console.log('use effect terminal provider')

  return (
      <TerminalContext.Provider value={{ state, dispatch }}>
        {children}
      </TerminalContext.Provider>
  );
};

// Hook personalizzato per usare il context
export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};
