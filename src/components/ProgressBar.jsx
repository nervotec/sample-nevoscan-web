import React, { useEffect, useState } from "react";

const ProgressBar = ({ progressRef ,scanVisibility }) => {
  const [progressValue, setProgressValue] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);



  useEffect(() => {

    // Reset progress value to 0 when scanVisibility is true
    if (scanVisibility) {
      setProgressValue(0);
      setIsProcessing(false);
    }

    const updateProgress = () => {
      if (progressRef.current) {
        const value = Math.floor(progressRef.current.value);
        setProgressValue(value);
        if (value >= 100) {
          setIsProcessing(true);
        }
      }
    };

    const interval = setInterval(updateProgress, 100);

    return () => clearInterval(interval);
  }, [progressRef ,scanVisibility]);

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-md custom-progress">
      <progress
        ref={progressRef}
        max="100"
        value={progressValue}
        className="absolute w-full h-4 bg-gray-200 rounded-md custom-progress"
      ></progress>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-4 text-center">
        {isProcessing ? "Processing..." : `${progressValue}%`}
      </div>
    </div>
  );
};

export default ProgressBar;

