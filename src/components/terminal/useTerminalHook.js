import {useCallback, useEffect, useRef, useState} from 'react';
import {ACTIONS, useTerminal} from "./TerminalContext.jsx";
import {STATE_NAMES} from "./terminalStates.jsx";
import {openLinkInNewTab} from "../../utils/utils.js";
import {dispatchSetTerminalState, dispatchSetTheme, dispatchSetWorkExpDetailsTerminalState} from "../../actions.js";

export const useTerminalHook = () => {

  const {state: {terminalState, skills, workExps}, dispatch} = useTerminal();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [terminalState]);

  const handleSelectSkill = useCallback((skill) => {
    const filteredWorkExps = workExps
      .filter(exp => skill.workExpIds.includes(exp.id));
    dispatchSetTerminalState(dispatch, filteredWorkExps, STATE_NAMES.LIST_WORK_EXPS)
  }, [skills, workExps]);

  const handleSelectWorkExp = useCallback(workExp => {
    dispatchSetWorkExpDetailsTerminalState(dispatch, workExp)
  }, [workExps]);

  const openExternalLink = useCallback(item => {
    openLinkInNewTab(item.link);
  }, [workExps]);

  const handleSelectTheme = useCallback(theme => {
    dispatchSetTheme(dispatch, theme.title)
  }, [workExps]);

  return {
    inputRef,
    handleSelectSkill,
    handleSelectWorkExp,
    openExternalLink,
    handleSelectTheme
  };
};
