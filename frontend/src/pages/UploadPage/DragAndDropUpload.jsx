import React from "react";
import { Upload, CheckCircle } from 'lucide-react';
const DragAndDropUpload = ({ 
  handleFileUpload, 
  isUploading, 
  isSuccess, 
  setIsDragging, 
  isDragging,
  handleDrop
 }) => {
  return (
    <>
      {/* Drag & Drop Upload */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-4 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
          isDragging ? 'border-blue-600 bg-blue-50 scale-105' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        {/* Loading Animation */}
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 border-8 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-gray-600 font-medium animate-pulse">
              Processing your receipt...
            </p>
          </div>
        ) : isSuccess ? (
          // Success Tick
          <div className="flex flex-col items-center justify-center space-y-4">
            <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
            <p className="text-lg font-semibold text-green-600">Upload Complete!</p>
          </div>
        ) : (
            // Default Upload View
          <>
            <Upload
              className={`w-24 h-24 mx-auto mb-6 transition-transform duration-300 ${
                isDragging ? "scale-125 text-purple-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Drop your receipt here
            </h3>
            <p className="text-gray-500 mb-6">or click to browse files</p>

            <input
              type="file"
              onChange={(e) =>
                e.target.files[0] && handleFileUpload(e.target.files[0])
              }
              className="hidden"
              id="file-upload"
              accept="image/*,.pdf"
            />

            <label
              htmlFor="file-upload"
              className="bg-blue-500 text-white px-8 py-3 rounded-full cursor-pointer hover:bg-blue-700 transition-colors inline-block"
            >
              Choose File
            </label>
          </>
        )}
      </div>
    </>
  )
}

export default DragAndDropUpload;