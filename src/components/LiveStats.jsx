import React from "react";

import PinkHeartIcon from "../assets/images/Pink_heart.png";
import HrvIcon from "../assets/images/hrv.png";
import Glucose from "../assets/images/LeftSideCard/Glucose.png";

const LiveStats = ({ hr, sbp ,dbp ,glucose }) => {
  const liveStatsData = [
    { title: "Heart Rate", value: `${hr}`, unit: "BPM", icon: PinkHeartIcon },
    { 
      title: "Blood Pressure", 
      value: `${sbp}/${dbp}`, 
      unit: "mmHg", 
      icon: HrvIcon 
    },
    { title: "HbA1c", value: `${glucose}`, unit: "mmol/L", icon: Glucose },
  ];

  return (
    <div className="flex flex-col items-center mt-4 space-y-4">
      <div className="flex flex-wrap justify-center space-x-2 md:space-x-4">
        {liveStatsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-24 p-2 mb-4 bg-white shadow-md rounded-2xl md:w-40 md:p-4"
          >
            <h2 className="text-xs font-semibold text-center md:text-sm">
              {stat.title}
            </h2>
            <p className="mt-1 text-base font-bold text-center md:text-xl">
              {stat.value}{" "}
              <span className="text-sm md:text-base">{stat.unit}</span>
            </p>
            <img
              src={stat.icon}
              alt={stat.title}
              className="object-contain w-8 h-8 mt-1 md:w-12 md:h-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStats;


