import React from 'react';
import {useTerminal} from "./terminal/TerminalContext.jsx";

const Photo = ({cssClasses, borderStyle}) => {

  const {state} = useTerminal();

  borderStyle = borderStyle || {borderColor: 'white'}

  return (
      <div
          className={`h-20 w-20 relative bg-green-600 rounded-full border-2 bg-cover bg-[url('/photo.jpg')] ${cssClasses}`}
          style={{'--fade-delay': '0.4s', ...borderStyle}}>
      </div>
  );
};

export default Photo;
