import React, { useState, useEffect, useRef } from "react";
import ResultCard from "./ResultCard";
import { Button } from "@/components/ui/button";
import Age from "../assets/images/LeftSideCard/Age.png";
import bp from "../assets/images/RightSideCard/Bp.png";
import hrv from "../assets/images/RightSideCard/Hrv.png";
import hr from "../assets/images/RightSideCard/Hr.png";
import spo2 from "../assets/images/RightSideCard/Spo2.png";
import rr from "../assets/images/RightSideCard/Respiration.png";
import Hemoglobin from "../assets/images/LeftSideCard/Hemoglobin.png";
import Glucose from "../assets/images/LeftSideCard/Glucose.png";
import { checkResults, getResults } from "../services/backendService";

const ResultPage = ({ jobID, setScanVisibility, setScanButtonDisable, setSpinnerVisibility }) => {
  const [results, setResults] = useState({
    HR: "--",
    RR: "--",
    SDNN: "--",
    SPO2: "--",
    DBP: "--",
    SBP: "--",
    GLUCOSE: "--",
    HEMOGLOBIN: "--",
    AGE: "--",
    HEALTHSCORE: "--",
  });

  const pollingRef = useRef(null);
  const firstFetchDone = useRef(false);
  const [jobStatus, setJobStatus] = useState(null);

  useEffect(() => {
    if (!jobID) {
      setResults({
        HR: "--",
        RR: "--",
        SDNN: "--",
        SPO2: "--",
        DBP: "--",
        SBP: "--",
        GLUCOSE: "--",
        HEMOGLOBIN: "--",
        AGE: "--",
        HEALTHSCORE: "--",
      });
      firstFetchDone.current = false;
      return;
    }



    pollingRef.current = setInterval(()=>checkResults(jobID, setJobStatus), 1000);

    return () => {
      clearInterval(pollingRef.current);
    };
  }, [jobID]);

  useEffect(() => {
    const fetchResults = async () => {
      if (jobStatus === "Completed") {
        clearInterval(pollingRef.current);
        const results = await getResults(jobID);
        console.log("results",results);
        console.log("results.estimates",results.estimates);
        const data = results.estimates[0][0].scan_details[0];
        console.log("data",data);
        setResults(data);
        setSpinnerVisibility(false);
      }
    }
    fetchResults();
  }, [jobStatus]);

  const resultsData = [
    { title: "Heart Rate", value: `${results.HR} BPM`, icon: hr, status: "" },
    { title: "Respiration Rate", value: `${results.RR} BrPM`, icon: rr, status: "" },
    { title: "Heart Rate Variability", value: `${results.SDNN} ms`, icon: hrv, status: "" },
    { title: "Blood Pressure", value: `${results.SBP}/${results.DBP} mmHg`, icon: bp, status: "" },
    { title: "Blood Glucose (HbA1c)", value: `${results.GLUCOSE} mmol/L`, icon: Glucose, status: "" },
    { title: "Hemoglobin", value: `${results.HEMOGLOBIN} %`, icon: Hemoglobin, status: "" },
    { title: "SpO2", value: `${results.SPO2} %`, icon: spo2, status: "" },
    { title: "Health Score", value: `${results.HEALTHSCORE} %`, icon: "", status: "" },
  ];

  const rescanButton = () => {
    setScanVisibility(true);
    setScanButtonDisable(false);
    firstFetchDone.current = false;
    setJobStatus(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <div className="relative z-10 flex min-h-screen">
        <div className="flex flex-col flex-1">
          <div className="container px-4 py-8 mx-auto lg:px-16">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                <h1 className="mb-2 text-xl font-bold text-left lg:pl-0">
                  Scan Results
                </h1>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-2 md:gap-0.5 lg:grid-cols-3 lg:gap-0">
                  {resultsData.map((result, index) => (
                    <ResultCard
                      key={index}
                      title={result.title}
                      value={result.value}
                      icon={result.icon}
                      status={result.status}
                    />
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-1/3 text-white bg-blue-500 hover:bg-blue-600"
                    onClick={rescanButton}
                  >
                    Rescan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
