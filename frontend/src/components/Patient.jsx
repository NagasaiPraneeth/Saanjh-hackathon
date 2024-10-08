import { useState } from "react";
import Navbar from "./patient/Navbar";
import Profile from "./patient/Profile";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';

export default function Patient(props) {
    
    const {state} = useLocation();
    const { id }=state;    
    return (
        <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style={{fontFamily: 'Manrope, "Noto Sans", sans-serif'}}>
            <div className="layout-container flex h-full grow flex-col">
                <Navbar patient={true} isDoctor={props.isDoctor}/>
                <Profile isDoctor={props.isDoctor} id={id}/>
            </div>
        </div>
    )
}