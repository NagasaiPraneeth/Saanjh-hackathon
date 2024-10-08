import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
export default function List(props) {
  const [editPatients, setEditPatients] = useState(false);
  const [deletePatients, setDeletePatients] = useState(false);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [isDoctor, setIsDoctor] = useState(props.isDoctor);
  const [showPatients, setShowPatients] = useState(true);
  const [showVerifiedReports, setShowVerifiedReports] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to calculate patient's age
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

  // Fetch patients from backend
  async function GetPatientList() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getpatients`);
      setPatients(response.data);
      props.setNoofPatients(response.data.length);
      props.setAverageAge(Math.round(response.data.reduce((acc, patient) => acc + calculateAge(patient.DOB), 0) / response.data.length));
      console.log("Average age:"+response.data.reduce((acc, patient) => acc + calculateAge(patient.DOB), 0) / response.data.length)
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }

  // Fetch reports from backend
  async function GetReportList() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getreports`);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  }

  useEffect(() => {
    GetPatientList();
    GetReportList();
  }, []);

  // Format date for displaying
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle patient click (doctor or caretaker analysis)
  const handlePatient = (id, pid) => {
    return async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getpatient/${pid}`);
        navigate(props.isDoctor ? `/doctoranalysis` : `/caretakeranalysis`, { state: { id, pid, isDoctor: props.isDoctor, patientData: response.data } });
      } catch (error) {
        console.error("Error in handlePatient:", error);
      }
    };
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // Handle patient modification (edit or delete)
  const handleModify = (id) => {
    return async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getpatient/${id}`);
        
        if (editPatients && !deletePatients) {
          // If editing the patient
          navigate(`/edit`, { state: { patientData: response.data } });
          
        } else if (!editPatients && !deletePatients) {
          // If just viewing the patient
          navigate(`/patient`, { state: { id } });
  
        } else {
          // If deleting the patient
          console.log("Deleting patient...");
  
          const patientID = id;
          try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/en/removepatient`, { patientID });
 
            Swal.fire({
              icon: 'success',
              title: 'Patient Deleted',
              text: 'Patient and related data have been successfully deleted!',
            });
            await sleep(2000);
            navigate(0);

            console.log(response.data);
          } catch (error) {
            console.error('Error removing patient:', error.response ? error.response.data : error.message);
  
            // Show error alert
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Failed to remove patient: ${error.response ? error.response.data : error.message}`,
            });
          }
        }
      } catch (error) {
        console.error("Error in handleModify:", error);
        
        // Show error alert for fetching patient details
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to fetch patient data: ${error.message}`,
        });
      }
    };
  };

  // Filter reports based on verification status
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredReports = showVerifiedReports
    ? reports.filter((report) => report.isVerified && report.patient.toLowerCase().includes(searchQuery.toLowerCase()))
    : reports.filter((report) => !report.isVerified && report.patient.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div className="layout-content-container flex flex-col max-w-[920px] flex-1 bg-[#f8fafb]">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPatients(true)}
                className={`text-lg font-semibold px-4 py-2 focus:outline-none transition-all duration-300 ${showPatients
                  ? "text-[#0e141b] border-b-2 border-[#0e141b]"
                  : "text-[#4f7396] hover:text-[#0e141b]"}`
                }
              >
                Patients
              </button>
              <button
                onClick={() => setShowPatients(false)}
                className={`text-lg font-semibold px-4 py-2 focus:outline-none transition-all duration-300 ${!showPatients
                  ? "text-[#0e141b] border-b-2 border-[#0e141b]"
                  : "text-[#4f7396] hover:text-[#0e141b]"}`
                }
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
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
          filteredPatients.map((patient, index) => (
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-[#4f7396] ${editPatients ? 'block' : 'hidden'}`}>
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712zM16.708 7.292l-10 10a4.125 4.125 0 0 0-1.088 1.864l-.579 2.314a.75.75 0 0 0 .91.91l2.314-.579a4.125 4.125 0 0 0 1.864-1.088l10-10-3.712-3.712z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-[#f54748] ${deletePatients ? 'block' : 'hidden'}`}>
                <path fillRule="evenodd" d="M5.5 5.25a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 0 1.5H18v13a2.75 2.75 0 0 1-2.75 2.75H8.75A2.75 2.75 0 0 1 6 18.75V5.25h-.25a.75.75 0 0 1-.75-.75zm3 3.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 4.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 4.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75z" clipRule="evenodd"/>
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
