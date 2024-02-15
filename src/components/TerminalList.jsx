// src/components/TerminalList.jsx
import React, {useEffect, useRef} from 'react';
import {ACTIONS, useTerminal} from "../TerminalContext.jsx";

const TerminalList = ({data, sectionTitle, onSelectItem, selectedIndex, onKeyDown}) => {

  const {state: {listFilterValue}} = useTerminal();
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.focus();
    console.log('use effect containerRef running')
  }, []);
  console.log('use effect containerRef')

  useEffect(() => {
    itemRefs.current[selectedIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    console.log('use effect scrollIntoView running')
  }, [selectedIndex]);
  console.log('use effect scrollIntoView')

  return (
      <div
          tabIndex={-1}
          ref={containerRef}
          onKeyDown={onKeyDown}
          className="overflow-y-auto h-full p-5 focus:outline-none">

        <h3 className="text-lg font-bold mb-2 underline decoration-green-500 text-center">
          {sectionTitle}
        </h3>

        <div className="flex mb-2 pl-2 pb-2 border-b-2 border-green-400">
          <span>Type to filter: </span>
          <input
              value={listFilterValue}
              className="flex-1 bg-transparent focus:outline-none text-green-400 pl-2"
          />
        </div>

        {data.filter(item => item.toLowerCase().startsWith(listFilterValue.toLowerCase())).map((item, index) => (
            <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`p-2 ${selectedIndex === index ? 'bg-amber-200' : 'transparent'}`}
                onClick={() => onSelectItem(index)}
                tabIndex={0}>
              {item}
            </div>
        ))}
      </div>
  );
};

export default TerminalList;
