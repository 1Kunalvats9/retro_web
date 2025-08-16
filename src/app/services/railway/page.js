"use client";

import { useState } from "react";
import Link from "next/link";

export default function RailwayPage() {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelClass, setTravelClass] = useState("sleeper");
  const [passengers, setPassengers] = useState(1);
  const [showTrains, setShowTrains] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trainData, setTrainData] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "male" }
  ]);

  const stations = [
    "New Delhi", "Mumbai Central", "Chennai Central", "Howrah", "Bangalore City", 
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Kanpur", 
    "Nagpur", "Bhopal", "Patna", "Amritsar", "Guwahati", "Trivandrum"
  ];

  const trainClasses = [
    { id: "1A", name: "First AC", fare: 1.8 },
    { id: "2A", name: "Second AC", fare: 1.5 },
    { id: "3A", name: "Third AC", fare: 1.2 },
    { id: "sleeper", name: "Sleeper Class", fare: 1.0 },
    { id: "cc", name: "Chair Car", fare: 1.1 },
    { id: "general", name: "General", fare: 0.8 }
  ];

  const generateRandomTrains = () => {
    const trains = [];
    const count = Math.floor(Math.random() * 5) + 3; // 3 to 7 trains
    
    for (let i = 0; i < count; i++) {
      const departureHour = Math.floor(Math.random() * 24);
      const departureMinute = Math.floor(Math.random() * 60);
      const durationHours = Math.floor(Math.random() * 20) + 4; // 4 to 24 hours
      const durationMinutes = Math.floor(Math.random() * 60);
      
      const arrivalHour = (departureHour + durationHours) % 24;
      const arrivalMinute = (departureMinute + durationMinutes) % 60;
      
      const baseFare = (Math.floor(Math.random() * 1000) + 300);
      const availableSeats = Math.floor(Math.random() * 100) + 1;
      
      const trainNumber = `${Math.floor(Math.random() * 90000) + 10000}`;
      const trainNames = [
        "Rajdhani Express", "Shatabdi Express", "Duronto Express", 
        "Jan Shatabdi", "Garib Rath", "Sampark Kranti", "Superfast Express"
      ];
      const trainName = trainNames[Math.floor(Math.random() * trainNames.length)];
      
      trains.push({
        id: `TR-${i + 1}`,
        number: trainNumber,
        name: trainName,
        departureTime: `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`,
        arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`,
        duration: `${durationHours}h ${durationMinutes}m`,
        baseFare: baseFare,
        availableSeats: {
          "1A": Math.floor(Math.random() * 20),
          "2A": Math.floor(Math.random() * 40),
          "3A": Math.floor(Math.random() * 60),
          "sleeper": Math.floor(Math.random() * 100),
          "cc": Math.floor(Math.random() * 80),
          "general": Math.floor(Math.random() * 200)
        },
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].filter(() => Math.random() > 0.3)
      });
    }
    
    return trains;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setTrainData(generateRandomTrains());
      setShowTrains(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    setShowBookingForm(true);
  };

  const handleAddPassenger = () => {
    setPassengerDetails([...passengerDetails, { name: "", age: "", gender: "male" }]);
  };

  const handleRemovePassenger = (index) => {
    const newPassengers = [...passengerDetails];
    newPassengers.splice(index, 1);
    setPassengerDetails(newPassengers);
  };

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...passengerDetails];
    newPassengers[index][field] = value;
    setPassengerDetails(newPassengers);
  };

  const handleBookTicket = (e) => {
    e.preventDefault();
    const selectedClass = trainClasses.find(c => c.id === travelClass);
    const totalFare = Math.round(selectedTrain.baseFare * selectedClass.fare * passengers);
    
    alert(`Booking confirmed! PNR: ${Math.floor(Math.random() * 9000000000) + 1000000000}
Train: ${selectedTrain.number} - ${selectedTrain.name}
From: ${fromStation} To: ${toStation}
Date: ${travelDate}
Class: ${selectedClass.name}
Passengers: ${passengers}
Total Fare: ₹${totalFare}
`);
    
    // Reset form
    setShowBookingForm(false);
    setSelectedTrain(null);
    setPassengerDetails([{ name: "", age: "", gender: "male" }]);
  };

  const resetSearch = () => {
    setShowTrains(false);
    setTrainData([]);
    setSelectedTrain(null);
    setShowBookingForm(false);
  };

  const getFareForClass = (train, classId) => {
    const classInfo = trainClasses.find(c => c.id === classId);
    return Math.round(train.baseFare * classInfo.fare);
  };

  return (
    <div className="min-h-screen bg-[#8b4513] font-['Comic_Sans_MS',_cursive] p-4">
      {/* Header */}
      <header className="bg-[#cd853f] border-4 border-[#a0522d] p-4 mb-6 text-center">
        <h1 className="text-4xl font-bold text-[#800000] animate-pulse mb-2">
          RAILWAY TICKET BOOKING
        </h1>
        <div className="bg-[#a0522d] text-[#ffffff] border-2 border-[#800000] p-2">
          <marquee scrollamount="5">
            BOOK YOUR RAILWAY TICKETS ONLINE! TATKAL BOOKING OPENS AT 10:00 AM FOR AC CLASSES AND 11:00 AM FOR NON-AC CLASSES! SPECIAL TRAINS ANNOUNCED FOR FESTIVAL SEASON!
          </marquee>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with navigation */}
        <div className="w-full md:w-1/4 bg-[#deb887] border-4 border-[#a0522d] p-4">
          <h2 className="text-2xl font-bold text-[#800000] mb-4 text-center">NAVIGATION</h2>
          <Link href="/">
            <div className="bg-[#a0522d] hover:bg-[#cd853f] text-white font-bold py-2 px-4 border-4 border-[#000000] mb-4 text-center">
              BACK TO HOME
            </div>
          </Link>
          
          <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-3 text-[#800000] mt-6">
            <p className="font-bold animate-bounce text-center">RAILWAY ALERT!</p>
            <p className="text-sm">Due to track maintenance, some trains may be delayed by 30-60 minutes.</p>
          </div>
          
          <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-3 text-[#800000] mt-4">
            <p className="font-bold text-center">IMPORTANT INFORMATION</p>
            <ul className="text-sm list-disc pl-4 mt-2">
              <li>Carry ID proof during journey</li>
              <li>Arrive 30 minutes before departure</li>
              <li>Children below 5 years travel free</li>
              <li>Senior citizens get 40-60% concession</li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 bg-[#f5deb3] border-4 border-[#a0522d] p-4">
          {!showTrains ? (
            <>
              <h2 className="text-3xl font-bold text-[#800000] text-center mb-6 underline decoration-wavy">
                SEARCH TRAINS
              </h2>
              
              <form onSubmit={handleSearch} className="bg-[#deb887] border-4 border-dashed border-[#a0522d] p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#800000] font-bold mb-2 text-xl">
                      FROM STATION:
                    </label>
                    <select
                      value={fromStation}
                      onChange={(e) => setFromStation(e.target.value)}
                      className="w-full bg-[#ffffff] border-4 border-[#a0522d] p-2 text-lg"
                      required
                    >
                      <option value="">Select Departure Station</option>
                      {stations.map((station) => (
                        <option key={`from-${station}`} value={station}>{station}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#800000] font-bold mb-2 text-xl">
                      TO STATION:
                    </label>
                    <select
                      value={toStation}
                      onChange={(e) => setToStation(e.target.value)}
                      className="w-full bg-[#ffffff] border-4 border-[#a0522d] p-2 text-lg"
                      required
                    >
                      <option value="">Select Destination Station</option>
                      {stations.map((station) => (
                        <option key={`to-${station}`} value={station}>{station}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#800000] font-bold mb-2 text-xl">
                      JOURNEY DATE:
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-[#ffffff] border-4 border-[#a0522d] p-2 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#800000] font-bold mb-2 text-xl">
                      TRAVEL CLASS:
                    </label>
                    <select
                      value={travelClass}
                      onChange={(e) => setTravelClass(e.target.value)}
                      className="w-full bg-[#ffffff] border-4 border-[#a0522d] p-2 text-lg"
                      required
                    >
                      {trainClasses.map((cls) => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#800000] font-bold mb-2 text-xl">
                      PASSENGERS:
                    </label>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value))}
                      className="w-full bg-[#ffffff] border-4 border-[#a0522d] p-2 text-lg"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#a0522d] hover:bg-[#cd853f] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl w-full"
                >
                  {isLoading ? "SEARCHING..." : "SEARCH TRAINS"}
                </button>
              </form>
              
              <div className="bg-[#deb887] border-4 border-[#a0522d] p-4">
                <h3 className="text-xl font-bold text-[#800000] mb-2 text-center">POPULAR TRAIN ROUTES</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
                  <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-2">
                    <div className="text-2xl mb-1">🚂</div>
                    <div className="font-bold">RAJDHANI EXPRESS</div>
                    <div className="text-sm">Delhi - Mumbai</div>
                  </div>
                  <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-2">
                    <div className="text-2xl mb-1">🚂</div>
                    <div className="font-bold">SHATABDI EXPRESS</div>
                    <div className="text-sm">Delhi - Bhopal</div>
                  </div>
                  <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-2">
                    <div className="text-2xl mb-1">🚂</div>
                    <div className="font-bold">DURONTO EXPRESS</div>
                    <div className="text-sm">Howrah - Mumbai</div>
                  </div>
                  <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-2">
                    <div className="text-2xl mb-1">🚂</div>
                    <div className="font-bold">TAMIL NADU EXPRESS</div>
                    <div className="text-sm">Delhi - Chennai</div>
                  </div>
                  <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-2">
                    <div className="text-2xl mb-1">🚂</div>
                    <div className="font-bold">GATIMAAN EXPRESS</div>
                    <div className="text-sm">Delhi - Agra</div>
                  </div>
                  <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-2">
                    <div className="text-2xl mb-1">🚂</div>
                    <div className="font-bold">DECCAN QUEEN</div>
                    <div className="text-sm">Mumbai - Pune</div>
                  </div>
                </div>
              </div>
            </>
          ) : !showBookingForm ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={resetSearch}
                  className="bg-[#a0522d] hover:bg-[#cd853f] text-white font-bold py-2 px-4 border-4 border-[#000000]"
                >
                  ← NEW SEARCH
                </button>
                <h2 className="text-2xl font-bold text-[#800000]">
                  {fromStation} to {toStation}
                </h2>
              </div>
              
              <div className="bg-[#deb887] border-4 border-[#a0522d] p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="font-bold text-[#800000]">Date:</span> {travelDate}
                  </div>
                  <div>
                    <span className="font-bold text-[#800000]">Class:</span> {trainClasses.find(c => c.id === travelClass).name}
                  </div>
                </div>
                
                {trainData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#cd853f] text-white">
                          <th className="border-2 border-[#800000] p-2 text-left">TRAIN</th>
                          <th className="border-2 border-[#800000] p-2 text-center">DEPARTURE</th>
                          <th className="border-2 border-[#800000] p-2 text-center">ARRIVAL</th>
                          <th className="border-2 border-[#800000] p-2 text-center">DURATION</th>
                          <th className="border-2 border-[#800000] p-2 text-center">FARE</th>
                          <th className="border-2 border-[#800000] p-2 text-center">AVAILABILITY</th>
                          <th className="border-2 border-[#800000] p-2 text-center">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trainData.map((train) => (
                          <tr key={train.id} className="hover:bg-[#f5deb3]">
                            <td className="border-2 border-[#800000] p-2">
                              <div className="font-bold">{train.number}</div>
                              <div>{train.name}</div>
                              <div className="text-xs">Runs on: {train.days.join(", ")}</div>
                            </td>
                            <td className="border-2 border-[#800000] p-2 text-center">{train.departureTime}</td>
                            <td className="border-2 border-[#800000] p-2 text-center">{train.arrivalTime}</td>
                            <td className="border-2 border-[#800000] p-2 text-center">{train.duration}</td>
                            <td className="border-2 border-[#800000] p-2 text-center">₹{getFareForClass(train, travelClass)}</td>
                            <td className="border-2 border-[#800000] p-2 text-center">
                              {train.availableSeats[travelClass] > 0 ? 
                                `${train.availableSeats[travelClass]} seats` : 
                                <span className="text-red-600 font-bold">WAITLIST</span>
                              }
                            </td>
                            <td className="border-2 border-[#800000] p-2 text-center">
                              <button 
                                onClick={() => handleSelectTrain(train)}
                                className="bg-[#a0522d] hover:bg-[#cd853f] text-white font-bold py-1 px-3 border-2 border-[#000000]"
                                disabled={train.availableSeats[travelClass] === 0}
                              >
                                BOOK
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-[#f5deb3] border-2 border-[#a0522d]">
                    <p className="text-[#800000] font-bold">No trains found for this route and date.</p>
                    <p>Please try different search criteria.</p>
                  </div>
                )}
              </div>
              
              <div className="bg-[#f5deb3] border-4 border-[#a0522d] p-4">
                <h3 className="text-xl font-bold text-[#800000] mb-2 text-center">TRAIN INFORMATION</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Rajdhani Express: Premium trains connecting Delhi with state capitals</li>
                  <li>Shatabdi Express: Day trains with chair car seating</li>
                  <li>Duronto Express: Non-stop trains between major cities</li>
                  <li>Jan Shatabdi: Affordable alternative to Shatabdi Express</li>
                  <li>Garib Rath: AC trains with fares lower than normal AC trains</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="bg-[#a0522d] hover:bg-[#cd853f] text-white font-bold py-2 px-4 border-4 border-[#000000]"
                >
                  ← BACK TO TRAINS
                </button>
                <h2 className="text-2xl font-bold text-[#800000]">
                  PASSENGER DETAILS
                </h2>
              </div>
              
              <div className="bg-[#deb887] border-4 border-[#a0522d] p-6 mb-6">
                <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-4 mb-6">
                  <h3 className="text-xl font-bold text-[#800000] mb-2 text-center">TRAIN DETAILS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><span className="font-bold">Train Number:</span> {selectedTrain.number}</p>
                      <p><span className="font-bold">Train Name:</span> {selectedTrain.name}</p>
                      <p><span className="font-bold">From:</span> {fromStation}</p>
                      <p><span className="font-bold">To:</span> {toStation}</p>
                    </div>
                    <div>
                      <p><span className="font-bold">Date:</span> {travelDate}</p>
                      <p><span className="font-bold">Departure:</span> {selectedTrain.departureTime}</p>
                      <p><span className="font-bold">Arrival:</span> {selectedTrain.arrivalTime}</p>
                      <p><span className="font-bold">Class:</span> {trainClasses.find(c => c.id === travelClass).name}</p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleBookTicket}>
                  <h3 className="text-xl font-bold text-[#800000] mb-4">ENTER PASSENGER DETAILS</h3>
                  
                  {passengerDetails.map((passenger, index) => (
                    <div key={index} className="mb-6 bg-[#f5deb3] border-2 border-[#a0522d] p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[#800000]">Passenger {index + 1}</h4>
                        {index > 0 && (
                          <button 
                            type="button"
                            onClick={() => handleRemovePassenger(index)}
                            className="bg-[#a0522d] hover:bg-[#cd853f] text-white font-bold py-1 px-2 border-2 border-[#000000] text-sm"
                          >
                            REMOVE
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[#800000] font-bold mb-2">NAME:</label>
                          <input
                            type="text"
                            value={passenger.name}
                            onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                            className="w-full bg-[#ffffff] border-4 border-[#a0522d] p-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#800000] font-bold mb-2">AGE:</label>
                          <input
                            type="number"
                            value={passenger.age}
                            onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                            className="w-full bg-[#ffffff] border-4 border-[#a0522d] p-2"
                            min="1"
                            max="120"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#800000] font-bold mb-2">GENDER:</label>
                          <select
                            value={passenger.gender}
                            onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                            className="w-full bg-[#ffffff] border-4 border-[#a0522d] p-2"
                            required
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {passengerDetails.length < passengers && (
                    <button 
                      type="button"
                      onClick={handleAddPassenger}
                      className="bg-[#a0522d] hover:bg-[#cd853f] text-white font-bold py-2 px-4 border-4 border-[#000000] mb-6 w-full"
                    >
                      ADD PASSENGER
                    </button>
                  )}
                  
                  <div className="bg-[#f5deb3] border-2 border-[#a0522d] p-4 mb-6">
                    <h4 className="font-bold text-[#800000] mb-2">FARE SUMMARY</h4>
                    <div className="flex justify-between border-b-2 border-dashed border-[#a0522d] pb-2 mb-2">
                      <span>Base Fare:</span>
                      <span>₹{getFareForClass(selectedTrain, travelClass)}</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-dashed border-[#a0522d] pb-2 mb-2">
                      <span>Passengers:</span>
                      <span>{passengerDetails.length}</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-dashed border-[#a0522d] pb-2 mb-2">
                      <span>Reservation Charges:</span>
                      <span>₹{20 * passengerDetails.length}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#800000]">
                      <span>Total Amount:</span>
                      <span>₹{getFareForClass(selectedTrain, travelClass) * passengerDetails.length + 20 * passengerDetails.length}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      type="submit"
                      className="bg-[#a0522d] hover:bg-[#cd853f] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl flex-1"
                    >
                      BOOK TICKET
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="bg-[#8b4513] hover:bg-[#a0522d] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl flex-1"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="bg-[#800000] text-[#f5deb3] text-center p-4 mt-6 border-t-4 border-[#cd853f]">
        <p className="text-sm">© 2025 INDIAN RAILWAYS - ALL RIGHTS RESERVED</p>
        <p className="text-xs mt-2">For assistance call: 139 (Toll Free) or visit www.indianrail.gov.in</p>
      </footer>
    </div>
  );
}