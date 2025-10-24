import React from "react";
import { Camera } from 'lucide-react';
const CameraUpload = ({ handleFileUpload }) => {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
      <Camera className="w-16 h-16 mb-4" />
      <h3 className="text-2xl font-bold mb-2">Mobile Camera</h3>
      <p className="mb-4">Snap a photo of your receipt on the go</p>
      <label
        htmlFor="camera-upload"
        className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors cursor-pointer"
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