import React from 'react';
import {ACTIONS, useTerminal} from "./terminal/TerminalContext.jsx";

const TerminalInput = ({inputRef, handleKeyDown}) => {

  const {state, dispatch} = useTerminal();

  return (
      <div className="p-5">
        <span>### Welcome to the CV Terminal. Type 'help' for available commands ###</span>
        <div className="whitespace-pre-line max-[420px]:text-xs">{state.commandOutput}</div>
        <div className="flex flex-wrap md:flex-nowrap w-full pt-2">
          <span className="whitespace-nowrap">[firegloves@intrepid ~]$</span>
          <input
              ref={inputRef}
              value={state.commandInput}
              onChange={(e) => dispatch({type: ACTIONS.SET_COMMAND_INPUT, payload: e.target.value})}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent focus:outline-none pl-2"
          />
        </div>
      </div>
  );
};

export default TerminalInput;
