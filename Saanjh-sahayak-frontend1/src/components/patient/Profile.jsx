import { FaEdit } from 'react-icons/fa';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProcessingPopup from '../ProcessingPopup';
import ResultPopup from '../../ResultPopup';
import { UserIcon } from 'lucide-react'
function Profile(props) {
  const [patientId, setPatientId] = useState(props.id);
  const [patientData, setPatientData] = useState();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [size, setSize] = useState(0);
  const [pdfURL, setPdfURL] = useState(null)
  const [buffer, setBuffer] = useState(null);
  const [rawfile, setRawFile] = useState(null);
  const [reportsDate, setReportsDate] = useState(null)
  const [isOpen, setIsOPen] = useState(false)
  const [openResult, setOpenResult] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const navigate = useNavigate();

  async function GetPatient() {
    console.log("patient id is : "+patientId)
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getpatient/${patientId}`);
    console.log(response.data);
    setPatientData(response.data);
  }

  async function getDates() {
    console.log("hi")
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/getdates/${patientId}`);
    setReportsDate(response.data)
  }

  useEffect(() => {
    GetPatient();
    getDates();
  }, [patientId]);

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


  const handleEditClick = () => {
    navigate('/edit', { state: { patientData: patientData } });
  };

  const handleFile = async (event) => {
    setIsOPen(true);
    const selectedFile = event.target.files[0];


    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileData = reader.result.split(',')[1]; // Get base64-encoded file data
        const filename = event.target.value.replace("C:\\fakepath\\", "");

        try {
          console.log("hi");
          const reponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/en/uploadpdf`, { file: fileData, filename: filename, patientId: patientId, name: patientData.name });
          if (reponse.data.data === false) {

            setIsOPen(false);
            setIsValid(true);
            setOpenResult(true);
          }
          else {

            setIsOPen(false);
            setIsValid(false);
            setOpenResult(true);
          }

        } catch (error) {
          console.log("Error uploading details:", error);
          setIsOPen(false);
          alert('File size too large or other issues.');
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.log("No input file");
    }
  };




  const handlePDFView = async (event) => {
    console.log("lol")

    try {
      console.log("hi")
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/en/pdfid/6687c7725a4889e9aac64ec2`, { responseType: 'arraybuffer' });

      const binaryData = new Uint8Array(response.data);

      const blob = new Blob([binaryData], { type: 'application/pdf' });
      let url = window.URL.createObjectURL(blob);
      navigate(`/pdfShow`, { state: { url: url } })


      //setPdfURL(url)

    } catch (error) {
      console.log("Error uploading details:", error);
      alert('File size too large');
    }
  }

  const handlePatient = async (id) => {
    try {
      if (props.isDoctor) {
        navigate(`/doctoranalysis`, { state: { id: id, pid: patientId, isDoctor: props.isDoctor, patientData: patientData } })
      }
      else {
        navigate(`/caretakeranalysis`, { state: { id: id, pid: patientId, isDoctor: props.isDoctor, patientData: patientData } })
      }

    }
    catch (error) {

    }
  }

  return (
    patientData && reportsDate && (


      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="relative flex p-4 @container">
            <div className={`absolute top-2 right-2 ${props.isDoctor ? 'hidden' : ''}`}>
              <button className="text-blue-500 hover:text-blue-700"
                onClick={handleEditClick}
              >
                <FaEdit size={20} />
              </button>
            </div>
            <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
              <div className="flex gap-4 self-start">
                <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center">
                  <UserIcon className="text-gray-500 w-20 h-20" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#0d151c] text-[22px] font-bold leading-tight tracking-[-0.015em]">{patientData.name}</p>
                  <p className="text-[#49779c] text-base font-normal leading-normal">Age {calculateAge(patientData.DOB)}, {patientData.gender}, Blood type: {patientData.bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 bg-slate-50 px-4 py-3">
            <div className="text-[#0d151c] flex items-center justify-center rounded-lg bg-[#e7eef4] shrink-0 size-12" data-icon="User" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
                ></path>
              </svg>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-[#0d151c] text-base font-medium leading-normal">Patient Information</p>
              <p className="text-[#49779c] text-sm font-normal leading-normal">Previous test reports: {patientData.reportsList.length}</p>

              <div className='flex flex-col'>
                <p className="text-[#49779c] text-sm font-medium leading-normal mb-2">Known health conditions:</p>
                <div className="flex flex-wrap gap-2">
                  {patientData.chronics.map((condition, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
            <div className="flex items-center gap-4">
              <div className="text-[#0d151c] flex items-center justify-center rounded-lg bg-[#e7eef4] shrink-0 size-10" data-icon="Phone" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"
                  ></path>
                </svg>
              </div>
              <p className="text-[#0d151c] text-base font-normal leading-normal flex-1 truncate">Contact Number</p>
            </div>
            <div className="shrink-0"><p className="text-[#0d151c] text-base font-normal leading-normal">(+91) {patientData.phone}</p></div>
          </div>
          <div className="flex justify-between items-center px-4 pb-3 pt-5">
            <h2 className="text-[#0d151c] text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Report History
            </h2>
            <label
              htmlFor="file-upload"
              className={`bg-blue-500 text-white px-4 py-2 rounded cursor-pointer ${props.isDoctor ? "hidden" : ""}`}
            >
              Upload Reports
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFile}
            />
          </div>
          <div>
            {reportsDate.map((report, index) => (
              <div onClick={() => { handlePatient(report.file) }} key={index} className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-slate-100 hover:scale-105 transition transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="text-[#0d151c] flex items-center justify-center rounded-lg bg-[#e7eef4] shrink-0 size-12" data-icon="File" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#0d151c] text-base font-medium leading-normal line-clamp-1">{report.date}</p>
                    <p className="text-[#49779c] text-sm font-normal leading-normal line-clamp-2">{report.specialistReq}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="text-[#0d151c] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        {isOpen && <ProcessingPopup isOpen={isOpen} />}
        {openResult && <ResultPopup openResult={openResult} setOpenResult={setOpenResult} isValid={isValid} />}
      </div>
    )
  );
}

export default Profile;
