import React from "react";
import { Camera } from 'lucide-react';

const CameraUpload = ({ handleFileUpload }) => {
  return (
    <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white border border-slate-700 shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/50">
          <Camera className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Mobile Camera
          </h3>
          <p className="text-slate-400 mt-1">Snap a photo of your receipt on the go</p>
        </div>
      </div>
      
      <label
        htmlFor="camera-upload"
        className="mt-4 block w-full text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105"
      >
        Open Camera
      </label>
      <input
        id="camera-upload"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
    </div>
  )
}

export default CameraUpload;