import React from "react";
import {TERMINAL_COMMANDS, usage} from "../utils/terminalCommands.js";
import TerminalList from "../components/TerminalList.jsx";
import WorkExpDetails from "../components/WorkExpDetails.jsx";

export const STATE_NAMES = {
  COMMAND: 'command',
  LIST_SKILLS: 'listSkill',
  LIST_WORK_EXPS: 'listWorkExps',
  WORK_EXP_DETAILS: 'workExpDetails',
  LIST_PROJECTS: 'listProjects',
  LIST_LINKS: 'listLinks',
  LIST_PUBLICATIONS: 'listPublications',
}

export class TerminalListState {

  constructor(setTerminalState, list, setList, selectedIndex, setSelectedIndex, handleSelectItem) {
    this.setTerminalState = setTerminalState;
    this.list = list;
    this.setList = setList;
    this.selectedIndex = selectedIndex;
    this.setSelectedIndex = setSelectedIndex;
    this.handleSelectItem = handleSelectItem;
  }

  handleKeyDown = (e) => {
    handleArrowKeyUpOrDown(e, this.list, this.selectedIndex, this.setSelectedIndex)
    || handleEnterKeyOnList(e, this.list, this.setList, this.selectedIndex, this.handleSelectItem)
    || handleEscape(e, this.setTerminalState, this.setList, this.setSelectedIndex);
  }

  render = () => {

    const data = this.list.map(item => item.title);

    return (
        <TerminalList
            data={data}
            onSelectItem={this.handleSelectItem}
            selectedIndex={this.selectedIndex}
            onKeyDown={this.handleKeyDown}
        />
    );
  }
}

/******************************************
 * TerminalCommandState
 *******************************************/
export class TerminalCommandState {

  constructor(setTerminalState, input, setInput, history, setHistory, inputRef, setTerminalListItems, skills, workExps,
      links, publications) {
    this.setTerminalState = setTerminalState;
    this.setTerminalListItems = setTerminalListItems;
    this.input = input;
    this.setInput = setInput;
    this.history = history;
    this.setHistory = setHistory;
    this.inputRef = inputRef;
    this.setTerminalListItems = setTerminalListItems;
    this.skills = skills;
    this.workExps = workExps;
    this.links = links;
    this.publications = publications;
    console.log('constructor')
    // focusInput();

  }

  executeCommand(cmd) {
    console.log('exe', this.inputRef.current)
    switch (cmd) {
      case TERMINAL_COMMANDS.HELP:
        this.setHistory(usage);
        break;
      case TERMINAL_COMMANDS.CORE_SKILLS:
        this.setTerminalListItems(this.skills)
        this.setTerminalState(STATE_NAMES.LIST_SKILLS)
        break;
      case TERMINAL_COMMANDS.SKILLS:
        this.setTerminalListItems(this.skills)
        this.setTerminalState(STATE_NAMES.LIST_SKILLS)
        break;
      case TERMINAL_COMMANDS.WORK_EXPS:
        this.setTerminalListItems(this.workExps)
        this.setTerminalState(STATE_NAMES.LIST_WORK_EXPS)
        break;
      case TERMINAL_COMMANDS.LINKS:
        this.setTerminalListItems(this.links)
        this.setTerminalState(STATE_NAMES.LIST_LINKS)
        break;
      case TERMINAL_COMMANDS.PUBLICATIONS:
        this.setTerminalListItems(this.publications)
        this.setTerminalState(STATE_NAMES.LIST_PUBLICATIONS)
        break;
      default:
        this.setHistory("Unknown command");
        break;
    }
    this.setInput('');
  };

  handleKeyDown = (e) => {
    console.log('useTerminal Callback running')
    if (e.key === 'Enter') {
      e.preventDefault();
      this.executeCommand(this.input);
    }
  };

  render = () => {
    return (
        <div className="p-5">
          <span>### Welcome to the CV Terminal. Type 'help' for available commands ###</span>
          <div className="whitespace-pre-line">{this.history}</div>
          <div className="flex w-full pt-2">
            <span className="whitespace-nowrap">[firegloves@intrepid ~]$</span>
            <input
                ref={this.inputRef}
                value={this.input}
                onChange={(e) => this.setInput(e.target.value)}
                onKeyDown={this.handleKeyDown}
                className="flex-1 bg-transparent focus:outline-none text-green-400 pl-2"
            />
          </div>
        </div>
    )
  }
}

/******************************************
 * TerminalListSkillState
 *******************************************/
export class TerminalListSkillState extends TerminalListState {
  constructor(setTerminalState, terminalListItems, setTerminalListItems, selectedIndex, setSelectedIndex,
      handleSelectSkill) {
    super(setTerminalState, terminalListItems, setTerminalListItems, selectedIndex, setSelectedIndex,
        handleSelectSkill);
  }
}

/******************************************
 * TerminalListWorkExpState
 *******************************************/
export class TerminalListWorkExpState extends TerminalListState {
  constructor(setTerminalState, terminalListItems, setTerminalListItems, selectedIndex, setSelectedIndex,
      handleSelectSkill) {
    super(setTerminalState, terminalListItems, setTerminalListItems, selectedIndex, setSelectedIndex,
        handleSelectSkill);
  }
}

/******************************************
 * TerminalWorkExpDetailsState
 *******************************************/
export const TerminalWorkExpDetailsState = (setTerminalState, workExp, setTerminalListItems, setSelectedIndex) => {
  const handleKeyDown = (e) => {
    handleEscape(e, setTerminalState, setTerminalListItems, setSelectedIndex);
  }

  return {
    render: () => {
      return (
          <WorkExpDetails workExp={workExp} onKeyDown={handleKeyDown}/>
      );
    }
  }
}

function handleArrowKeyUpOrDown(e, list, selectedIndex, setSelectedIndex) {
  if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    console.log('handleArrowKeyUpOrDown');
    e.preventDefault();
    const adjustment = e.key === 'ArrowDown' ? 1 : -1;
    const newIndex = Math.max(0, Math.min(selectedIndex + adjustment, list.length - 1));
    setSelectedIndex(newIndex);
    return true;
  }
  return false;
}

function handleEscape(e, setTerminalState, setTerminalListItems, setSelectedIndex) {
  if (e.key === 'Escape') {
    setTerminalState(STATE_NAMES.COMMAND);
    setTerminalListItems([]);
    setSelectedIndex(0);
  }
}

function handleEnterKeyOnList(e, list, setList, selectedIndex, handleSelectItem) {
  console.log('handle enter on list')
  if (e.key === 'Enter') {
    handleSelectItem(list[selectedIndex]);
    return true;
  }
  return false;
}
