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
        className={`border-4 border-dashed rounded-2xl p-16 text-center transition-all duration-300 bg-gradient-to-br from-slate-900 to-slate-800 ${
          isDragging 
            ? 'border-cyan-400 shadow-2xl shadow-cyan-500/50 scale-105' 
            : 'border-slate-600 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/20'
        }`}
      >
        {/* Loading Animation */}
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 border-8 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-lg shadow-cyan-500/50"></div>
            <p className="text-lg text-slate-300 font-medium animate-pulse">
              Processing your receipt...
            </p>
          </div>
        ) : isSuccess ? (
          // Success Tick
          <div className="flex flex-col items-center justify-center space-y-4">
            <CheckCircle className="w-24 h-24 text-green-400 animate-bounce drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
            <p className="text-lg font-semibold text-green-400">Upload Complete!</p>
          </div>
        ) : (
          // Default Upload View
          <>
            <Upload
              className={`w-24 h-24 mx-auto mb-6 transition-all duration-300 ${
                isDragging 
                  ? "scale-125 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" 
                  : "text-slate-500 hover:text-cyan-400"
              }`}
            />
            <h3 className="text-2xl font-bold text-slate-200 mb-4">
              Drop your receipt here
            </h3>
            <p className="text-slate-400 mb-6">or click to browse files</p>

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
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full cursor-pointer hover:from-cyan-600 hover:to-blue-600 transition-all inline-block shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
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