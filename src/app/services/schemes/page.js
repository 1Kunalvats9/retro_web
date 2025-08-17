"use client";

import { useState } from "react";
import Link from "next/link";

export default function CitizenBenefitsPage() {
  const [citizenId, setCitizenId] = useState("");
  const [showBenefits, setShowBenefits] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckBenefits = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setShowBenefits(true);
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg sm:text-xl font-bold">📋</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-800">UPM Citizen Benefits</h1>
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
                <a href="#" className="block text-stone-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50">
                  🎯 Apply for Schemes
                </a>
                <a href="#" className="block text-stone-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50">
                  📊 Check Status
                </a>
                <a href="#" className="block text-stone-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50">
                  📝 Download Documents
                </a>
                <a href="#" className="block text-stone-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50">
                  📞 Contact Support
                </a>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="font-semibold text-green-800 mb-2">📢 Notice</p>
              <p className="text-green-700 text-sm">
                New scholarship scheme for students from rural areas. Applications open from 01-09-2025
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6 sm:p-8 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-6 text-center">
                Check Your Benefits
              </h2>

              {!showBenefits ? (
                <form onSubmit={handleCheckBenefits} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <div className="mb-5">
                    <label className="block text-stone-700 font-semibold mb-2">
                      Citizen ID
                    </label>
                    <input
                      type="text"
                      value={citizenId}
                      onChange={(e) => setCitizenId(e.target.value)}
                      className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-black placeholder-stone-500"
                      placeholder="Enter your 12-digit citizen ID"
                      required
                      pattern="[0-9]{12}"
                    />
                    <p className="text-stone-500 text-sm mt-1">* 12 digits only</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md disabled:opacity-50"
                  >
                    {isLoading ? "🔍 Checking..." : "🔍 Check Benefits"}
                  </button>
                </form>
              ) : (
                <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">Available Benefits</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-green-600 font-bold">🎓 Education Scholarship</span>
                            <span className="text-blue-600 text-sm font-semibold">Active</span>
                          </div>
                          <div className="text-sm text-stone-600">
                            <div className="mb-2">
                              <span className="font-semibold">Amount:</span> ₹25,000 per year
                            </div>
                            <div className="flex items-center space-x-4 text-xs">
                              <span>📅 Valid till: 31-03-2026</span>
                              <span>✅ Status: Approved</span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                          Apply Now
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-green-600 font-bold">🏥 Health Insurance</span>
                            <span className="text-green-600 text-sm font-semibold">Eligible</span>
                          </div>
                          <div className="text-sm text-stone-600">
                            <div className="mb-2">
                              <span className="font-semibold">Coverage:</span> Up to ₹5,00,000
                            </div>
                            <div className="flex items-center space-x-4 text-xs">
                              <span>📅 Valid till: 31-12-2025</span>
                              <span>⏳ Status: Pending</span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                          Apply Now
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-green-600 font-bold">🏠 Housing Scheme</span>
                            <span className="text-purple-600 text-sm font-semibold">Available</span>
                          </div>
                          <div className="text-sm text-stone-600">
                            <div className="mb-2">
                              <span className="font-semibold">Benefit:</span> Interest subsidy on home loans
                            </div>
                            <div className="flex items-center space-x-4 text-xs">
                              <span>📅 Valid till: 31-03-2026</span>
                              <span>✅ Status: Eligible</span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowBenefits(false)}
                      className="flex-1 bg-stone-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-stone-700 transition-colors duration-200 shadow-md"
                    >
                      🔍 Check Another
                    </button>
                    <button
                      onClick={() => alert("Application system coming soon!")}
                      className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                    >
                      📝 Apply All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  Popular Schemes
                </h3>
                <div className="space-y-3">
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">🎓</span>
                      <span className="text-sm text-stone-700">Student Scholarship Program</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">🏥</span>
                      <span className="text-sm text-stone-700">Universal Health Coverage</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">🏠</span>
                      <span className="text-sm text-stone-700">Affordable Housing Initiative</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  View All Schemes
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  Application Status
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm text-green-800">Scholarship - Approved</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600">⏳</span>
                      <span className="text-sm text-yellow-800">Health Insurance - Under Review</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">📋</span>
                      <span className="text-sm text-blue-800">Housing Scheme - Documents Required</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Check Status
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
              <h4 className="text-xl font-bold mb-4 text-green-400">UPM Citizen Benefits</h4>
              <p className="text-stone-300 text-sm">
                The United Pingdom of MINET<br />
                Empowering citizens since 1999
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-green-400">Quick Links</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-green-400 transition-colors">Scheme Guidelines</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Application Forms</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-green-400">Contact Info</h4>
              <div className="text-stone-300 text-sm space-y-2">
                <p>📋 Benefits Complex, Susland</p>
                <p>📞 1-800-UPM-BENEFITS</p>
                <p>📧 benefits@upm.gov.minet</p>
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