"use client";

import { useState } from "react";
import Link from "next/link";

export default function TransportPage() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [transportType, setTransportType] = useState("bus");
  const [date, setDate] = useState("");
  const [showSchedules, setShowSchedules] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  const cities = [
    "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", 
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow",
    "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal"
  ];

  const generateRandomSchedules = () => {
    const schedules = [];
    const count = Math.floor(Math.random() * 5) + 3; // 3 to 7 schedules
    
    for (let i = 0; i < count; i++) {
      const departureHour = Math.floor(Math.random() * 24);
      const departureMinute = Math.floor(Math.random() * 60);
      const durationHours = Math.floor(Math.random() * 8) + 1;
      const durationMinutes = Math.floor(Math.random() * 60);
      
      const arrivalHour = (departureHour + durationHours) % 24;
      const arrivalMinute = (departureMinute + durationMinutes) % 60;
      
      const price = Math.floor(Math.random() * 1000) + 100;
      const availableSeats = Math.floor(Math.random() * 40) + 1;
      
      schedules.push({
        id: `SCH-${i + 1}`,
        departureTime: `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`,
        arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`,
        duration: `${durationHours}h ${durationMinutes}m`,
        price: price,
        availableSeats: availableSeats,
        busType: transportType === "bus" ? 
          ["AC Sleeper", "Non-AC Sleeper", "AC Seater", "Non-AC Seater"][Math.floor(Math.random() * 4)] : 
          undefined,
        trainClass: transportType === "train" ? 
          ["First Class AC", "Second Class AC", "Third Class AC", "Sleeper", "General"][Math.floor(Math.random() * 5)] : 
          undefined,
        flightClass: transportType === "flight" ? 
          ["Economy", "Premium Economy", "Business", "First Class"][Math.floor(Math.random() * 4)] : 
          undefined,
        operator: [
          "Government Transport", "Express Services", "Deluxe Travels", 
          "Royal Rides", "City Connect", "State Transport"
        ][Math.floor(Math.random() * 6)]
      });
    }
    
    return schedules;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setScheduleData(generateRandomSchedules());
      setShowSchedules(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleBooking = (schedule) => {
    alert(`Booking confirmed for ${transportType.toUpperCase()} from ${fromLocation} to ${toLocation} on ${date} at ${schedule.departureTime}. Booking ID: TRANS-${Math.floor(Math.random() * 1000000)}`);
  };

  const resetSearch = () => {
    setShowSchedules(false);
    setScheduleData([]);
  };

  return (
    <div className="min-h-screen bg-[#ff8c00] font-['Comic_Sans_MS',_cursive] p-4">
      {/* Header */}
      <header className="bg-[#ffa500] border-4 border-[#ff4500] p-4 mb-6 text-center">
        <h1 className="text-4xl font-bold text-[#8b4513] animate-pulse mb-2">
          TRANSPORT SCHEDULES
        </h1>
        <div className="bg-[#ff4500] text-[#ffffff] border-2 border-[#8b4513] p-2">
          <marquee scrollamount="5">
            TRAVEL SAFELY WITH GOVERNMENT TRANSPORT SERVICES! BOOK YOUR TICKETS ONLINE! SPECIAL DISCOUNTS FOR SENIOR CITIZENS AND STUDENTS!
          </marquee>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with navigation */}
        <div className="w-full md:w-1/4 bg-[#ffdab9] border-4 border-[#8b4513] p-4">
          <h2 className="text-2xl font-bold text-[#8b4513] mb-4 text-center">NAVIGATION</h2>
          <Link href="/">
            <div className="bg-[#ff4500] hover:bg-[#ff6347] text-white font-bold py-2 px-4 border-4 border-[#000000] mb-4 text-center">
              BACK TO HOME
            </div>
          </Link>
          
          <div className="bg-[#ffe4b5] border-2 border-[#ff4500] p-3 text-[#8b4513] mt-6">
            <p className="font-bold animate-bounce text-center">TRAVEL ALERT!</p>
            <p className="text-sm">Highway maintenance on NH-8 may cause delays. Plan your journey accordingly.</p>
          </div>
          
          <div className="bg-[#ffe4b5] border-2 border-[#ff4500] p-3 text-[#8b4513] mt-4">
            <p className="font-bold text-center">HELPLINE NUMBERS</p>
            <p className="text-sm text-center">Bus: 1800-BUS-HELP</p>
            <p className="text-sm text-center">Train: 1800-RAIL-HELP</p>
            <p className="text-sm text-center">Flight: 1800-AIR-HELP</p>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 bg-[#ffe4b5] border-4 border-[#8b4513] p-4">
          {!showSchedules ? (
            <>
              <h2 className="text-3xl font-bold text-[#8b4513] text-center mb-6 underline decoration-wavy">
                SEARCH TRANSPORT SCHEDULES
              </h2>
              
              <form onSubmit={handleSearch} className="bg-[#ffdab9] border-4 border-dashed border-[#ff4500] p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#8b4513] font-bold mb-2 text-xl">
                      FROM:
                    </label>
                    <select
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full bg-[#ffffff] border-4 border-[#ff4500] p-2 text-lg"
                      required
                    >
                      <option value="">Select Departure City</option>
                      {cities.map((city) => (
                        <option key={`from-${city}`} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#8b4513] font-bold mb-2 text-xl">
                      TO:
                    </label>
                    <select
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="w-full bg-[#ffffff] border-4 border-[#ff4500] p-2 text-lg"
                      required
                    >
                      <option value="">Select Destination City</option>
                      {cities.map((city) => (
                        <option key={`to-${city}`} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#8b4513] font-bold mb-2 text-xl">
                      DATE:
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#ffffff] border-4 border-[#ff4500] p-2 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#8b4513] font-bold mb-2 text-xl">
                      TRANSPORT TYPE:
                    </label>
                    <div className="flex gap-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="transportType"
                          value="bus"
                          checked={transportType === "bus"}
                          onChange={() => setTransportType("bus")}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">BUS</span>
                      </label>
                      <label className="flex items-center cursor-pointer ml-4">
                        <input
                          type="radio"
                          name="transportType"
                          value="train"
                          checked={transportType === "train"}
                          onChange={() => setTransportType("train")}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">TRAIN</span>
                      </label>
                      <label className="flex items-center cursor-pointer ml-4">
                        <input
                          type="radio"
                          name="transportType"
                          value="flight"
                          checked={transportType === "flight"}
                          onChange={() => setTransportType("flight")}
                          className="mr-2 h-5 w-5"
                        />
                        <span className="text-lg">FLIGHT</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#ff4500] hover:bg-[#ff6347] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl w-full"
                >
                  {isLoading ? "SEARCHING..." : "SEARCH SCHEDULES"}
                </button>
              </form>
              
              <div className="bg-[#ffdab9] border-4 border-[#8b4513] p-4">
                <h3 className="text-xl font-bold text-[#8b4513] mb-2 text-center">POPULAR ROUTES</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
                  <div className="bg-[#ffe4b5] border-2 border-[#ff4500] p-2">
                    <div className="text-2xl mb-1">🚌</div>
                    <div className="font-bold">DELHI - JAIPUR</div>
                    <div className="text-sm">Daily 20+ Buses</div>
                  </div>
                  <div className="bg-[#ffe4b5] border-2 border-[#ff4500] p-2">
                    <div className="text-2xl mb-1">🚂</div>
                    <div className="font-bold">MUMBAI - PUNE</div>
                    <div className="text-sm">Daily 15+ Trains</div>
                  </div>
                  <div className="bg-[#ffe4b5] border-2 border-[#ff4500] p-2">
                    <div className="text-2xl mb-1">✈️</div>
                    <div className="font-bold">DELHI - MUMBAI</div>
                    <div className="text-sm">Daily 30+ Flights</div>
                  </div>
                  <div className="bg-[#ffe4b5] border-2 border-[#ff4500] p-2">
                    <div className="text-2xl mb-1">🚌</div>
                    <div className="font-bold">BANGALORE - CHENNAI</div>
                    <div className="text-sm">Daily 25+ Buses</div>
                  </div>
                  <div className="bg-[#ffe4b5] border-2 border-[#ff4500] p-2">
                    <div className="text-2xl mb-1">🚂</div>
                    <div className="font-bold">KOLKATA - DELHI</div>
                    <div className="text-sm">Daily 10+ Trains</div>
                  </div>
                  <div className="bg-[#ffe4b5] border-2 border-[#ff4500] p-2">
                    <div className="text-2xl mb-1">✈️</div>
                    <div className="font-bold">CHENNAI - HYDERABAD</div>
                    <div className="text-sm">Daily 12+ Flights</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={resetSearch}
                  className="bg-[#ff4500] hover:bg-[#ff6347] text-white font-bold py-2 px-4 border-4 border-[#000000]"
                >
                  ← NEW SEARCH
                </button>
                <h2 className="text-2xl font-bold text-[#8b4513]">
                  {fromLocation} to {toLocation}
                </h2>
              </div>
              
              <div className="bg-[#ffdab9] border-4 border-[#ff4500] p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="font-bold text-[#8b4513]">Date:</span> {date}
                  </div>
                  <div>
                    <span className="font-bold text-[#8b4513]">Transport:</span> {transportType.toUpperCase()}
                  </div>
                </div>
                
                {scheduleData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#ff8c00] text-white">
                          <th className="border-2 border-[#8b4513] p-2 text-left">DEPARTURE</th>
                          <th className="border-2 border-[#8b4513] p-2 text-left">ARRIVAL</th>
                          <th className="border-2 border-[#8b4513] p-2 text-center">DURATION</th>
                          {transportType === "bus" && (
                            <th className="border-2 border-[#8b4513] p-2 text-center">BUS TYPE</th>
                          )}
                          {transportType === "train" && (
                            <th className="border-2 border-[#8b4513] p-2 text-center">CLASS</th>
                          )}
                          {transportType === "flight" && (
                            <th className="border-2 border-[#8b4513] p-2 text-center">CLASS</th>
                          )}
                          <th className="border-2 border-[#8b4513] p-2 text-center">OPERATOR</th>
                          <th className="border-2 border-[#8b4513] p-2 text-center">PRICE</th>
                          <th className="border-2 border-[#8b4513] p-2 text-center">SEATS</th>
                          <th className="border-2 border-[#8b4513] p-2 text-center">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduleData.map((schedule) => (
                          <tr key={schedule.id} className="hover:bg-[#ffe4b5]">
                            <td className="border-2 border-[#8b4513] p-2">{schedule.departureTime}</td>
                            <td className="border-2 border-[#8b4513] p-2">{schedule.arrivalTime}</td>
                            <td className="border-2 border-[#8b4513] p-2 text-center">{schedule.duration}</td>
                            {transportType === "bus" && (
                              <td className="border-2 border-[#8b4513] p-2 text-center">{schedule.busType}</td>
                            )}
                            {transportType === "train" && (
                              <td className="border-2 border-[#8b4513] p-2 text-center">{schedule.trainClass}</td>
                            )}
                            {transportType === "flight" && (
                              <td className="border-2 border-[#8b4513] p-2 text-center">{schedule.flightClass}</td>
                            )}
                            <td className="border-2 border-[#8b4513] p-2 text-center">{schedule.operator}</td>
                            <td className="border-2 border-[#8b4513] p-2 text-center">₹{schedule.price}</td>
                            <td className="border-2 border-[#8b4513] p-2 text-center">{schedule.availableSeats}</td>
                            <td className="border-2 border-[#8b4513] p-2 text-center">
                              <button 
                                onClick={() => handleBooking(schedule)}
                                className="bg-[#ff4500] hover:bg-[#ff6347] text-white font-bold py-1 px-3 border-2 border-[#000000]"
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
                  <div className="text-center p-4 bg-[#ffe4b5] border-2 border-[#ff4500]">
                    <p className="text-[#8b4513] font-bold">No schedules found for this route and date.</p>
                    <p>Please try different search criteria.</p>
                  </div>
                )}
              </div>
              
              <div className="bg-[#ffe4b5] border-4 border-[#8b4513] p-4">
                <h3 className="text-xl font-bold text-[#8b4513] mb-2 text-center">BOOKING INFORMATION</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Arrive at the station/terminal at least 30 minutes before departure</li>
                  <li>Carry a valid government ID proof for verification</li>
                  <li>Children below 5 years travel free (without seat)</li>
                  <li>Senior citizens (above 60) get 15% discount</li>
                  <li>Cancellation charges apply as per transport policy</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="bg-[#8b4513] text-[#ffe4b5] text-center p-4 mt-6 border-t-4 border-[#ff8c00]">
        <p className="text-sm">© 2025 GOVERNMENT TRANSPORT DEPARTMENT - ALL RIGHTS RESERVED</p>
        <p className="text-xs mt-2">For assistance call: 1800-TRANSPORT (Toll Free)</p>
      </footer>
    </div>
  );
}