import {useCallback, useEffect, useRef, useState} from 'react';
import {ACTIONS, useTerminal} from "../TerminalContext";
import {STATE_NAMES} from "../state/terminalStates.jsx";
import {openLinkInNewTab} from "../utils/utils.js";
import {dispatchSetTerminalState, dispatchSetWorkExpDetailsTerminalState} from "../actions.js";

export const useTerminalHook = () => {

  const {state: {terminalState, skills, workExps}, dispatch} = useTerminal(); // Utilizza dispatch per interagire con lo stato globale
  const inputRef = useRef(null);
  console.log('useTerminalHook')

  useEffect(() => {
    console.log((inputRef.current ? '' : 'not ') +'focusing')
    inputRef.current?.focus();
  }, [terminalState]);

  console.log('handleSelectSkill')
  const handleSelectSkill = useCallback((skill) => {
    console.log('handle select skill')
    const filteredWorkExps = workExps
      .filter(exp => skill.workExpIds.includes(exp.id));
    dispatchSetTerminalState(dispatch, filteredWorkExps, STATE_NAMES.LIST_WORK_EXPS)
  }, [skills, workExps]);

  const handleSelectWorkExp = useCallback(workExp => {
    dispatchSetWorkExpDetailsTerminalState(dispatch, workExp)
    console.log('work exp set')
  }, [workExps]);
  console.log('handleSelectWorkExp')

  const openExternalLink = useCallback(item => {
    openLinkInNewTab(item.link);
    console.log('link opened')
  }, [workExps]);
  console.log('handleSelectLink')

  return {
    inputRef,
    handleSelectSkill,
    handleSelectWorkExp,
    openExternalLink,
  };
};
