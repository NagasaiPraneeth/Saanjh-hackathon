import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Analytics from './components/doctor/Analytics';
import LandingPage from './components/LandingPage';
import Form from './components/Form';
import Patient from './components/Patient';
import Signin from './components/Signin';
import NewSignin from './components/NewSignin';
import Upload from './components/Upload';
import PdfShow from './components/PdfShow';
import Doctoranalysis from './components/doctor/Doctoranalysis';
// import Dummy from './components/patient/dummy';
import Load from './components/Load';
import CaretakerAnalysis from './components/CaretakerAnalysis';
import EditForm from './components/EditForm';
import ResultPopup from './ResultPopup';
import MedicalChatbot from './components/MedicalChatbot';

function App() {
  const [isDoctor, setIsDoctor] = useState(() => {
    const saved = localStorage.getItem('isDoctor');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('isDoctor', JSON.stringify(isDoctor));
  }, [isDoctor]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/main"
            element={<Main isDoctor={isDoctor} setIsDoctor={setIsDoctor} />}
          />
          <Route path="/form" element={<Form />} />
          <Route path="/patient" element={<Patient isDoctor={isDoctor} />} />
          <Route
            path="/signin"
            element={<Signin setIsDoctor={setIsDoctor} isDoctor={isDoctor} />}
          />
          <Route path="/newSignin" element={<NewSignin />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/load" element={<Load />} />
          <Route path="/pdfShow" element={<PdfShow />} />
          <Route path="/doctoranalysis" element={<Doctoranalysis />} />
          <Route path="/caretakeranalysis" element={<CaretakerAnalysis />} />
          <Route path="/edit" element={<EditForm />} />
          <Route path="/result" element={<ResultPopup />} />
          <Route path="/chatbot" element={<MedicalChatbot />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;