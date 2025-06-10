import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar'; 
import Dropdown from '../components/DropDown'

const ScanArea = ({ localVideoRef, progressRef, handleButtonClick, onSelectCamera, scanButtonDisable ,scanVisibility }) => {
  const [alertMessage, setAlertMessage] = useState('Face Not Detected');
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-128 h-96">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg backdrop-blur-lg"></div>
          <div className="absolute z-20 top-2 right-2">
            <Dropdown onSelectCamera={onSelectCamera} />
          </div>
          <div className="relative z-10 flex items-center justify-center">
            <div className="flex items-center justify-center w-48 h-64 border-4 border-green-500 border-dashed rounded-full">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="object-cover w-full h-full rounded-full transform scale-x-[-1]"
              />
              <div className="absolute inset-x-0 flex justify-center bottom-2">
                {/* Optional additional elements */}
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 py-1 text-center text-red-500 bg-white bg-opacity-75 rounded">
          {/* {alertMessage} */}
        </div>
        <div className='px-2 py-3 sm:px-5 sm:py-2 md:px-20 lg:px-20 lg:py-4'>
          <ProgressBar 
            progressRef={progressRef} 
            scanVisibility={scanVisibility} 
            max="100" className = "w-1/4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4" />
        </div>
      </div>
      <br/>
      <div className='py-4 '></div>
      <button 
        className={`px-8 py-1 font-sans border rounded-xl ${
          scanButtonDisable 
            ? 'bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed' 
            : 'bg-white text-black border-blue-400 hover:bg-blue-700 hover:text-white'
        }`}
        onClick={handleButtonClick}
        disabled={scanButtonDisable}
      >
        Scan
      </button>
    </div>
  );
};

export default ScanArea;
