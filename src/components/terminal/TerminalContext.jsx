import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {loadLinks, loadProjects, loadPublications, loadSkills, loadWorkExperiences} from "../../utils/api.js";
import {STATE_NAMES} from "./terminalStates.jsx";
import {TERMINAL_THEMES} from "./terminalThemes.js";
import {selectRandomTheme} from "../../utils/utils.js";

const initialState = {
  skills: [],
  workExps: [],
  links: [],
  publications: [],
  projects: [],
  terminalState: STATE_NAMES.COMMAND,
  commandInput: '',
  commandOutput: '',
  listToShow: [],
  listFilterValue: '',
  listSelectedIndex: 0,
  selectedWorkExp: {},
  history: [],
  theme: selectRandomTheme()
};

const TerminalContext = createContext(initialState);

export const ACTIONS = {
  SET_RESOURCES: 'set-resources',
  SET_TERMINAL_STATE: 'set-terminal-state',
  SET_TERMINAL_STATE_FROM_HISTORY: 'set-terminal-state-from-history',
  SET_COMMAND_INPUT: 'set-command-input',
  SET_COMMAND_OUTPUT: 'set-command-output',
  SET_LIST_FILTER_VALUE: 'set-list-filter-value',
  SET_LIST_SELECTED_INDEX: 'set-list-selected-index',
  SET_THEME_FROM_CMD: 'set-theme-from-cmd',
  SET_THEME_FROM_LIST: 'set-theme-from-list',
};

const terminalReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_RESOURCES:
      return {
        ...state,
        skills: action.payload.skills,
        workExps: action.payload.workExps,
        links: action.payload.links,
        publications: action.payload.publications,
        projects: action.payload.projects,
      }
    case ACTIONS.SET_TERMINAL_STATE:
      return {
        ...state,
        terminalState: action.payload.terminalState,
        commandInput: '',
        listToShow: action.payload.listToShow,
        listSelectedIndex: action.payload.listSelectedIndex,
        selectedWorkExp: action.payload.selectedWorkExp,
        listFilterValue: '',
        history: action.payload.updateHistory
            ? [...state.history, {terminalState: state.terminalState, listToShow: state.listToShow, listSelectedIndex: state.listSelectedIndex}]
            : state.history,
      };
    case ACTIONS.SET_COMMAND_INPUT:
      return {...state, commandInput: action.payload};
    case ACTIONS.SET_COMMAND_OUTPUT:
      return {...state, commandOutput: action.payload, commandInput: ''};
    case ACTIONS.SET_LIST_FILTER_VALUE:
      return {...state, listFilterValue: action.payload};
    case ACTIONS.SET_LIST_SELECTED_INDEX:
      return {...state, listSelectedIndex: action.payload};
    case ACTIONS.SET_THEME_FROM_CMD:
      return {...state,
        terminalState: STATE_NAMES.COMMAND,
        theme: TERMINAL_THEMES[action.payload],
        listToShow: [],
        selectedIndex: 0,
        listFilterValue: '',
        history: []
      };
    case ACTIONS.SET_THEME_FROM_LIST:
      return {...state, theme: TERMINAL_THEMES[action.payload]};
    default:
      return state;
  }
};

export const TerminalProvider = ({children}) => {

  const [state, dispatch] = useReducer(terminalReducer, initialState);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    try {
      const dataPromises = [
        loadSkills(),
        loadWorkExperiences(),
        loadLinks(),
        loadPublications(),
        loadProjects(),
      ];

      const [skills, workExps, links, publications, projects] = await Promise.all(dataPromises);
      dispatch({
        type: ACTIONS.SET_RESOURCES,
        payload: {skills, workExps, links, publications, projects}
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  return (
      <TerminalContext.Provider value={{state, dispatch}}>
        {children}
      </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};
