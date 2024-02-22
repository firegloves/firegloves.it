import React, {useState} from 'react';
import Terminal from "./terminal/Terminal.jsx";
import {TerminalProvider} from "./terminal/TerminalContext.jsx";

const Home = () => {

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
      <div
          className="bg-blue-500 min-h-screen bg-[url('/bg-home.jpg')] bg-center bg-cover">

        <div className="flex flex-col items-center h-screen pt-[150px]">

          <div
              className="h-20 w-20 relative top-2 bg-green-600 rounded-full border-2 border-white bg-cover bg-[url('/photo.jpg')]">
          </div>
          <div className="bg-green-600 text-white font-bold py-2 px-4 rounded-full justify-center items-center border-2 border-white">
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
      </div>
  );
};

export default Home;
