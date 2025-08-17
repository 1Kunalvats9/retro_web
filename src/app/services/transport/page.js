"use client";

import { useState } from "react";
import Link from "next/link";

export default function TransportServicesPage() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchRoutes = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setShowRoutes(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif]">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg sm:text-xl font-bold">🚌</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-800">UPM Public Transport</h1>
                <p className="text-stone-600 text-xs sm:text-sm">The United Pingdom of MINET</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="px-4 sm:px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-sm text-sm sm:text-base">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-stone-800 mb-5 border-b border-stone-200 pb-2">
                Quick Links
              </h2>
              <div className="space-y-3">
                <a href="#" className="block text-stone-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50">
                  🚌 Bus Schedules
                </a>
                <a href="#" className="block text-stone-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50">
                  🎫 Buy Tickets
                </a>
                <a href="#" className="block text-stone-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50">
                  📍 Route Maps
                </a>
                <a href="#" className="block text-stone-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50">
                  📞 Contact Support
                </a>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="font-semibold text-red-800 mb-2">📢 Notice</p>
              <p className="text-red-700 text-sm">
                New bus routes added to Susland Industrial Area. Service starts from 15-08-2025
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6 sm:p-8 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-6 text-center">
                Find Your Route
              </h2>

              {!showRoutes ? (
                <form onSubmit={handleSearchRoutes} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-2">
                        From Location
                      </label>
                      <input
                        type="text"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 text-black placeholder-stone-500"
                        placeholder="Enter departure location"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-2">
                        To Location
                      </label>
                      <input
                        type="text"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 text-black placeholder-stone-500"
                        placeholder="Enter destination"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-stone-700 font-semibold mb-2">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 text-black"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md disabled:opacity-50"
                  >
                    {isLoading ? "🔍 Searching..." : "🔍 Search Routes"}
                  </button>
                </form>
              ) : (
                <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">Available Routes</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-red-600 font-bold">🚌 Route 101</span>
                            <span className="text-green-600 text-sm font-semibold">Express</span>
                          </div>
                          <div className="text-sm text-stone-600">
                            <div className="flex items-center space-x-2 mb-1">
                              <span>📍 {fromLocation}</span>
                              <span className="text-red-500">→</span>
                              <span>📍 {toLocation}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-xs">
                              <span>⏰ 2h 15m</span>
                              <span>💰 ₹45</span>
                              <span>🕐 Every 30 min</span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                          Book Now
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-red-600 font-bold">🚌 Route 203</span>
                            <span className="text-blue-600 text-sm font-semibold">Local</span>
                          </div>
                          <div className="text-sm text-stone-600">
                            <div className="flex items-center space-x-2 mb-1">
                              <span>📍 {fromLocation}</span>
                              <span className="text-red-500">→</span>
                              <span>📍 {toLocation}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-xs">
                              <span>⏰ 3h 30m</span>
                              <span>💰 ₹25</span>
                              <span>🕐 Every 45 min</span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                          Book Now
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-red-600 font-bold">🚌 Route 156</span>
                            <span className="text-purple-600 text-sm font-semibold">Premium</span>
                          </div>
                          <div className="text-sm text-stone-600">
                            <div className="flex items-center space-x-2 mb-1">
                              <span>📍 {fromLocation}</span>
                              <span className="text-red-500">→</span>
                              <span>📍 {toLocation}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-xs">
                              <span>⏰ 1h 45m</span>
                              <span>💰 ₹75</span>
                              <span>🕐 Every 1 hour</span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowRoutes(false)}
                      className="flex-1 bg-stone-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-stone-700 transition-colors duration-200 shadow-md"
                    >
                      🔍 Search Again
                    </button>
                    <button
                      onClick={() => alert("Ticket booking system coming soon!")}
                      className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                    >
                      🎫 Book All Tickets
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  Popular Routes
                </h3>
                <div className="space-y-3">
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600">🚌</span>
                      <span className="text-sm text-stone-700">Susland ↔ Industrial Area</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600">🚌</span>
                      <span className="text-sm text-stone-700">Airport ↔ City Center</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600">🚌</span>
                      <span className="text-sm text-stone-700">University ↔ Railway Station</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200">
                  View All Routes
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  Transport Passes
                </h3>
                <div className="space-y-3">
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">🎫</span>
                      <span className="text-sm text-stone-700">Daily Pass - ₹50</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">🎫</span>
                      <span className="text-sm text-stone-700">Weekly Pass - ₹250</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">🎫</span>
                      <span className="text-sm text-stone-700">Monthly Pass - ₹800</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Buy Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-red-400">UPM Public Transport</h4>
              <p className="text-stone-300 text-sm">
                The United Pingdom of MINET<br />
                Connecting communities since 1999
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-red-400">Quick Links</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-red-400 transition-colors">Bus Timings</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Fare Calculator</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-red-400">Contact Info</h4>
              <div className="text-stone-300 text-sm space-y-2">
                <p>🚌 Transport Complex, Susland</p>
                <p>📞 1-800-UPM-BUS</p>
                <p>📧 transport@upm.gov.minet</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-stone-700 pt-8 text-center">
            <p className="text-stone-400 text-sm">
              © 1999-2025 United Pingdom of MINET - All Rights Reserved
            </p>
            <p className="text-xs text-stone-500 mt-2">
              Optimized for all modern browsers and devices
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}