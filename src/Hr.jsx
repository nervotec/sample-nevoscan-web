import React, { useEffect, useRef, useState } from 'react';
import LiveStats from './components/LiveStats'; // Ensure the correct import path

const Hr = ({ jobID, scanVisibility }) => {
  const [hr, setHr] = useState("--");
  const [glucose, setGlucose] = useState("--");
  const [sbp, setSbp] = useState("--");
  const [dbp, setDbp] = useState("--");

  // Refs to track if the first fetch is done for each vital sign
  const firstFetchDoneHr = useRef(false);
  const firstFetchDoneGlucose = useRef(false);
  const firstFetchDoneSbp = useRef(false);
  const firstFetchDoneDbp = useRef(false);

  const reset_vitals = () => {
    setHr("--");
    setGlucose("--");
    setSbp("--");
    setDbp("--");

    // Reset the first fetch tracking for all vitals
    firstFetchDoneHr.current = false;
    firstFetchDoneGlucose.current = false;
    firstFetchDoneSbp.current = false;
    firstFetchDoneDbp.current = false;
  };

  // Reset vital values every time the scan component becomes visible
  useEffect(() => {
    reset_vitals();
  }, [scanVisibility]);

  

  return (
    <LiveStats 
      hr={hr} 
      glucose={glucose}
      sbp={sbp}
      dbp={dbp}
    />
  );
};

export default Hr;



