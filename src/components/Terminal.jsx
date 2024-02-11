import React, {useEffect} from 'react';
import {useTerminal} from '../TerminalContext.jsx';
import {useTerminalHook} from "../hooks/useTerminalHook.js";
import {
  STATE_NAMES,
  TerminalCommandState,
  TerminalListSkillState,
  TerminalWorkExpDetailsState
} from "../state/terminalStates.jsx";

const Terminal = ({closeModal}) => {

  const {state: {skills, workExps, links, publications, projects}} = useTerminal();

  const {
    terminalListItems,
    setTerminalListItems,
    terminalState,
    setTerminalState,
    input,
    setInput,
    inputRef,
    history,
    setHistory,
    handleSelectSkill,
    handleSelectWorkExp,
    selectedIndex,
    setSelectedIndex,
    selectedWorkExp,
    openExternalLink,
  } = useTerminalHook();

  const getTerminalStateHandler = (terminalState) => {
    switch (terminalState) {
      case STATE_NAMES.LIST_SKILLS:
        return handleSelectSkill;
      case STATE_NAMES.LIST_WORK_EXPS:
        return handleSelectWorkExp;
      case STATE_NAMES.LIST_LINKS:
      case STATE_NAMES.LIST_PUBLICATIONS:
      case STATE_NAMES.LIST_PROJECTS:
        return openExternalLink;
      default:
        return () => {}
    }
  }

  const currentState = (terminalState) => {
    console.log('setting terminal state', terminalState)
    switch (terminalState) {
      case STATE_NAMES.COMMAND:
        return new TerminalCommandState(setTerminalState, input, setInput, history, setHistory, inputRef,
            setTerminalListItems, skills, workExps, links, publications);
      case STATE_NAMES.WORK_EXP_DETAILS:
        return TerminalWorkExpDetailsState(setTerminalState, selectedWorkExp, setTerminalListItems, setSelectedIndex);
      case STATE_NAMES.LIST_SKILLS:
      case STATE_NAMES.LIST_WORK_EXPS:
      case STATE_NAMES.LIST_LINKS:
      case STATE_NAMES.LIST_PUBLICATIONS:
      case STATE_NAMES.LIST_PROJECTS:
        return new TerminalListSkillState(setTerminalState, terminalListItems, setTerminalListItems, selectedIndex,
            setSelectedIndex, getTerminalStateHandler(terminalState), setTerminalListItems);
      default:
        return {
          render: () => {
          }
        };
    }
  };

  const {render} = currentState(terminalState);

  useEffect(() => {
    inputRef.current?.focus();
    console.log((inputRef.current ? '' : 'not ') +'focusing')
  }, [inputRef]);

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex justify-center items-center p-10 text-green-400">
        <div
            onClick={() => inputRef.current && inputRef.current.focus()}
            className="terminal w-5/6 max-w-[1000px] h-70vh bg-[#0D0208] text-green-500 overflow-hidden h-[500px] text-sm flex flex-col">
          <div className="flex justify-between items-center bg-[#333333] p-2 rounded-t text-lg">
            <h1 className="text-center flex-1">CV Terminal</h1>
            <button onClick={closeModal} className="text-2xl hover:text-red-600">&#x2715;</button>
          </div>
          {render()}
        </div>
      </div>
  );
};

export default Terminal;
