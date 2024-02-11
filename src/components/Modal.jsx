import React from 'react';
import Terminal from './Terminal';

const Modal = ({closeModal}) => {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex justify-center items-center p-10 text-green-400">
        <div className="bg-black bg-opacity-60 rounded-lg max-w-4xl w-full h-[500px]">
          {/* header */}
          <div className="flex justify-between items-center bg-[#333333] p-2 rounded-t">
            <h1 className="text-center flex-1">Applicazione Terminale</h1>
            <button onClick={closeModal} className="hover:text-red-600">X</button>
          </div>
          {/*<button onClick={closeModal} className="float-right font-bold">X</button>*/}
          <Terminal />
        </div>
      </div>
      // <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      //   <div className="bg-white p-5 rounded-lg max-w-4xl w-full">
      //     <Terminal className="text-green-400"/>
      //   </div>
      // </div>
  );
};

export default Modal;
