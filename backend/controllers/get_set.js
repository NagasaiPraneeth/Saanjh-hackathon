const express = require('express');
const app = express();
const { patient ,report,Log} = require('../Schema');
const {ObjectId} = require('mongodb');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

const getReport = async (req, res) => {
    try {
        
        const id = req.params.id;
        console.log(id)
        const reportInfo = await report.findOne({ _id: id });
    
        res.json(reportInfo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
}
const getPatient = async (req,res) => {
    const id = req.params.id;
    const patientInfo =await patient.findOne({_id:id});
    res.json(patientInfo);
}

const setPatient = async (req,res)=>{
    const info = req.body;

    // Log the received form data
    console.log('Received form data:', info);
    
    let newpatient = new patient({
        name:info.firstName +" "+info.lastName,
        DOB:info.dateOfBirth,
        chronics:info.chronics,
        bloodGroup:info.bloodGroup,
        phone:info.phoneNumber,
        gender:info.gender
    })
    newpatient = await newpatient.save();
    console.log("patient saved");
    res.json({data : "success"});
}

const editPatient = async (req,res)=>{
    const { formDataToSend,patientId} = req.body;
    console.log(patientId,formDataToSend);

    const patientInfo =await patient.findOne({_id:patientId});
    patientInfo.name=formDataToSend.firstName +" "+formDataToSend.lastName;
    patientInfo.DOB=formDataToSend.dateOfBirth;
    patientInfo.chronics=formDataToSend.chronics;
    patientInfo.bloodGroup=formDataToSend.bloodGroup;
    patientInfo.phone=formDataToSend.phoneNumber;
    patientInfo.gender=formDataToSend.gender;
    patientInfo.save();
    console.log("success")
    res.json({data : "success"});

}

function formatDate(inputDate){
    const date=new Date(inputDate);
    const day=String(date.getDate()).padStart(2,'0');
    const month= String(date.getMonth()+1).padStart(2,'0');
    const year=date.getFullYear();
    return `${day}/${month}/${year}`
}


const getDates = async (req,res)=>{
    const id = req.params.id;
    const data = await report.find({patientId:id});
    const dates = data.map(item=>({
        file: item._id,
        specialistReq:item.specialistReq,
        date: item.valuesFromReport.date ? item.valuesFromReport.date : formatDate(item.dateOfReport)

    }))
    
    res.json(dates);

}

const getPrevReports = async (req,res)=>{
    const { patientId,reportId} = req.body;
    console.log(reportId)
    const data = await report.find({patientId:patientId});
    const modified = data.filter(item => item._id.toString() !== reportId.toString());
    
    const dates = modified.map(item=>({
        file: item._id,
        specialistReq:item.specialistReq,
        date: item.valuesFromReport.date ? item.valuesFromReport.date : formatDate(item.dateOfReport)

    }))
    //console.log(dates);
    res.json(dates);

}


const getPatients = async (req,res) => {
    try{
        const patients = await patient.find() // TODO: add session oldagehome queryfetch 
        res.json(patients);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve patients'});
    }
}


const getreports = async (req,res) => {
    try{
        const reports = await report.find();
        res.json(reports);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve reports'});
    }
}

const getOldageHomeInfo = async (req,res) => {
    try{
        const name = req.params.name;
        const oldAgeHomeDetails = await oldAgeHome.findOne(); // TODO: add session oldagehome query
        res.json(oldAgeHomeDetails);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve old age home details'});
    }
}

const savePrecautions = async (req,res)=>{

    const {reportId,precautions,doctorNotes}=req.body;
    const a= await report.findOne({_id:reportId});
    a.precautions=precautions;
    a.doctorNotes=doctorNotes;
    a.isVerified=true;
    a.save();
    res.json(a);
    
}

const removePatient = async (req, res) => {
    try {
        const { patientID } = req.body; // Expecting patientID from the request body

        // Use 'new' to create an ObjectId
        const patientToDelete = await patient.findOne({ _id: new ObjectId(patientID) });
        if (!patientToDelete) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // MongoDB connection for GridFS
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db);

        // Loop through each report and remove associated files and chunks
        for (const reportId of patientToDelete.reportsList) {
            const reportDoc = await report.findOne({ _id: new ObjectId(reportId) });
            
            if (reportDoc) {
                // Delete the associated file from GridFS
                const fileId = reportDoc.file;
                
                if (fileId) {
                    // Delete all chunks related to the file
                    await bucket.delete(new ObjectId(fileId));
                }

                // Delete the report document
                await report.deleteOne({ _id: reportDoc._id });
            }
        }

        // Remove the patient from the database
        await patient.deleteOne({ _id: patientToDelete._id });

        res.status(200).json({ message: 'Patient and associated records deleted successfully' });
    } catch (error) {
        console.error('Error removing patient:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const login = async(req,res)=>{
    try{
        const { email, password } = req.body;
        const login = await Log.findOne({"email":email}); 
        if (!login) {
            res.json({err:"Invalid email"})
        }

        else if(login.password===password){
            res.json({id:login.id});
        }
        else{
            res.json({error:"Invalid password"})
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'server error'});
    }
}


  



module.exports = { getReport, getPatient, setPatient, getPatients, getOldageHomeInfo,getDates,savePrecautions,getPrevReports,getreports,editPatient,login,removePatient}
