import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, FileText, AlertTriangle, LineChart } from 'lucide-react';
import { useState } from 'react';

const ProcessingPopup = (props) => {
    
  if (!props.isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-lg shadow-2xl p-8 w-96 max-w-full"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 mx-auto mb-6"
        >
          <Loader2 className="w-full h-full text-blue-500" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-center mb-4">Processing PDF</h2>
        
        <p className="text-gray-600 text-center mb-6">
          Please wait while we analyze your test report PDF.
        </p>
        
        <div className="flex justify-around mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <FileText className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm">Analyzing</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
            <span className="text-sm">Precautions</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <LineChart className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm">Predictions</span>
          </motion.div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProcessingPopup;