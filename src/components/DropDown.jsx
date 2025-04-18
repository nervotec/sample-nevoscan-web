import React, { useState, useEffect } from "react";

const Dropdown = ({ onSelectCamera }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    async function getCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        setCameras(videoDevices);

        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0]); // Set the default camera
          onSelectCamera(videoDevices[0]); // Notify parent component about the selected camera
        }
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    }
    getCameras();
  }, [onSelectCamera]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCameraSelect = (camera) => {
    setSelectedCamera(camera);
    onSelectCamera(camera);  // Pass the selected camera to the parent component
    setIsOpen(false);  // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedCamera ? selectedCamera.label : "Select Camera"}
          <svg
            className="w-5 h-5 -mr-1 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {cameras.length > 0 ? (
              cameras.map((camera, index) => (
                <button
                  key={camera.deviceId}
                  onClick={() => handleCameraSelect(camera)}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700"
                  role="menuitem"
                  id={`menu-item-${index}`}
                >
                  {camera.label || `Camera ${index + 1}`}
                </button>
              ))
            ) : (
              <div className="block w-full px-4 py-2 text-sm text-left text-gray-700">
                No cameras available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
