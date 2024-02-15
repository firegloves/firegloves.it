import React, {useEffect} from 'react';
import {useTerminal} from './TerminalContext.jsx';
import {useTerminalHook} from "./useTerminalHook.js";
import {
  STATE_NAMES,
  TerminalCommandState,
  TerminalWorkExpDetailsState
} from "./terminalStates.jsx";
import {getCurrentState} from "./stateManagement.js";
import ThemeList from "../ThemeList.jsx";

const Terminal = ({closeModal}) => {

  const {state, dispatch} = useTerminal();

  const {
    inputRef,
    handleSelectSkill,
    handleSelectWorkExp,
    openExternalLink,
    handleSelectTheme
  } = useTerminalHook();

  const currentState = getCurrentState(state, dispatch, inputRef, handleSelectSkill, handleSelectWorkExp, openExternalLink, handleSelectTheme);

  const {render} = currentState;

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex justify-center items-center p-10">
        <div
            style={{color: state.theme.textColor, backgroundColor: state.theme.bgColor, borderColor: state.theme.borderColor}}
            onClick={() => inputRef.current && inputRef.current.focus()}
            className="terminal w-5/6 max-w-[1000px] h-70vh overflow-hidden h-[500px] text-sm flex flex-col">
          <div
              style={{backgroundColor: state.theme.headerBgColor}}
              className="flex justify-between items-center p-2 rounded-t text-lg">
            <ThemeList />
            <h1 className="text-center flex-1">CV Terminal</h1>
            <div className="basis-32 text-right pr-2">
              <button onClick={closeModal} className="text-2xl hover:text-red-600">&#x2715;</button>
            </div>
          </div>
          {render()}
        </div>
      </div>
  );
};

export default Terminal;
