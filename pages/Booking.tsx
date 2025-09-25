
import React, { useState } from 'react';

const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
  });
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate the inputs
    setStep(2);
  };

  const handleSelectBus = (busId: string) => {
    setSelectedBus(busId);
    setStep(3);
  };
  
  const handleConfirm = () => {
    setStep(4);
  };

  const startNewBooking = () => {
    setBookingDetails({ from: '', to: '', date: '', passengers: 1 });
    setSelectedBus(null);
    setStep(1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input type="text" name="from" value={bookingDetails.from} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., Central Station" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input type="text" name="to" value={bookingDetails.to} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., City Mall" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" name="date" value={bookingDetails.date} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                <input type="number" name="passengers" value={bookingDetails.passengers} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" min="1" max="10" required />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Search Buses</button>
          </form>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Available Buses</h3>
            <div className="space-y-4">
              {['R101 - 08:00 AM', 'R101 - 09:00 AM', 'R101 - 10:00 AM'].map(bus => (
                <div key={bus} className="p-4 border rounded-lg flex justify-between items-center bg-gray-50">
                  <div>
                    <p className="font-semibold">{bus.split(' - ')[0]}</p>
                    <p className="text-sm text-gray-600">Departure: {bus.split(' - ')[1]}</p>
                  </div>
                  <button onClick={() => handleSelectBus(bus)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Select</button>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-6 text-blue-600 hover:underline">Modify Search</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Confirm Your Booking</h3>
            <div className="p-6 bg-blue-50 rounded-lg space-y-3">
              <p><strong>From:</strong> {bookingDetails.from}</p>
              <p><strong>To:</strong> {bookingDetails.to}</p>
              <p><strong>Date:</strong> {bookingDetails.date}</p>
              <p><strong>Passengers:</strong> {bookingDetails.passengers}</p>
              <p><strong>Selected Bus:</strong> {selectedBus}</p>
              <p className="text-lg font-bold">Total Fare: ₹{bookingDetails.passengers * 50}.00</p>
            </div>
            <div className="mt-6 flex gap-4">
              <button onClick={() => setStep(2)} className="w-full bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400">Back</button>
              <button onClick={handleConfirm} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700">Confirm & Proceed to Pay</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h3>
            <p className="text-gray-600 mt-2">Your ticket has been booked successfully. A confirmation has been sent to your registered contact.</p>
            <button onClick={startNewBooking} className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Book Another Ticket</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Book Your Ticket</h1>
      <p className="text-gray-500 mb-6">Step {step} of 4</p>
      {renderStep()}
    </div>
  );
};

export default Booking;
