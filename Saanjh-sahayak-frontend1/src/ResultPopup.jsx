import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, Download } from 'lucide-react';
import { useState } from 'react';

const ResultPopup = (props) => {
    const handleclose = () => {
        props.setOpenResult(false);
    }
    

  return (
    <AnimatePresence>
      {props.openResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg shadow-2xl p-8 w-96 max-w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 mx-auto mb-6"
            >
              {!props.isValid ? (
                <CheckCircle className="w-full h-full text-green-500" />
              ) : (
                <XCircle className="w-full h-full text-red-500" />
              )}
            </motion.div>
            
            <h2 className="text-2xl font-bold text-center mb-4">
              {!props.isValid ? "Upload Successful!" : "Invalid PDF"}
            </h2>
            
            <p className="text-gray-600 text-center mb-6">
              {!props.isValid 
                ? "Your report has been successfully uploaded and processed."
                : "The file you uploaded is not a valid PDF. Please try again with a valid PDF file."}
            </p>
            
            <div className="flex justify-center space-x-4">
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-full shadow-lg hover:bg-gray-400 transition-colors duration-300"
                onClick={handleclose}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultPopup;