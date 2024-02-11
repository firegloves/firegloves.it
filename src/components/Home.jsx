import React, {useState} from 'react';
import Modal from './Modal';
import Terminal from "./Terminal.jsx";
import {TerminalProvider} from "../TerminalContext.jsx";

const Home = () => {

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
      <div
          className="bg-blue-500 min-h-screen flex flex-col items-center justify-center bg-[url('/bg-home.jpg')] bg-center bg-cover">

        <div className="flex justify-center items-center h-screen">
          <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-full animate-pulse"
              onClick={() => setIsTerminalOpen(true)}
          >
            Apri Terminale
          </button>

          {isTerminalOpen &&
              <TerminalProvider>
                <Terminal closeModal={() => setIsTerminalOpen(false)}/>
              </TerminalProvider>}
        </div>

        {/*<div className="flex-1 flex flex-col items-center justify-center">*/}
        {/*  /!*<h1 className="text-4xl text-white font-bold mb-2">*!/*/}
        {/*  /!*  Benvenuto nel Mio Mondo Sottomarino*!/*/}
        {/*  /!*</h1>*!/*/}
        {/*  /!*<p className="text-xl text-white mb-4">*!/*/}
        {/*  /!*  Immergiti nella mia esperienza professionale e creatività.*!/*/}
        {/*  /!*</p>*!/*/}
        {/*  /!* Altri elementi, come bottoni o link *!/*/}
        {/*</div>*/}

        {/* Footer o altri elementi */}
      </div>
  );
};

export default Home;
