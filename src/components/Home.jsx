import React, {useEffect, useState} from 'react';
import Terminal from "./terminal/Terminal.jsx";
import {TerminalProvider} from "./terminal/TerminalContext.jsx";
import Loader from "./Loader.jsx";
import Photo from "./Photo.jsx";

const Home = () => {

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // Stato per il tracking del caricamento dell'immagine

  useEffect(() => {
    const img = new Image();
    img.src = '/bg-home.jpg';
    img.onload = () => {
      setImageLoaded(true);
    }
  }, []);

  return (
      <div
          className="min-h-screen">

        <Loader imageLoaded={imageLoaded}></Loader>

        {imageLoaded && (
            <div
                className="main absolute w-full flex flex-col items-center h-screen pt-[150px] bg-[url('/bg-home.jpg')] bg-center bg-cover fadeIn"
                style={{'--fade-delay': '0.2s'}}>

              <Photo cssClasses={'fadeIn z-[1] top-2'}></Photo>

              <div
                  className="bg-green-600 text-white font-bold py-2 px-4 rounded-full justify-center items-center border-2 border-white fadeIn"
                  style={{'--fade-delay': '0.6s'}}>
                Luca Corsetti - Software Engineer
              </div>

              <button
                  className="bg-green-600 text-white font-bold text-4xl px-10 mt-[50px] rounded-sm border-2 border-white animate-pulse"
                  // style={{ opacity: isButtonVisible ? '1' : '0' }}
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
