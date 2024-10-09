import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const webcamRef = useRef(null);

  // Handle image file upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Display image preview
        onImageUpload(reader.result.split(',')[1]); // Send base64 image to parent
      };
      reader.readAsDataURL(file);
    }
  };

  // Capture image from the webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc); // Set the webcam image as preview
    onImageUpload(imageSrc.split(',')[1]); // Send base64 image to parent
    setUseCamera(false); // Close the webcam after capturing
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto transition-transform duration-200 transform hover:scale-105">
      {/* Toggle between file upload and camera */}
      <div className="flex space-x-4 mb-4">
        {/* <button
          className={`px-4 py-2 rounded-lg shadow-lg transition duration-200 ease-in-out ${
            useCamera ? 'bg-gray-200' : 'bg-blue-500 text-white'
          }`}
          onClick={() => setUseCamera(false)}
        >
          Upload Image
        </button> */}
        <button
          className={`px-4 py-2 rounded-lg shadow-lg transition duration-200 ease-in-out ${
            useCamera ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setUseCamera(true)}
        >
          Use Camera
        </button>
      </div>

      {/* File Upload Option */}
      {!useCamera && (
        <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-500 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:shadow-xl transition duration-200 ease-in-out">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="mt-2 text-base leading-normal">Select an image</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      )}

      {/* Webcam Option */}
      {useCamera && (
        <div className="w-full flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-64 rounded-lg shadow-md mb-4 border border-gray-300"
          />
          <button
            onClick={captureImage}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-200 ease-in-out"
          >
            Capture Photo
          </button>
        </div>
      )}

      {/* Display Image Preview */}
      {preview && (
        <div className="mt-4 relative">
          <div className="relative overflow-hidden w-64 h-64 border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
            <img
              src={preview}
              alt="Uploaded"
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-lg">Preview</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
