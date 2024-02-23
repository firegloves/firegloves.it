import React, {useEffect, useState} from 'react';
import Terminal from "./terminal/Terminal.jsx";
import {TerminalProvider} from "./terminal/TerminalContext.jsx";

const Home = () => {

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // Stato per il tracking del caricamento dell'immagine

  useEffect(() => {
    const img = new Image();
    img.src = '/photo.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
      <div
          className="bg-blue-500 min-h-screen bg-[url('/bg-home.jpg')] bg-center bg-cover">

        {!imageLoaded && (
        <div className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-50">
          <div
              className="loader relative w-32 h-32 rounded-full bg-green-600 flex items-center justify-center border-2 border-white">
            <span className="text-white font-bold text-6xl">F</span>
            <div className="dot absolute bg-green-600 rounded-full w-6 h-6 border-2 border-white"
                 style={{'--angle': '0deg', 'transform': 'translateX(100px)'}}></div>
            <div className="dot absolute bg-green-600 rounded-full w-6 h-6 border-2 border-white"
                 style={{'--angle': '180deg', 'transform': 'translateX(100px)'}}></div>
          </div>
        </div>
        )}
        {imageLoaded && (
        <div className="main flex flex-col items-center h-screen pt-[150px]">
          <div
              className="h-20 w-20 relative top-2 bg-green-600 rounded-full border-2 border-white bg-cover bg-[url('/photo.jpg')]">
          </div>
          <div
              className="bg-green-600 text-white font-bold py-2 px-4 rounded-full justify-center items-center border-2 border-white">
            Luca Corsetti - Software Engineer
          </div>

          <button
              className="bg-green-600 text-white font-bold text-4xl px-10 mt-[50px] rounded-sm animate-pulse border-2 border-white"
              onClick={() => setIsTerminalOpen(true)}>
            T
          </button>

          {isTerminalOpen &&
              <TerminalProvider>
                <Terminal closeModal={() => setIsTerminalOpen(false)}/>
              </TerminalProvider>}
        </div>
            )}
      </div>
  );
};

export default Home;
