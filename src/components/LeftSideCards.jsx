import React from "react";
import respirationRate from "../assets/images/LeftSideCard/happy.png";
import Glucose from "../assets/images/LeftSideCard/Glucose.png";
import Hemoglobin from "../assets/images/LeftSideCard/Hemoglobin.png";
import Health from "../assets/images/LeftSideCard/Hemoglobin.png";
import Age from "../assets/images/LeftSideCard/Age.png";

const LeftSideCards = () => {
  return (
    <div className="hidden md:grid md:grid-cols-1 md:gap-3">
      <div className="bg-white rounded-2xl shadow-md p-4 w-[220px] h-[100px]">
        <div className="pb-1 text-xs font-semibold text-gray-800">Body Age</div>
        <div className="flex justify-between pb-3">
          <div className="text-[32px]">
            28<span className="ml-1 text-base">old</span>
          </div>
          <div className="mr-1">
            <img
              src={Age}
              alt="Age"
              className="object-cover w-6 h-6 mx-auto mt-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 w-[220px] h-[100px]">
        <div className="pb-1 text-xs font-semibold text-gray-800">Emotion</div>
        <div className="flex justify-between pb-3">
          <div className="text-[24px]">Happy</div>
          <div className="mr-1">
            <img
              src={respirationRate}
              alt="Emotion"
              className="object-cover w-6 h-6 mx-auto mt-2"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-4 grid grid-cols-1 w-[220px] h-[210px]">
        <div>
          <div className="pb-1 text-xs font-semibold text-gray-800">
            Glucose (HbA1c)
          </div>
          <div className="flex justify-between pb-3">
            <div className="text-[32px] text-center">100</div>
            <div className="mr-1">
              <img
                src={Glucose}
                alt="Glucose"
                className="object-cover w-[36px] h-[36px] mx-auto"
              />
            </div>
          </div>
        </div>
        <div className="pt-2 border-t-2">
          <div className="pb-1 text-base font-semibold text-gray-800 text-start">
            Hemoglobin
          </div>
          <div className="flex justify-between">
            <div className="text-[32px]">
              13.9<span className="text-[10px] text-gray-400 ml-1">g/dl</span>
            </div>
            <div className="-mt-3 -mr-2">
              <img
                src={Hemoglobin}
                alt="Hemoglobin"
                className="object-cover w-[42px] h-[60px] mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 w-[220px] h-[100px]">
        <div className="pb-2 text-xs font-semibold text-gray-800 text-start">
          Health Score
        </div>
        <div className="flex justify-between">
          <div className="capitalize bg-gray-300 text-center w-[90px] h-[22px] rounded-full">
            <div className="mt-1 text-xs font-semibold">good</div>
          </div>
          {/* <div className="ml-2 -mt-1">
            <img
              src={Health}
              alt="Health Score"
              className="object-cover w-[38px] h-[38px] mx-auto"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LeftSideCards;
