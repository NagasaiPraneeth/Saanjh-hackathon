import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signin = ({ setIsDoctor }) => {
  const [userRole, setUserRole] = useState("Select your role");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    if (name === "email") {
        const lowercaseEmail = value.toLowerCase(); 
        setEmail(lowercaseEmail); 
    } else if (name === "password") {
        setPassword(value); 
    }
  };

  const handleSignIn = async() => {
    if (email && password){
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/en/login`, {
          email:email,
          password: password 
      }
    );
  if(response.data.err){
    alert("Invaild Email");
    return;
  }
  else if(response.data.error){
    alert("Invaild password");
    return;
  }


  else{

    console.log(response.data);
    setUserRole(response.data.id);
    setIsDoctor(response.data.id === 'doctor');
  }


    if (userRole) {
      navigate("/main");
    } else {
      alert("Please select a role before signing in.");
    }

  }
  else{
    alert("Please Enter Email and password");
    return;
  }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex w-full max-w-4xl h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden">
       
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to Saanjh Sahayak</h2>
          <p className="text-center text-gray-600 mb-8">Please select if you are a doctor or a caretaker.</p>
          
          <div className="space-y-6">
          <input
                    type="username"
                    className="login__input custom-input"
                    placeholder="Email"
                    style={{
                      
                      border: "2px solid #D1D1D4",
                      background: "none",
                      borderRadius: "40px",
                      padding: "10px",
                      paddingLeft: "24px",
                      fontWeight: "700",
                      width: "100%",
                      alignItems: "center",
                      transition: ".2s"
                  }}
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
             <input
                    type="password"
                    className="login__input custom-input"
                    placeholder="Password"
                    style={{
                 
                        border: "2px solid #D1D1D4",
                        background: "none",
                        borderRadius: "40px",
                        padding: "10px",
                        paddingLeft: "24px",
                        fontWeight: "700",
                        width: "100%",
                        alignItems: "center",
                        transition: ".2s"
                    }}
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                    />
            <button
              className={`w-full py-3 rounded-lg transition-all ${
                   'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              onClick={handleSignIn}
              
            >
              Sign in
            </button>
          </div>
        </div>

        {/* Right side - Animated Design */}
        <div className="w-1/2 bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="text-4xl font-bold text-white mb-4 z-10">Saanjh Sahayak</div>
          <p className="text-xl text-blue-100 text-center mb-8 z-10">Your Healthcare Companion</p>
          
          {/* Animated circles */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-48 h-48 bg-white opacity-10 rounded-full -top-12 -left-12 animate-pulse"></div>
            <div className="absolute w-72 h-72 bg-white opacity-10 rounded-full -bottom-16 -right-16 animate-pulse delay-1000"></div>
          </div>
          
          {/* Animated healthcare icon */}
          <svg className="w-32 h-32 text-white animate-float z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Signin;
