import {ACTIONS} from "./TerminalContext.jsx";
import {STATE_NAMES} from "./state/terminalStates.jsx";

export function dispatchSetWorkExpDetailsTerminalState(dispatch, selectedWorkExp) {
  dispatch({
    type: ACTIONS.SET_TERMINAL_STATE,
    payload: {
      listToShow: [],
      terminalState: STATE_NAMES.WORK_EXP_DETAILS,
      selectedWorkExp,
      listSelectedIndex: 0,
      updateHistory: true
    }});
}

export function dispatchSetTerminalState(dispatch, listToShow, terminalState, listSelectedIndex, updateHistory) {
  dispatch({
    type: ACTIONS.SET_TERMINAL_STATE,
    payload: {
      listToShow,
      terminalState,
      selectedWorkExp: {},
      listSelectedIndex: listSelectedIndex || 0,
      updateHistory: updateHistory !== undefined ? updateHistory : true
    }});
}
