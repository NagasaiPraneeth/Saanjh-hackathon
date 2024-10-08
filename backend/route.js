const router = require('express').Router();
<<<<<<< HEAD
const {getReport, getPatient, setPatient, getPatients, getOldageHomeInfo,getDates,savePrecautions,getPrevReports,getreports,editPatient,removePatient} = require('./controllers/get_set')
=======
const {getReport, getPatient, setPatient, getPatients, getOldageHomeInfo,getDates,savePrecautions,getPrevReports,getreports,editPatient,login} = require('./controllers/get_set')
>>>>>>> 00fb5c41dd40a5ae8a617481b364a0029e635581
const {getParameters,analysis,chatbot} = require('./controllers/LLM')
const {uploadpdf,pdfid,pdfparse,reciver}=require('./controllers/pdfs')
router.get('/getreport/:id', getReport)
router.post('/setPatient',setPatient)
router.get('/getpatient/:id', getPatient)
router.get('/getpatients', getPatients)
router.get('/getoldagehomeinfo', getOldageHomeInfo)
 router.post('/uploadpdf', uploadpdf)
 router.get('/pdfid/:id',pdfid)
 router.post('/pdfparse', pdfparse)
 router.post('/reciver',reciver)
 router.post('/getparameters',getParameters)
 router.post('/analysis',analysis);
 router.get('/getdates/:id',getDates)
 router.post('/saveprecautions',savePrecautions)
 router.post('/getprevreports',getPrevReports)
 router.get('/getreports',getreports)
 router.post('/editPatient',editPatient)
 router.post('/chatbot',chatbot)
<<<<<<< HEAD
 router.post('/removepatient',removePatient)
=======
 router.post('/login',login)
>>>>>>> 00fb5c41dd40a5ae8a617481b364a0029e635581

module.exports = router
