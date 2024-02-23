import React, {useState} from 'react';
import {ACTIONS, useTerminal} from "./terminal/TerminalContext.jsx";
import {themesToListToShow} from "../utils/utils.js";

const ThemeList = () => {

  const [isThemeListOpen, setIsThemeListOpen] = useState(false);
  const {state: {theme}, dispatch} = useTerminal();

  const themeList = themesToListToShow();

  const toggleThemeList = () => {
    setIsThemeListOpen(!isThemeListOpen);
  }

  const onSelectItem = (themName) => {
    dispatch({
      type: ACTIONS.SET_THEME_FROM_LIST,
      payload: themName
    });
    toggleThemeList()
  }

  return (
      <div
          tabIndex={-1}
          className="overflow-y-auto pl-3 focus:outline-none basis-32 cursor-pointer">

        <div className="h-[30px] flex items-center"
             onClick={toggleThemeList}>
          <div className="diagonal-square relative w-[30px] h-[30px] rounded-lg overflow-hidden"
               style={{backgroundColor: theme.bgColor}}>
            <div className="diagonal-half absolute w-full h-full"
                 style={{clipPath: 'polygon(0 0, 100% 0, 0 100%)', backgroundColor: theme.textColor}}></div>
          </div>
          <span className="pl-2 text-sm md:text-lg max-[420px]:hidden">Themes</span>
        </div>

        {isThemeListOpen && (
            <div
                className={`absolute mt-1 z-10 border-2 rounded`}
                style={{backgroundColor: theme.headerBgColor, borderColor: theme.borderColor}}>

              {themeList.map((item, index) => (
                  <div
                      key={index}
                      className="p-2 text-sm md:text-md"
                      style={{backgroundColor: item.headerBgColor, color: item.textColor}}
                      onClick={() => onSelectItem(item.title)}
                      tabIndex={0}>
                    {item.title}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default ThemeList;
