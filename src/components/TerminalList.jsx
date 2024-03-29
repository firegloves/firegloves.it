import React, {useEffect, useRef} from 'react';
import {ACTIONS, useTerminal} from "./terminal/TerminalContext.jsx";

const TerminalList = ({data, sectionTitle, onSelectItem, selectedIndex, onKeyDown}) => {

  const {state: {listFilterValue, theme}, dispatch} = useTerminal();
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    itemRefs.current[selectedIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [selectedIndex]);

  const selectItem = (index) => {
    dispatch({type: ACTIONS.SET_LIST_SELECTED_INDEX, payload: index});
    onSelectItem({key: 'Enter'}, index)
  }

  return (
      <div
          tabIndex={-1}
          ref={containerRef}
          onKeyDown={onKeyDown}
          className="overflow-y-auto h-full p-5 focus:outline-none">

        <h3 className="text-lg font-bold mb-2 underline text-center">
          {sectionTitle}
        </h3>

        <div
            style={{borderColor: theme.borderColor}}
            className="mb-2 pl-2 pb-2 border-b-2 hidden sm:flex">
          <span>Type to filter: </span>
          <input
              onChange={() => {
              }}
              value={listFilterValue}
              className="flex-1 bg-transparent focus:outline-none pl-2"
          />
        </div>

        {data.map((item, index) => (
            <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`p-2`}
                style={{backgroundColor: selectedIndex === index ? theme.selectedItemBgColor : 'transparent'}}
                onClick={() => selectItem(index)}
                tabIndex={0}>
              {item}
            </div>
        ))}
      </div>
  );
};

export default TerminalList;
