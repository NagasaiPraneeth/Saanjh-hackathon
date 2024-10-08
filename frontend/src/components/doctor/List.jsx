import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function List(props) {
  const [editPatients, setEditPatients] = useState(false);
  const [deletePatients, setDeletePatients] = useState(false);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [isDoctor, setIsDoctor] = useState(props.isDoctor);
  const [showPatients, setShowPatients] = useState(true);
  const [showVerifiedReports, setShowVerifiedReports] = useState(true);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };

  async function GetPatientList() {
   
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getpatients`);
    setPatients(response.data);
    props.setNoofPatients(response.data.length);
  }

  async function GetReportList() {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getreports`);
    setReports(response.data);
  }

  useEffect(() => {
    
    GetPatientList();
    GetReportList();
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
  }
  const handlePatient = (id, pid) => {
    return async () => {
      try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getpatient/${pid}`);
            if (props.isDoctor) {
              navigate(`/doctoranalysis`, { state: { id: id, pid: pid, isDoctor: props.isDoctor, patientData: response.data } })
            }
            else {
              navigate(`/caretakeranalysis`, { state: { id: id, pid: pid, isDoctor: props.isDoctor, patientData: response.data } })
            }
      } catch (error) {
        console.error("Error in handlePatient:", error);
      }
    };
  };

  const handleModify = (id) => {
    return async () => {
      

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getpatient/${id}`);

        console.log("editPatients", editPatients);
        console.log("deletePatients", deletePatients);
        if (!editPatients && !deletePatients) {
          try {
              navigate(`/patient`, { state: { id: id } })
          
          }
          catch (error) {
            console.log(error);
          }
        }

        else if(editPatients && !deletePatients){
            navigate(`/edit`, { state: { patientData: response.data} })
        } 
        

      } catch (error) {
        console.error("Error in handlePatient:", error);
      }
    };
  };



  const filteredReports = showVerifiedReports
    ? reports.filter(report => report.isVerified)
    : reports.filter(report => !report.isVerified);

  return reports && patients && (
    <div className="layout-content-container flex flex-col max-w-[920px] flex-1 bg-[#f8fafb]">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPatients(true)}
                className={`text-lg font-semibold px-4 py-2 focus:outline-none transition-all duration-300 ${showPatients
                    ? "text-[#0e141b] border-b-2 border-[#0e141b]"
                    : "text-[#4f7396] hover:text-[#0e141b]"
                  }`}
              >
                Patients
              </button>
              <button
                onClick={() => setShowPatients(false)}
                className={`text-lg font-semibold px-4 py-2 focus:outline-none transition-all duration-300 ${!showPatients
                    ? "text-[#0e141b] border-b-2 border-[#0e141b]"
                    : "text-[#4f7396] hover:text-[#0e141b]"
                  }`}
              >
                Reports
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {!showPatients && (
                <button
                  onClick={() => setShowVerifiedReports(!showVerifiedReports)}
                  className="px-4 py-2 bg-[#e8edf3] text-[#4f7396] rounded-md transition-all duration-300 hover:bg-[#d1d8e0] focus:outline-none focus:ring-2 focus:ring-[#4f7396] focus:ring-opacity-50"
                >
                  {showVerifiedReports ? "Show Unverified" : "Show Verified"}
                </button>
              )}
              <div className={`${isDoctor ? "hidden" : "flex"}`}>
                <Dropdown editPatients={editPatients} setEditPatients={setEditPatients} deletePatients={deletePatients} setDeletePatients={setDeletePatients} />
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              placeholder={showPatients ? "Search patients" : "Search reports"}
              className="w-full px-4 py-2 pl-10 pr-4 text-[#0e141b] bg-[#e8edf3] border border-[#e8edf3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f7396] focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-[#4f7396]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4">
        {showPatients ? (
          patients.map((patient, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-[#f8fafb] px-4 min-h-[72px] py-2 mb-3 transition-all duration-300 ease-in-out hover:bg-[#e8edf3] cursor-pointer rounded-xl"
              onClick={handleModify(patient._id)}
            >
              <div className="bg-[#e8edf3] text-[#4f7396] font-bold rounded-full h-14 w-14 flex items-center justify-center">
                {patient.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">
                  {patient.name}
                </p>
                <p className="text-[#4f7396] text-sm font-normal leading-normal line-clamp-2">
                  Age: {calculateAge(patient.DOB)}, Gender: {patient.gender}
                </p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-[#4f7396] ${editPatients ? 'block' : 'hidden'} `}>
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 text-[#4f7396] ${deletePatients ? 'block' : 'hidden'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          ))
        ) : (
          filteredReports.map((report, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-[#f8fafb] px-4 min-h-[72px] py-2 mb-3 transition-all duration-300 ease-in-out hover:bg-[#e8edf3] cursor-pointer rounded-xl"
              onClick={handlePatient(report._id, report.patientId)}
            >
              <div className="bg-[#e8edf3] text-[#4f7396] font-bold rounded-full h-14 w-14 flex items-center justify-center">
                R 
                             </div>
              <div className="flex flex-col justify-center flex-grow">
                <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">
                  {report.specialistReq}
                </p>
                <p className="text-[#4f7396] text-sm font-normal leading-normal line-clamp-2">
                  Patient: {report.patient}, Date: {formatDate(report.dateOfReport)}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${report.isVerified ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {report.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


