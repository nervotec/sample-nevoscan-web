import React, { useState, useEffect ,useRef } from "react";
import Header from "../components/Header";
import Stats from "../components/Stats";
import Hr from "../Hr";
import VideoStream from "../VideoStream.jsx";
import LeftSideCards from "../components/LeftSideCards.jsx";
import ResultPage from "@/components/ResultPage";
import SpinnerLoading from "../components/SpinnerLoading";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const HomeScreen = () => {
  const [jobID, setJobID] = useState(null);
  const [scanVisibility, setScanVisibility] = useState(true);
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const [scanButtonDisable, setScanButtonDisable] = useState(false);
  const [results, setResults] = useState({
    HR: "--",
    RR: "--",
    SDNN: "--",
    SpO2: "--",
  });
  const [errorStatus, setErrorStatus] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (jobID == null) {
      setResults({
        HR: "--",
        RR: "--",
        SDNN: "--",
        SpO2: "--",
      });

    } 
  }, [jobID]);

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] z-0"></div>
      <div className="relative flex min-h-screen">
        <div className="z-10 flex flex-col flex-1">
          <Header />
          <div className="flex flex-1 px-4 py-4 sm:px-10 sm:py-8 md:px-16 md:py-12 lg:px-20 lg:py-16">
            <div className="grid flex-1 grid-cols-8 gap-4 md:grid-cols-12">
              <div className="hidden md:block md:col-span-2">
                {/* <LeftSideCards /> */}
              </div>
              <div className="flex flex-col items-center col-span-12 space-y-4 sm:col-span-8 sm:space-y-6 md:col-span-8">
                {/* Scan visibility with transition */}
                <div
                  className={`${
                    !scanVisibility ? "hidden" : "block"
                  } animation-slide-up`}
                >
                  <VideoStream 
                    jobID={jobID}
                    setJobID={setJobID}
                    scanButtonDisable={scanButtonDisable}
                    setScanButtonDisable={setScanButtonDisable}
                    scanVisibility = {scanVisibility}
                    setScanVisibility={setScanVisibility}
                    setSpinnerVisibility={setSpinnerVisibility}
                  />
                  <Hr jobID={jobID} scanVisibility={scanVisibility} />
                </div>
                <div
                  className={`${
                    scanVisibility || spinnerVisibility ? "hidden" : "block"
                  } animation-slide-up`}
                >
                  <ResultPage jobID={jobID} setScanVisibility={setScanVisibility} 
                    setScanButtonDisable={setScanButtonDisable}
                    setSpinnerVisibility={setSpinnerVisibility}
                  />
                </div>
                <div
                  className={`${
                    !spinnerVisibility ? "hidden" : "block"
                  } animation-slide-up h-full flex items-center justify-center`}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <SpinnerLoading
                      text="Analyzing... Please wait."
                      size="10"
                      color="text-blue-500"
                    />
                    <p className="mt-6 text-sm text-center text-gray-400">
                      Depending on your internet connection, this can take some time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block md:col-span-2">
                {/* <Stats jobID={jobID} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {errorStatus && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>
                {errorStatus || "An unknown error occurred."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center sm:justify-end">
              <Button 
                className="w-full px-4 py-2 text-sm text-white bg-blue-500 rounded-md sm:w-auto hover:bg-blue-600 sm:text-base" 
                onClick={() => setIsDialogOpen(false)}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default HomeScreen;

