import React, {useEffect} from 'react';
import {useTerminal} from '../TerminalContext.jsx';
import {useTerminalHook} from "../hooks/useTerminalHook.js";
import {
  STATE_NAMES,
  TerminalCommandState,
  TerminalWorkExpDetailsState
} from "../state/terminalStates.jsx";
import {getCurrentState} from "../state/stateManagement.js";

const Terminal = ({closeModal}) => {

  const {state, dispatch} = useTerminal();

  const {
    inputRef,
    handleSelectSkill,
    handleSelectWorkExp,
    openExternalLink,
  } = useTerminalHook();

  const currentState = getCurrentState(state, dispatch, inputRef, handleSelectSkill, handleSelectWorkExp, openExternalLink);

  const {render} = currentState;

  useEffect(() => {
    inputRef.current?.focus();
    console.log((inputRef.current ? '' : 'not ') + 'focusing')
  }, [inputRef]);

  console.log('state.history', state.history)

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex justify-center items-center p-10 text-green-400">
        {/*#{state.history}#*/}
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
