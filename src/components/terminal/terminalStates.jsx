import React from "react";
import {TERMINAL_COMMANDS, usage} from "./terminalCommands.js";
import TerminalList from "../TerminalList.jsx";
import WorkExpDetails from "../WorkExpDetails.jsx";
import {ACTIONS} from "./TerminalContext.jsx";
import {getCoreSkills, goBack, themesToListToShow} from "../../utils/utils.js";
import {dispatchSetTerminalState} from "../../actions.js";
import TerminalInput from "../TerminalInput.jsx";

export const STATE_NAMES = {
  COMMAND: 'command',
  LIST_SKILLS: 'listSkill',
  LIST_CORE_SKILLS: 'listCoreSkill',
  LIST_WORK_EXPS: 'listWorkExps',
  WORK_EXP_DETAILS: 'workExpDetails',
  LIST_PROJECTS: 'listProjects',
  LIST_LINKS: 'listLinks',
  LIST_PUBLICATIONS: 'listPublications',
  LIST_THEMES: 'listThemes',
}

/******************************************
 * TerminalCommandState
 *******************************************/
export class TerminalCommandState {

  constructor(state, dispatch, inputRef) {
    this.state = state;
    this.dispatch = dispatch;
    this.inputRef = inputRef;
  }

  executeCommand(cmd) {
    switch (cmd.toLowerCase()) {
      case TERMINAL_COMMANDS.HELP:
        this.dispatch({type: ACTIONS.SET_COMMAND_OUTPUT, payload: usage});
        break;
      case TERMINAL_COMMANDS.CORE_SKILLS:
        dispatchSetTerminalState(this.dispatch, getCoreSkills(this.state.skills), STATE_NAMES.LIST_CORE_SKILLS)
        break;
      case TERMINAL_COMMANDS.SKILLS:
        dispatchSetTerminalState(this.dispatch, this.state.skills, STATE_NAMES.LIST_SKILLS)
        break;
      case TERMINAL_COMMANDS.WORK_EXPS:
        dispatchSetTerminalState(this.dispatch, this.state.workExps, STATE_NAMES.LIST_WORK_EXPS)
        break;
      case TERMINAL_COMMANDS.LINKS:
        dispatchSetTerminalState(this.dispatch, this.state.links, STATE_NAMES.LIST_LINKS)
        break;
      case TERMINAL_COMMANDS.PUBLICATIONS:
        dispatchSetTerminalState(this.dispatch, this.state.publications, STATE_NAMES.LIST_PUBLICATIONS)
        break;
      case TERMINAL_COMMANDS.PROJECTS:
        dispatchSetTerminalState(this.dispatch, this.state.projects, STATE_NAMES.LIST_PROJECTS)
        break;
      case TERMINAL_COMMANDS.THEMES:
        dispatchSetTerminalState(this.dispatch, themesToListToShow(), STATE_NAMES.LIST_THEMES)
        break;
      default:
        this.dispatch({type: ACTIONS.SET_COMMAND_OUTPUT, payload: 'Unknown command'});
        break;
    }
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.executeCommand(this.state.commandInput);
    }
  };

  render = () => {
    return (
        <TerminalInput inputRef={this.inputRef} handleKeyDown={this.handleKeyDown}></TerminalInput>
    )
  }
}

// /******************************************
//  * TerminalListState
//  *******************************************/
export class TerminalListState {

  constructor(state, dispatch, handleSelectItem, listMappingFn, sectionTitle) {
    this.state = state;
    this.dispatch = dispatch;
    this.handleSelectItem = handleSelectItem;
    this.listMappingFn = listMappingFn;
    this.sectionTitle = sectionTitle;
    this.listFilterValue = state.listFilterValue;
    this.filteredList = this.state.listToShow
    .filter(item => item.title.toLowerCase().startsWith(this.listFilterValue.toLowerCase()))
    this.filteredListToShow = this.state.listToShow
    .map(this.listMappingFn)
    .filter(item => item.toLowerCase().startsWith(this.listFilterValue.toLowerCase()));
  }

  handleKeyDown = (e, itemIndex) => {
    handleArrowKeyUpOrDown(e, this.filteredListToShow, this.state.listSelectedIndex, this.dispatch)
    || handleEnterKeyOnList(e, this.filteredList, itemIndex || this.state.listSelectedIndex, this.handleSelectItem,
        this.dispatch, itemIndex)
    || handleEscape(e, this.state, this.dispatch)
    || this.setFilterInputValue(e);
  }

  setFilterInputValue = (e) => {
    switch (true) {
      case /^[a-zA-Z0-9]$/.test(e.key):
        this.dispatch({type: ACTIONS.SET_LIST_FILTER_VALUE, payload: this.listFilterValue += e.key});
        break;
      case e.key === 'Backspace':
        this.dispatch({type: ACTIONS.SET_LIST_FILTER_VALUE, payload: this.listFilterValue.slice(0, -1)});
        break;
      default:
        break;
    }
  }

  render = () => {

    return (
        <TerminalList
            data={this.filteredListToShow}
            sectionTitle={this.sectionTitle}
            onSelectItem={this.handleKeyDown}
            selectedIndex={this.state.listSelectedIndex}
            onKeyDown={this.handleKeyDown}
        />
    );
  }
}

/******************************************
 * TerminalWorkExpDetailsState
 *******************************************/
export class TerminalWorkExpDetailsState {

  constructor(state, dispatch) {
    this.state = state;
    this.dispatch = dispatch;
  }

  handleKeyDown = (e) => {
    handleEscape(e, this.state, this.dispatch);
  }

  render = () => {
    return (
        <WorkExpDetails workExp={this.state.selectedWorkExp} onKeyDown={this.handleKeyDown}/>
    );
  }
}

function handleArrowKeyUpOrDown(e, list, selectedIndex, dispatch) {
  if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    e.preventDefault();
    const adjustment = e.key === 'ArrowDown' ? 1 : -1;
    const newIndex = Math.max(0, Math.min(selectedIndex + adjustment, list.length - 1));
    dispatch({type: ACTIONS.SET_LIST_SELECTED_INDEX, payload: newIndex});
    return true;
  }
  return false;
}

function handleEscape(e, state, dispatch) {
  if (e.key === 'Escape') {
    goBack(state, dispatch);
    return true;
  }
  return false;
}

function handleEnterKeyOnList(e, list, selectedIndex, handleSelectItem) {
  if (e.key === 'Enter') {
    handleSelectItem(list[selectedIndex]);
    return true;
  }
  return false;
}
