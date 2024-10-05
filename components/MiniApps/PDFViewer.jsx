import React from 'react';

const PDFViewer = ({ pdfUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col relative p-4">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full text-xl font-bold hover:bg-red-600 transition-colors"
        >
          CLOSE
        </button>
        <div className="mt-12 flex-grow overflow-hidden bg-gray-100">
          <iframe 
            src={pdfUrl} 
            className="w-full h-full border-2 border-black rounded"
            title="Resume PDF"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;