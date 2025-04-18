import React, { useState, useEffect } from "react";

import bp from "../assets/images/RightSideCard/Bp.png";
import hrv from "../assets/images/RightSideCard/Hrv.png";
import hr from "../assets/images/RightSideCard/Hr.png";
import spo2 from "../assets/images/RightSideCard/Spo2.png";
import rr from '../assets/images/RightSideCard/Respiration.png';

const Stats = ({ jobID }) => {
  const [results, setResults] = useState({
    HR: "--",
    RR: "--",
    SDNN: "--",
    SpO2: "--",
  });



  const statsData = [
    {
      title: "Blood Pressure",
      value: "--",
      status: "Normal",
      statusColor: "bg-yellow-100 text-yellow-600",
      icon: bp,
    },
    {
      title: "Respiration Rate",
      value: results.RR,
      status: "Normal",
      statusColor: "bg-yellow-100 text-yellow-600",
      icon: rr,
    },
    {
      title: "Heart Rate",
      value: results.HR,
      status: "High",
      statusColor: "bg-red-100 text-red-600",
      icon: hr,
    },
    {
      title: "Heart Rate Variability",
      value: results.SDNN,
      status: "Low",
      statusColor: "bg-yellow-100 text-yellow-600",
      icon: hrv,
      subStatus: "Stress Level",
    },
    {
      title: "SpO2",
      value: results.SpO2,
      status: "Normal",
      statusColor: "bg-green-100 text-green-600",
      icon: spo2,
    },
  ];
  return (
    <div className="hidden md:grid md:grid-cols-1 md:gap-3">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-3 w-[220px] h-[100px]"
        >
          <div className="text-xs font-semibold text-gray-800">
            {stat?.title}
          </div>
          <div className="flex justify-between">
            <div className="text-[24px] pt-1 text-start">
              {stat?.value}
              {stat?.unit && (
                <span className="text-gray-600 text-[20px]">{stat?.unit}</span>
              )}
              <div className="capitalize bg-orange-100 text-center w-[70px] h-[16px] items-center rounded-full mt-1">
                <div className="mt-0.5 text-xs font-normal text-amber-600">
                  good
                </div>
              </div>
            </div>
            <div className="mt-1.5 mr-2">
              <img
                src={stat?.icon}
                alt="Respiration Rate"
                className="object-cover w-[30px] h-[30px]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
