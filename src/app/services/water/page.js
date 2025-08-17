"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaterServicesPage() {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [billAmount, setBillAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleCheckBill = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate random bill amount between 200 and 2000
      const amount = Math.floor(Math.random() * 1800) + 200;
      setBillAmount(amount);
      setIsLoading(false);
    }, 1500);
  };

  const handlePayBill = (e) => {
    e.preventDefault();
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert("Payment successful! Receipt number: WATER-" + Math.floor(Math.random() * 1000000));
    setBillAmount(null);
    setConsumerNumber("");
    setShowPaymentForm(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif]">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">💧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">UPM Water & Sanitation</h1>
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
                <a href="#" className="block text-stone-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50">
                  📊 View Consumption History
                </a>
                <a href="#" className="block text-stone-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50">
                  🔧 Report Leakage
                </a>
                <a href="#" className="block text-stone-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50">
                  📝 New Connection
                </a>
                <a href="#" className="block text-stone-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50">
                  📞 Contact Support
                </a>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="font-semibold text-blue-800 mb-2">📢 Notice</p>
              <p className="text-blue-700 text-sm">
                Water supply will be affected in Susland area from 10AM to 2PM on Monday, 21-08-2025
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-8 mb-6">
              <h2 className="text-3xl font-bold text-stone-800 mb-6 text-center">
                Check & Pay Your Water Bill
              </h2>

              {!billAmount ? (
                <form onSubmit={handleCheckBill} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <div className="mb-5">
                    <label className="block text-stone-700 font-semibold mb-2">
                      Consumer Number
                    </label>
                    <input
                      type="text"
                      value={consumerNumber}
                      onChange={(e) => setConsumerNumber(e.target.value)}
                      className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-black placeholder-stone-500"
                      placeholder="Enter your 10-digit consumer number"
                      required
                      pattern="[0-9]{10}"
                    />
                    <p className="text-stone-500 text-sm mt-1">* 10 digits only</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md disabled:opacity-50"
                  >
                    {isLoading ? "🔍 Checking..." : "🔍 Check Bill"}
                  </button>
                </form>
              ) : (
                <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  {!showPaymentForm ? (
                    <>
                      <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">Bill Details</h3>
                      <div className="bg-white border border-stone-200 p-5 mb-6 rounded-lg">
                        <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                          <span className="font-semibold text-stone-700">Consumer Number:</span>
                          <span className="text-stone-800 font-mono">{consumerNumber}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                          <span className="font-semibold text-stone-700">Billing Period:</span>
                          <span className="text-stone-800">July 2025</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                          <span className="font-semibold text-stone-700">Due Date:</span>
                          <span className="text-stone-800">30-08-2025</span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span className="font-semibold text-stone-700">Amount Due:</span>
                          <span className="font-bold text-green-600">₹ {billAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handlePayBill}
                          className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                        >
                          💳 Pay Now
                        </button>
                        <button
                          onClick={() => setBillAmount(null)}
                          className="flex-1 bg-white hover:bg-stone-50 text-stone-700 font-semibold py-3 px-4 border border-stone-300 rounded-lg hover:border-stone-400 transition-colors duration-200 shadow-sm"
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">Payment Details</h3>
                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div>
                          <label className="block text-stone-700 font-semibold mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-black placeholder-stone-500"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            required
                          />
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="block text-stone-700 font-semibold mb-2">
                              Expiry
                            </label>
                            <input
                              type="text"
                              className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-black placeholder-stone-500"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-stone-700 font-semibold mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-black placeholder-stone-500"
                              placeholder="XXX"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-stone-700 font-semibold mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-black placeholder-stone-500"
                            placeholder="Enter name as on card"
                            required
                          />
                        </div>
                        <div className="bg-blue-50 border border-blue-200 p-4 text-blue-800 rounded-lg">
                          <p className="font-semibold text-center">Amount: ₹ {billAmount.toFixed(2)}</p>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                        >
                          💳 Confirm Payment
                        </button>
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setShowPaymentForm(false)}
                            className="text-stone-600 hover:text-stone-800 font-medium transition-colors duration-200"
                          >
                            ← Back
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              )}

              <div className="bg-white border border-stone-200 p-6 rounded-lg shadow-sm mt-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  Payment Methods
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="text-3xl mb-2 text-blue-600">💳</div>
                    <div className="font-semibold text-stone-700">Credit Card</div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="text-3xl mb-2 text-blue-600">🏦</div>
                    <div className="font-semibold text-stone-700">Debit Card</div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="text-3xl mb-2 text-blue-600">🏧</div>
                    <div className="font-semibold text-stone-700">Net Banking</div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="text-3xl mb-2 text-blue-600">📱</div>
                    <div className="font-semibold text-stone-700">UPI</div>
                  </div>
                </div>
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
              <h4 className="text-xl font-bold mb-4 text-blue-400">UPM Water & Sanitation</h4>
              <p className="text-stone-300 text-sm">
                The United Pingdom of MINET<br />
                Providing clean water since 1999
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Water Quality</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">New Connection</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-blue-400">Contact Info</h4>
              <div className="text-stone-300 text-sm space-y-2">
                <p>💧 Water Complex, Susland</p>
                <p>📞 1-800-UPM-WATER</p>
                <p>📧 water@upm.gov.minet</p>
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