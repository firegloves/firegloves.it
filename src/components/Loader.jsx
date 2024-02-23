import React from 'react';

const Loader = ({imageLoaded}) => {

  return (
      <div
          className={`absolute w-full flex flex-col items-center justify-center h-screen bg-black bg-opacity-50 ${imageLoaded
              ? 'fadeOut' : 'fadeIn'}`}
          style={{'--fade-duration': '0.5s'}}>
        <div
            className="loader relative w-32 h-32 rounded-full bg-green-600 flex items-center justify-center border-2 border-white">
          <span className="text-white font-bold text-6xl">F</span>
          <div className="dot absolute bg-green-600 rounded-full w-6 h-6 border-2 border-white"
               style={{'--angle': '0deg', 'transform': 'translateX(100px)'}}></div>
          <div className="dot absolute bg-green-600 rounded-full w-6 h-6 border-2 border-white"
               style={{'--angle': '180deg', 'transform': 'translateX(100px)'}}></div>
        </div>
      </div>
  );
};

export default Loader;
