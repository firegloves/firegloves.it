import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {loadLinks, loadProjects, loadPublications, loadSkills, loadWorkExperiences} from "./utils/api.js";
import {STATE_NAMES} from "./state/terminalStates.jsx";

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
  listSelectedIndex: 0,
  selectedWorkExp: {},
  history: [],
};

const TerminalContext = createContext(initialState);
console.log('createContext')

// Azioni
export const ACTIONS = {
  SET_RESOURCES: 'set-resources',
  SET_TERMINAL_STATE: 'set-terminal-state',
  SET_TERMINAL_STATE_FROM_HISTORY: 'set-terminal-state-from-history',
  SET_COMMAND_INPUT: 'set-command-input',
  SET_COMMAND_OUTPUT: 'set-command-output',
  SET_LIST_TO_SHOW: 'set-list-to-show',
  SET_LIST_SELECTED_INDEX: 'set-list-selected-index',
  SET_SELECTED_WORK_EXP: 'set-selected-work-exp',
  SET_HISTORY: 'set-history',
  HANDLE_LIST_ITEM_SELECTION: 'handle-list-item-selection'
};

// Reducer
const terminalReducer = (state, action) => {
  console.log('terminalReducer', action.type)
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
      console.log('ACTIONS.SET_TERMINAL_STATE')
      return {
        ...state,
        terminalState: action.payload.terminalState,
        commandInput: '',
        listToShow: action.payload.listToShow,
        listSelectedIndex: action.payload.listSelectedIndex,
        selectedWorkExp: action.payload.selectedWorkExp,
        history: action.payload.updateHistory
            ? [...state.history, {terminalState: state.terminalState, listToShow: state.listToShow, listSelectedIndex: state.listSelectedIndex}]
            : state.history,
      };
    case ACTIONS.SET_COMMAND_INPUT:
      return {...state, commandInput: action.payload};
    case ACTIONS.SET_COMMAND_OUTPUT:
      return {...state, commandOutput: action.payload, commandInput: ''};
    case ACTIONS.SET_LIST_TO_SHOW:
      return {
        ...state,
        listToShow: action.payload.listToShow,
        terminalState: action.payload.terminalState,
        commandInput: ''
      };
    case ACTIONS.SET_LIST_SELECTED_INDEX:
      return {...state, listSelectedIndex: action.payload};
    case ACTIONS.SET_SELECTED_WORK_EXP:
      return {...state, selectedWorkExp: action.payload};
    case ACTIONS.SET_HISTORY:
      return {...state, history: action.payload};
    case ACTIONS.HANDLE_LIST_ITEM_SELECTION:
      return {
        ...state,
        listToShow: action.payload.listToShow,
        terminalState: action.payload.terminalState,
        listSelectedIndex: 0,
      };
    default:
      return state;
  }
};

export const TerminalProvider = ({children}) => {

  const [state, dispatch] = useReducer(terminalReducer, initialState);
  console.log('state reducer')

  useEffect(() => {
    loadResources();
    console.log('use effect terminal provider running')
  }, []);
  console.log('use effect terminal provider')

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

// Hook personalizzato per usare il context
export const useTerminal = () => {
  console.log('useContext')
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};
