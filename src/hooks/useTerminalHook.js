import {useCallback, useEffect, useRef, useState} from 'react';
import {useTerminal} from "../TerminalContext";
import {STATE_NAMES} from "../state/terminalStates.jsx";
import {openLinkInNewTab} from "../utils/utils.js";

export const useTerminalHook = () => {

  const [terminalListItems, setTerminalListItems] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedWorkExp, setSelectedWorkExp] = useState(0);
  const {state: {mode, skills, workExps}, dispatch} = useTerminal(); // Utilizza dispatch per interagire con lo stato globale
  const [terminalState, setTerminalState] = useState(STATE_NAMES.COMMAND);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState('');
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
    setTerminalListItems(filteredWorkExps);
    setTerminalState(STATE_NAMES.LIST_WORK_EXPS)
    setSelectedIndex(0);
  }, [skills, workExps, setTerminalState, setTerminalListItems]);

  const handleSelectWorkExp = useCallback(workExp => {
    setSelectedWorkExp(workExp);
    setTerminalState(STATE_NAMES.WORK_EXP_DETAILS)
    console.log('work exp set')
  }, [workExps, setTerminalState, setSelectedWorkExp]);
  console.log('handleSelectWorkExp')

  const openExternalLink = useCallback(link => {
    openLinkInNewTab(link.link);
    console.log('link opened')
  }, [workExps, setTerminalState, setSelectedWorkExp]);
  console.log('handleSelectLink')

  return {
    terminalListItems,
    setTerminalListItems,
    terminalState,
    setTerminalState,
    input,
    setInput,
    inputRef,
    history,
    setHistory,
    selectedIndex,
    setSelectedIndex,
    selectedWorkExp,
    handleSelectSkill,
    handleSelectWorkExp,
    openExternalLink
  };
};
