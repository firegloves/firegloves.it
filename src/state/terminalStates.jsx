import React from "react";
import {TERMINAL_COMMANDS, usage} from "../utils/terminalCommands.js";
import TerminalList from "../components/TerminalList.jsx";
import WorkExpDetails from "../components/WorkExpDetails.jsx";
import {LIST_SECTION_TITLE} from "./stateManagement.js";
import {ACTIONS, useTerminal} from "../TerminalContext.jsx";
import {getCoreSkills} from "../utils/utils.js";
import {dispatchSetTerminalState} from "../actions.js";

export const STATE_NAMES = {
  COMMAND: 'command',
  LIST_SKILLS: 'listSkill',
  LIST_CORE_SKILLS: 'listCoreSkill',
  LIST_WORK_EXPS: 'listWorkExps',
  WORK_EXP_DETAILS: 'workExpDetails',
  LIST_PROJECTS: 'listProjects',
  LIST_LINKS: 'listLinks',
  LIST_PUBLICATIONS: 'listPublications',
}



/******************************************
 * TerminalCommandState
 *******************************************/
export class TerminalCommandState {

  constructor(state, dispatch, inputRef) {
    this.state = state;
    this.dispatch = dispatch;
    this.inputRef = inputRef;

    console.log('TerminalCommandState constructor')
  }

  executeCommand(cmd) {
    switch (cmd) {
      case TERMINAL_COMMANDS.HELP:
        this.dispatch({ type: ACTIONS.SET_COMMAND_OUTPUT, payload: usage });
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
      default:
        this.dispatch({ type: ACTIONS.SET_COMMAND_OUTPUT, payload: 'Unknown command' });
        break;
    }
  };

  handleKeyDown = (e) => {
    console.log('useTerminal Callback running')
    if (e.key === 'Enter') {
      e.preventDefault();
      this.executeCommand(this.state.commandInput);
    }
  };

  render = () => {
    return (
        <div className="p-5">
          <span>### Welcome to the CV Terminal. Type 'help' for available commands ###</span>
          <div className="whitespace-pre-line">{this.state.commandOutput}</div>
          <div className="flex w-full pt-2">
            <span className="whitespace-nowrap">[firegloves@intrepid ~]$</span>
            <input
                ref={this.inputRef}
                value={this.state.commandInput}
                onChange={(e) => this.dispatch({ type: ACTIONS.SET_COMMAND_INPUT, payload: e.target.value })}
                onKeyDown={this.handleKeyDown}
                className="flex-1 bg-transparent focus:outline-none text-green-400 pl-2"
            />
          </div>
        </div>
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
    console.log('TerminalListState constructor')
  }

  handleKeyDown = (e) => {
    handleArrowKeyUpOrDown(e, this.state.listToShow, this.state.listSelectedIndex, this.dispatch)
    || handleEnterKeyOnList(e, this.state.listToShow, this.state.listSelectedIndex, this.handleSelectItem, this.dispatch)
    || handleEscape(e, this.state, this.dispatch);
  }

  render = () => {

    const data = this.state.listToShow.map(this.listMappingFn);

    return (
        <TerminalList
            data={data}
            sectionTitle={this.sectionTitle}
            onSelectItem={this.handleSelectItem}
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
    console.log('handleArrowKeyUpOrDown');
    e.preventDefault();
    const adjustment = e.key === 'ArrowDown' ? 1 : -1;
    const newIndex = Math.max(0, Math.min(selectedIndex + adjustment, list.length - 1));
    dispatch({ type: ACTIONS.SET_LIST_SELECTED_INDEX, payload: newIndex });
    return true;
  }
  return false;
}

function handleEscape(e, state, dispatch) {
  if (e.key === 'Escape') {
    const prevState = state.history.pop();
    console.log('### prevState', prevState)
    dispatchSetTerminalState(dispatch, prevState.listToShow, prevState.terminalState, prevState.listSelectedIndex, false);
  }
}

function handleEnterKeyOnList(e, list, selectedIndex, handleSelectItem) {
  console.log('handle enter on list')
  if (e.key === 'Enter') {
    handleSelectItem(list[selectedIndex]);
    return true;
  }
  return false;
}
