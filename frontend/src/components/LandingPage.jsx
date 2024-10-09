import React from 'react';
import {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/bg.png";
const LandingPage= () => {
  const targetRef = useRef(null);
  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  let navigate=useNavigate();
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#F9FAFA] group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#EEEFF2] px-10 py-3">
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
            <div className="flex items-center gap-9">
              <a className="text-[#1C1D22] text-sm font-medium leading-normal cursor-pointer" onClick={scrollToTarget}>Features</a>
              {/* options similar to feautres */}
              
            </div>
            <div className="flex gap-2">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#607AFB] text-[#F9FAFA] text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={()=>navigate('/signin')}
              >
                <span className="truncate">Login</span>
              </button>
              {/* button for signup */}
            </div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/d0342d60-6ca8-4000-abde-e44f0d824c83.png")'}}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1
                      className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
                    >
                      Saanjh Sahayak, better care for our elders
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      We are here to provide comprehensive and compassionate care to the elderly in old age homes.
                    </h2>
                  </div>
                  <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">

                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container" ref={targetRef}>
              <h1
                className="text-[#1C1D22] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
              >
                For Caretakers
              </h1>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#D5D6DD] bg-[#FFFFFF] p-4 flex-col">
                  <div className="text-[#1C1D22]" data-icon="FirstAid" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M216,88H168V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V88H40a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H88v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V168h48a16,16,0,0,0,16-16V104A16,16,0,0,0,216,88Zm0,64H160a8,8,0,0,0-8,8v56H104V160a8,8,0,0,0-8-8H40V104H96a8,8,0,0,0,8-8V40h48V96a8,8,0,0,0,8,8h56Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#1C1D22] text-base font-bold leading-tight">Upload and Monitor Patient Reports</h2>
                    <p className="text-[#3C3F4A] text-sm font-normal leading-normal">
                      Easily upload and monitor patient reports. Our system is designed to handle a variety of formats, ensuring a seamless experience.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#D5D6DD] bg-[#FFFFFF] p-4 flex-col">
                  <div className="text-[#1C1D22]" data-icon="Notification" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M216,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V56A16,16,0,0,1,48,40h80a8,8,0,0,1,0,16H48V208H200V128a8,8,0,0,1,16,0Zm16-68a36,36,0,1,1-36-36A36,36,0,0,1,232,60Zm-16,0a20,20,0,1,0-20,20A20,20,0,0,0,216,60Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#1C1D22] text-base font-bold leading-tight">Receive Alerts and Reminders</h2>
                    <p className="text-[#3C3F4A] text-sm font-normal leading-normal">
                      Get instant alerts and reminders for medication, doctor's appointments, and more. Stay on top of your loved one's care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <h1
                className="text-[#1C1D22] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
              >
                For Doctors
              </h1>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#D5D6DD] bg-[#FFFFFF] p-4 flex-col">
                  <div className="text-[#1C1D22]" data-icon="FirstAid" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M216,88H168V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V88H40a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H88v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V168h48a16,16,0,0,0,16-16V104A16,16,0,0,0,216,88Zm0,64H160a8,8,0,0,0-8,8v56H104V160a8,8,0,0,0-8-8H40V104H96a8,8,0,0,0,8-8V40h48V96a8,8,0,0,0,8,8h56Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#1C1D22] text-base font-bold leading-tight">Verify Patient Information</h2>
                    <p className="text-[#3C3F4A] text-sm font-normal leading-normal">
                      Quickly and securely verify patient information. Our platform is designed to ensure compliance with privacy and data protection regulations.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#D5D6DD] bg-[#FFFFFF] p-4 flex-col">
                  <div className="text-[#1C1D22]" data-icon="Translate" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M239.15,212.42l-56-112a8,8,0,0,0-14.31,0l-21.71,43.43A88,88,0,0,1,100,126.93,103.65,103.65,0,0,0,127.69,64H152a8,8,0,0,0,0-16H96V32a8,8,0,0,0-16,0V48H24a8,8,0,0,0,0,16h87.63A87.76,87.76,0,0,1,88,116.35a87.74,87.74,0,0,1-19-31,8,8,0,1,0-15.08,5.34A103.63,103.63,0,0,0,76,127a87.55,87.55,0,0,1-52,17,8,8,0,0,0,0,16,103.46,103.46,0,0,0,64-22.08,104.18,104.18,0,0,0,51.44,21.31l-26.6,53.19a8,8,0,0,0,14.31,7.16L140.94,192h70.11l13.79,27.58A8,8,0,0,0,232,224a8,8,0,0,0,7.15-11.58ZM148.94,176,176,121.89,203.05,176Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#1C1D22] text-base font-bold leading-tight">Analyze with Large Language Model</h2>
                    <p className="text-[#3C3F4A] text-sm font-normal leading-normal">
                      Utilize our powerful Large Language Model for in-depth patient analysis. Get insights and recommendations based on the latest medical research.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3 pb-3">
            <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/fb823941-87a6-47fb-998f-c8224ea8c6db.png")' }}
            ></div>

                <div>
                  <p className="text-[#1C1D22] text-base font-medium leading-normal">Get help from experts</p>
                  <p className="text-[#3C3F4A] text-sm font-normal leading-normal">Our team of geriatricians and nurse practitioners are here to help.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/b543c2c9-c73f-4636-8737-59e6d3f7a20e.png")'}}
                ></div>
                <div>
                  <p className="text-[#1C1D22] text-base font-medium leading-normal">Stay connected</p>
                  <p className="text-[#3C3F4A] text-sm font-normal leading-normal">Easily communicate with our team via video calls, phone calls, or chat.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/8329d0d0-4083-4c19-89c0-de0625991c40.png")'}}
                ></div>
                <div>
                  <p className="text-[#1C1D22] text-base font-medium leading-normal">Get reminders</p>
                  <p className="text-[#3C3F4A] text-sm font-normal leading-normal">Set up medication reminders and get alerts when it's time to take a dose.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
