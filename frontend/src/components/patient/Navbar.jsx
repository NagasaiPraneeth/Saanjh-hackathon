import React, { useState } from "react";
import logo from "../../assets/bg.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isDoctor }) => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationHeadingMessage, setnotificationHeadingMessage] = useState("");

  const handleBellClick = () => {
    if (hasNotification) {
      if (isDoctor) {
        setnotificationHeadingMessage("New patient: Aashish");
        setNotificationMessage("Suspected condition: Influenza");
      } else {
        setnotificationHeadingMessage("Diagnosis Done");
        setNotificationMessage("Patient Naga Sai's diagnosis is complete");
      }
      setShowNotification(true);
      setHasNotification(false);
      setTimeout(() => setShowNotification(false), 5000); // Hide notification after 5 seconds
    }
  };

  return (
    <div className="relative flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eef4] px-10 py-3">
      <div className="flex items-center">
        <button 
          className="flex items-center text-[#0d151c] text-lg font-bold leading-tight tracking-[-0.015em]" 
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-7 w-7 mr-2"/>
          Saanjh Sahayak
        </button>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-2">
          <button
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7eef4] text-[#0d151c] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <div className="text-[#0d151c]" data-icon="ChatCircleDots" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
              </svg>
            </div>
          </button>
          <button
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7eef4] text-[#0d151c] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 relative"
            onClick={handleBellClick}
          >
            <div className="text-[#0d151c]" data-icon="Bell" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </div>
            {hasNotification && (
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="text-[#0d151c] font-medium text-sm leading-normal">
            {isDoctor ? 'Doctor' : 'Care taker'}
          </div>
        </div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/62891830-57f4-4b6d-ab96-97aa59242b87.png")' }}
        ></div>
      </div>

      {showNotification && (
        <div className="absolute top-16 right-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm font-medium text-gray-900">{notificationHeadingMessage}</p>
          <p className="text-sm text-gray-500 mt-1">{notificationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
