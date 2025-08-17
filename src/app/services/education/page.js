"use client";

import { useState } from "react";
import Link from "next/link";

export default function EducationPortalPage() {
  const [studentId, setStudentId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckResults = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif]">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">📚</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">UPM Education Portal</h1>
                <p className="text-stone-600 text-sm">The United Pingdom of MINET</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-sm">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-stone-800 mb-5 border-b border-stone-200 pb-2">
                Quick Links
              </h2>
              <div className="space-y-3">
                <a href="#" className="block text-stone-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50">
                  📊 View Academic Records
                </a>
                <a href="#" className="block text-stone-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50">
                  🎓 Apply for Scholarships
                </a>
                <a href="#" className="block text-stone-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50">
                  📝 Download Certificates
                </a>
                <a href="#" className="block text-stone-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50">
                  📞 Contact Support
                </a>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <p className="font-semibold text-purple-800 mb-2">📢 Notice</p>
              <p className="text-purple-700 text-sm">
                Scholarship applications for 2025-26 academic year are now open. Deadline: 30-09-2025
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-8 mb-6">
              <h2 className="text-3xl font-bold text-stone-800 mb-6 text-center">
                Student Portal Access
              </h2>

              {!showResults ? (
                <form onSubmit={handleCheckResults} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <div className="mb-5">
                    <label className="block text-stone-700 font-semibold mb-2">
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-black placeholder-stone-500"
                      placeholder="Enter your student ID"
                      required
                    />
                    <p className="text-stone-500 text-sm mt-1">* Enter your registered student ID</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md disabled:opacity-50"
                  >
                    {isLoading ? "🔍 Checking..." : "🔍 Check Results"}
                  </button>
                </form>
              ) : (
                <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">Academic Results</h3>
                  <div className="bg-white border border-stone-200 p-5 mb-6 rounded-lg">
                    <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                      <span className="font-semibold text-stone-700">Student ID:</span>
                      <span className="text-stone-800 font-mono">{studentId}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                      <span className="font-semibold text-stone-700">Academic Year:</span>
                      <span className="text-stone-800">2024-25</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                      <span className="font-semibold text-stone-700">Semester:</span>
                      <span className="text-stone-800">2nd Semester</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-stone-700">CGPA:</span>
                      <span className="font-bold text-green-600">8.7/10</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-stone-800 mb-2">Subject-wise Marks</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Mathematics:</span>
                          <span className="font-semibold text-green-600">85/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Physics:</span>
                          <span className="font-semibold text-green-600">88/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chemistry:</span>
                          <span className="font-semibold text-green-600">82/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>English:</span>
                          <span className="font-semibold text-green-600">90/100</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-stone-800 mb-2">Performance Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Marks:</span>
                          <span className="font-semibold">345/400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Percentage:</span>
                          <span className="font-semibold text-green-600">86.25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Grade:</span>
                          <span className="font-semibold text-blue-600">A</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rank:</span>
                          <span className="font-semibold text-purple-600">15/120</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowResults(false)}
                      className="flex-1 bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md"
                    >
                      🔍 Check Another
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-md"
                    >
                      🖨️ Print Results
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  Scholarship Applications
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm text-green-800">Merit-based Scholarships</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">✅</span>
                      <span className="text-sm text-blue-800">Need-based Financial Aid</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✅</span>
                      <span className="text-sm text-purple-800">Sports Excellence Awards</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Apply Now
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  Document Downloads
                </h3>
                <div className="space-y-3">
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-stone-600">📄</span>
                      <span className="text-sm text-stone-700">Academic Transcripts</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-stone-600">🎓</span>
                      <span className="text-sm text-stone-700">Degree Certificates</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-stone-600">📋</span>
                      <span className="text-sm text-stone-700">Character Certificates</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Download All
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-purple-400">UPM Education Portal</h4>
              <p className="text-stone-300 text-sm">
                The United Pingdom of MINET<br />
                Empowering minds since 1999
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-purple-400">Quick Links</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Student Handbook</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-purple-400">Contact Info</h4>
              <div className="text-stone-300 text-sm space-y-2">
                <p>📚 Education Complex, Susland</p>
                <p>📞 1-800-UPM-EDU</p>
                <p>📧 education@upm.gov.minet</p>
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