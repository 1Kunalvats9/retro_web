"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusMessage from "../components/StatusMessage";
import VisualButton from "../components/VisualButton";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [user, setUser] = useState(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('upm_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem('upm_user', JSON.stringify(data.user));
        setShowLoginModal(false);
        setUsername("");
        setPassword("");
        setStatusMessage({ type: 'success', message: 'Welcome back! Login successful.' });
      } else {
        const errorData = await response.json();
        setStatusMessage({ type: 'error', message: errorData.error || 'Login failed. Please check your credentials.' });
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatusMessage({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setShowSignupModal(false);
        setUsername("");
        setPassword("");
        setStatusMessage({ type: 'success', message: 'Account created successfully! You can now sign in.' });
      } else {
        const errorData = await response.json();
        setStatusMessage({ type: 'error', message: errorData.error || 'Signup failed. Please try again.' });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setStatusMessage({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('upm_user');
    setStatusMessage({ type: 'info', message: 'You have been logged out successfully.' });
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif]">
      {/* Status Messages */}
      {statusMessage && (
        <StatusMessage
          type={statusMessage.type}
          message={statusMessage.message}
          onClose={() => setStatusMessage(null)}
        />
      )}

      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-lg sm:text-xl font-bold">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-800">UPM Government Portal</h1>
                <p className="text-stone-600 text-xs sm:text-sm">The United Pingdom of MINET</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-stone-600">Welcome,</span>
                    <span className="font-semibold text-stone-800 ml-1">{user?.userName}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-4 sm:px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 shadow-sm text-sm sm:text-base btn-primary"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="px-4 sm:px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-sm text-sm sm:text-base btn-primary"
                  >
                    🔐 Sign In
                  </button>
                  <button 
                    onClick={() => setShowSignupModal(true)}
                    className="px-4 sm:px-6 py-2 border-2 border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-all duration-300 text-sm sm:text-base btn-secondary"
                  >
                    ✨ Create Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl">🏛️</div>
          <div className="absolute top-20 right-20 text-4xl">⚡</div>
          <div className="absolute bottom-20 left-20 text-5xl">💧</div>
          <div className="absolute bottom-10 right-10 text-4xl">🚌</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Welcome to UPM Digital Services
          </h2>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your trusted gateway to government services in The United Pingdom of MINET. 
            Access essential services with security and ease.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 service-card">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Population</h3>
              <p className="text-blue-600 font-bold text-lg">6.9 Million</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 service-card">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Capital</h3>
              <p className="text-green-600 font-bold text-lg">Susland</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 service-card">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Internet</h3>
              <p className="text-purple-600 font-bold text-lg">Trusted & Secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Government Services</h3>
            <p className="text-stone-600 text-lg mb-2">Access essential services from the comfort of your home</p>
            <p className="text-stone-500 text-sm">👆 Click on any service below to get started</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: "Electricity Services", 
                icon: "⚡", 
                path: "/services/electricity", 
                color: "yellow",
                iconColor: "text-yellow-600",
                description: "Pay bills, check consumption, report outages"
              },
              { 
                name: "Water & Sanitation", 
                icon: "💧", 
                path: "/services/water", 
                color: "blue",
                iconColor: "text-blue-600",
                description: "Water billing, maintenance requests"
              },
              { 
                name: "Education Portal", 
                icon: "📚", 
                path: "/services/education", 
                color: "purple",
                iconColor: "text-purple-600",
                description: "Student records, scholarship applications"
              },
              { 
                name: "Citizen Benefits", 
                icon: "📋", 
                path: "/services/schemes", 
                color: "green",
                iconColor: "text-green-600",
                description: "Social schemes, welfare programs"
              },
              { 
                name: "Public Transport", 
                icon: "🚌", 
                path: "/services/transport", 
                color: "red",
                iconColor: "text-red-600",
                description: "Bus schedules, route information"
              },
              { 
                name: "Railway Services", 
                icon: "🚂", 
                path: "/services/railway", 
                color: "indigo",
                iconColor: "text-indigo-600",
                description: "Ticket booking, train schedules"
              },
            ].map((service, index) => (
              <Link href={service.path} key={index}>
                <VisualButton
                  icon={service.icon}
                  text={service.name}
                  description={service.description}
                  color={service.color}
                  size="lg"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Why Choose UPM Digital Services?</h3>
            <p className="text-stone-600 text-lg">Experience the future of government services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🔒", title: "Bank-Level Security", description: "Your data is protected with advanced encryption" },
              { icon: "📱", title: "Low-Bandwidth Optimized", description: "Works on dial-up connections" },
              { icon: "🏛️", title: "Government Backed", description: "Official UPM government website" },
              { icon: "📞", title: "24/7 Support", description: "Call center for assistance" }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h4 className="text-lg font-bold text-stone-800 mb-2">{feature.title}</h4>
                <p className="text-stone-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Latest Updates</h3>
            <p className="text-stone-600 text-lg">Stay informed about government services and announcements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 service-card">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-green-100 text-green-800 font-bold text-sm px-3 py-1 rounded-full">🆕 NEW</span>
                <span className="text-stone-400 text-sm">2 hours ago</span>
              </div>
              <p className="text-stone-700">Citizen ID verification system now available online</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 service-card">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-100 text-blue-800 font-bold text-sm px-3 py-1 rounded-full">🔄 UPDATE</span>
                <span className="text-stone-400 text-sm">1 day ago</span>
              </div>
              <p className="text-stone-700">Electricity bill payment portal upgraded for better security</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 service-card">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-amber-100 text-amber-800 font-bold text-sm px-3 py-1 rounded-full">📢 NOTICE</span>
                <span className="text-stone-400 text-sm">3 days ago</span>
              </div>
              <p className="text-stone-700">System maintenance scheduled for Sunday 2AM-4AM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-400">UPM Government</h4>
              <p className="text-stone-300 text-sm">
                The United Pingdom of MINET<br />
                Building trust through digital innovation since 1999
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-400">Quick Links</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">About UPM</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Officials</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-400">Services</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Bills & Payments</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Documents</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Schemes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-400">Contact Info</h4>
              <div className="text-stone-300 text-sm space-y-2">
                <p>🏛️ Government Complex, Susland</p>
                <p>📞 1-800-UPM-HELP</p>
                <p>📧 digital@upm.gov.minet</p>
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 fade-in">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl slide-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4 shadow-lg">
                <span className="text-2xl text-white">🔐</span>
              </div>
              <h2 className="text-2xl font-bold text-stone-800">Welcome Back</h2>
              <p className="text-stone-600 mt-2">Sign in to your account</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Citizen ID / Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition-all duration-300 text-black placeholder-stone-500 input-field"
                  placeholder="Enter your username"
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition-all duration-300 text-black placeholder-stone-500 input-field"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed btn-primary flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>🔐</span>
                    <span>Sign In</span>
                  </>
                )}
              </button>
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  disabled={isLoading}
                  className="text-stone-500 hover:text-stone-700 font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 fade-in">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl slide-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
                <span className="text-2xl text-white">✨</span>
              </div>
              <h2 className="text-2xl font-bold text-stone-800">Create Account</h2>
              <p className="text-stone-600 mt-2">Join thousands of UPM citizens online</p>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Citizen ID / Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-black placeholder-stone-500 input-field"
                  placeholder="Enter your username"
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-black placeholder-stone-500 input-field"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed btn-primary flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Create Account</span>
                  </>
                )}
              </button>
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setShowSignupModal(false)}
                  disabled={isLoading}
                  className="text-stone-500 hover:text-stone-700 font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
