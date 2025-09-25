
import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type LoginStep = 'selection' | 'upload' | 'capture' | 'otp' | 'success';

const Login: React.FC = () => {
  const [step, setStep] = useState<LoginStep>('selection');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setStep('otp');
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = useCallback(async () => {
    setStep('capture');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Could not access camera. Please check permissions.");
        setStep('selection');
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setImageSrc(dataUrl);
        stopCamera();
        setStep('otp');
      }
    }
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP verification. Any OTP works.
    if (otp.length > 3) { 
        setStep('success');
        setTimeout(() => {
            login();
            navigate('/');
        }, 2000);
    } else {
        setError("Please enter a valid OTP.");
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'selection':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Choose Verification Method</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex-1 cursor-pointer p-6 border-2 border-dashed rounded-lg text-center hover:bg-gray-50 hover:border-blue-500 transition-colors">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <UploadIcon />
                <span className="mt-2 block font-semibold">Upload Aadhaar Image</span>
              </label>
              <button onClick={startCamera} className="flex-1 p-6 border-2 border-dashed rounded-lg text-center hover:bg-gray-50 hover:border-blue-500 transition-colors">
                <CameraIcon />
                <span className="mt-2 block font-semibold">Capture Live Photo</span>
              </button>
            </div>
          </div>
        );
      case 'capture':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Live Capture</h2>
            <video ref={videoRef} autoPlay className="w-full rounded-lg mb-4 bg-gray-200 aspect-video"></video>
            <div className="flex gap-4">
                <button onClick={() => { stopCamera(); setStep('selection'); }} className="w-full bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400">Cancel</button>
                <button onClick={capturePhoto} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700">Capture Photo</button>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
        );
      case 'otp':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
            <p className="text-gray-500 mb-6">An OTP has been sent to your registered mobile number.</p>
            {imageSrc && <img src={imageSrc} alt="Aadhaar Preview" className="mx-auto w-48 h-auto object-contain rounded-lg mb-4" />}
            <form onSubmit={handleOtpSubmit}>
              <input 
                type="text" 
                placeholder="Enter 6-digit OTP" 
                value={otp}
                onChange={(e) => { setOtp(e.target.value); setError(null); }}
                className="w-full p-3 text-center tracking-[0.5em] border border-gray-300 rounded-lg mb-4" 
                maxLength={6}
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700">Verify & Login</button>
            </form>
          </div>
        );
      case 'success':
        return (
            <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800">Login Successful!</h2>
                <p className="text-gray-600 mt-2">Redirecting you to the home page...</p>
            </div>
        );
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Aadhaar Login</h1>
      {renderContent()}
    </div>
  );
};

// Icons
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export default Login;
