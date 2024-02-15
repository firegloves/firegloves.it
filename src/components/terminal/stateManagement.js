import {STATE_NAMES, TerminalCommandState, TerminalListState, TerminalWorkExpDetailsState} from "./terminalStates.jsx";
import {getWorkExpTitle} from "../../utils/utils.js";

export const LIST_SECTION_TITLE = {
  CORE_SKILLS: 'CORE SKILLS',
  SKILLS: 'SKILLS',
  WORK_EXPERIENCES: 'WORK EXPERIENCES',
  LINKS: 'LINKS',
  PUBLICATIONS: 'PUBLICATIONS',
  PROJECTS: 'PROJECTS',
  THEMES: 'THEMES',
}

const getHandleSelectItem = (terminalState, handleSelectSkill, handleSelectWorkExp, openExternalLink, handleSelectTheme) => {
  switch (terminalState) {
    case STATE_NAMES.LIST_SKILLS:
    case STATE_NAMES.LIST_CORE_SKILLS:
      return handleSelectSkill;
    case STATE_NAMES.LIST_WORK_EXPS:
      return handleSelectWorkExp;
    case STATE_NAMES.LIST_LINKS:
    case STATE_NAMES.LIST_PUBLICATIONS:
    case STATE_NAMES.LIST_PROJECTS:
      return openExternalLink;
    case STATE_NAMES.LIST_THEMES:
      return handleSelectTheme;
    default:
      return () => {
      }
  }
}

const getListMappingFn = (terminalState) => {
  switch (terminalState) {
    case STATE_NAMES.LIST_LINKS:
    case STATE_NAMES.LIST_PUBLICATIONS:
    case STATE_NAMES.LIST_PROJECTS:
    case STATE_NAMES.LIST_SKILLS:
    case STATE_NAMES.LIST_CORE_SKILLS:
    case STATE_NAMES.LIST_THEMES:
      return (item) => item.title;
    case STATE_NAMES.LIST_WORK_EXPS:
      return (item) => getWorkExpTitle(item);
    default:
      return (item) => item;
  }
}

const getSectionTitle = (terminalState) => {
  switch (terminalState) {
    case STATE_NAMES.LIST_CORE_SKILLS:
      return LIST_SECTION_TITLE.CORE_SKILLS;
    case STATE_NAMES.LIST_SKILLS:
      return LIST_SECTION_TITLE.SKILLS;
    case STATE_NAMES.LIST_PROJECTS:
      return LIST_SECTION_TITLE.PROJECTS;
    case STATE_NAMES.LIST_LINKS:
      return LIST_SECTION_TITLE.LINKS;
    case STATE_NAMES.LIST_PUBLICATIONS:
      return LIST_SECTION_TITLE.PUBLICATIONS;
    case STATE_NAMES.LIST_WORK_EXPS:
      return LIST_SECTION_TITLE.WORK_EXPERIENCES;
    default:
      return '';
  }
}

export const getCurrentState = (state, dispatch, inputRef, handleSelectSkill, handleSelectWorkExp, openExternalLink, handleSelectTheme) => {

  switch (state.terminalState) {
    case STATE_NAMES.COMMAND:
      return new TerminalCommandState(state, dispatch, inputRef);
    case STATE_NAMES.WORK_EXP_DETAILS:
      return new TerminalWorkExpDetailsState(state, dispatch);
    case STATE_NAMES.LIST_SKILLS:
    case STATE_NAMES.LIST_CORE_SKILLS:
    case STATE_NAMES.LIST_WORK_EXPS:
    case STATE_NAMES.LIST_LINKS:
    case STATE_NAMES.LIST_PUBLICATIONS:
    case STATE_NAMES.LIST_PROJECTS:
    case STATE_NAMES.LIST_THEMES:
      const handleSelectItem = getHandleSelectItem(state.terminalState, handleSelectSkill, handleSelectWorkExp, openExternalLink, handleSelectTheme);
      const listMappingFn = getListMappingFn(state.terminalState);
      const sectionTitle = getSectionTitle(state.terminalState);
      return new TerminalListState(state, dispatch, handleSelectItem, listMappingFn, sectionTitle);
    default:
      return { render: () => {}};
  }
};
