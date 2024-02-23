import React, {useEffect} from 'react';
import {useTerminal} from './TerminalContext.jsx';
import {useTerminalHook} from "./useTerminalHook.js";
import {getCurrentState} from "./stateManagement.js";
import ThemeList from "../ThemeList.jsx";
import {goBack} from "../../utils/utils.js";

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
      <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex justify-center items-center z-[2]">
        <div
            style={{color: state.theme.textColor, backgroundColor: state.theme.bgColor, borderColor: state.theme.borderColor}}
            onClick={() => inputRef.current && inputRef.current.focus()}
            className="terminal max-md:w-9/10 w-5/6 max-w-[1000px] h-70vh overflow-hidden h-[500px] text-sm flex flex-col">
          <div
              style={{backgroundColor: state.theme.headerBgColor}}
              className="flex justify-between items-center p-2 rounded-t text-lg">
            <ThemeList />
            <h1 className="text-center flex-1 text-sm md:text-lg">CV Terminal</h1>
            <div className="basis-32 text-right pr-2">
              <button onClick={() => goBack(state, dispatch)} className="text-2xl hover:text-red-600 pr-2">&#x25C0;</button>
              <button onClick={closeModal} className="text-2xl hover:text-red-600 pl-2">&#x2715;</button>
            </div>
          </div>
          {render()}
        </div>
      </div>
  );
};

export default Terminal;
