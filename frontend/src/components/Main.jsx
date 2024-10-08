import List from './doctor/List';
import Analytics from './doctor/Analytics';
import Navbar from './patient/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MedicalChatbot from './MedicalChatbot';

export default function Main(props) {
  const [noofPatients, setNoofPatients] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [isDoctor, setIsDoctor] = useState();
  const navigate = useNavigate();    
  useEffect(()=>{
    setIsDoctor(props.isDoctor);
    console.log("is doctor",isDoctor)
  },[]); 
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fafb] group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
          <Navbar isDoctor={isDoctor} />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
            
          <List isDoctor={isDoctor} setNoofPatients={setNoofPatients} noofPatients={noofPatients} setAverageAge={setAverageAge} />
          <Analytics noofPatients={noofPatients} patientPercentage={"+5%"} averageAge={averageAge} agePercentage={"-2%"}/>

        </div>
      </div>  
      <MedicalChatbot />
    </div>
  );
}