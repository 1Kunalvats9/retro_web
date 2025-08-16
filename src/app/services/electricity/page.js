"use client";

import { useState } from "react";
import Link from "next/link";

export default function ElectricityBillPage() {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [billAmount, setBillAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleCheckBill = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate random bill amount between 500 and 5000
      const amount = Math.floor(Math.random() * 4500) + 500;
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
    alert("Payment successful! Receipt number: ELEC-" + Math.floor(Math.random() * 1000000));
    setBillAmount(null);
    setConsumerNumber("");
    setShowPaymentForm(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-['Inter', 'Segoe UI', sans-serif] p-6">
      {/* Modern header */}
      <header className="bg-white p-6 mb-8 text-center relative rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold text-[#2c3e50] mb-3">
          Electricity Bill Payment
        </h1>
        <div className="bg-[#edf2f7] text-[#4a5568] p-3 rounded-lg">
          <p className="font-medium">
            Pay your electricity bills online. Avoid late fees. Current surcharge: 2.5% for payments after due date.
          </p>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with navigation */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#2c3e50] mb-5">Navigation</h2>
            <Link href="/">
              <div className="w-full bg-[#4299e1] hover:bg-[#3182ce] text-white font-medium py-2.5 px-4 rounded-lg mb-4 transition-colors duration-200 shadow-sm text-center">
                Back to Home
              </div>
            </Link>
          </div>
          <div className="bg-[#ebf8ff] border border-[#bee3f8] p-4 text-[#2b6cb0] rounded-xl">
            <p className="font-semibold mb-1">Notice</p>
            <p className="text-sm">Scheduled maintenance: System will be down from 2AM to 4AM on 20-08-2025</p>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#2c3e50] mb-6">
              Check & Pay Your Bill
            </h2>

            {!billAmount ? (
              <form onSubmit={handleCheckBill} className="bg-white border border-gray-200 p-6 mb-6 rounded-lg shadow-sm">
                <div className="mb-5">
                  <label className="block text-[#4a5568] font-medium mb-2">
                    Consumer Number
                  </label>
                  <input
                    type="text"
                    value={consumerNumber}
                    onChange={(e) => setConsumerNumber(e.target.value)}
                    className="w-full bg-[#f7fafc] border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299e1] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your 10-digit consumer number"
                    required
                    pattern="[0-9]{10}"
                  />
                  <p className="text-[#718096] text-sm mt-1">* 10 digits only</p>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4299e1] hover:bg-[#3182ce] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  {isLoading ? "Checking..." : "Check Bill"}
                </button>
              </form>
            ) : (
              <div className="bg-white border border-gray-200 p-6 mb-6 rounded-lg shadow-sm">
                {!showPaymentForm ? (
                  <>
                    <h3 className="text-xl font-semibold text-[#2c3e50] mb-5 text-center">Bill Details</h3>
                    <div className="bg-[#f7fafc] border border-gray-200 p-5 mb-6 rounded-lg">
                      <div className="flex justify-between border-b border-gray-200 pb-3 mb-3">
                        <span className="font-medium text-[#4a5568]">Consumer Number:</span>
                        <span className="text-[#2d3748]">{consumerNumber}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-3 mb-3">
                        <span className="font-medium text-[#4a5568]">Billing Period:</span>
                        <span className="text-[#2d3748]">July 2025</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-3 mb-3">
                        <span className="font-medium text-[#4a5568]">Due Date:</span>
                        <span className="text-[#2d3748]">30-08-2025</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-[#2c3e50]">Amount Due:</span>
                        <span className="font-semibold text-[#3182ce]">₹ {billAmount.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handlePayBill}
                        className="flex-1 bg-[#4299e1] hover:bg-[#3182ce] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                      >
                        Pay Now
                      </button>
                      <button
                        onClick={() => setBillAmount(null)}
                        className="flex-1 bg-white hover:bg-gray-50 text-[#4a5568] font-medium py-3 px-4 border border-gray-300 rounded-lg transition-colors duration-200 shadow-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-[#2c3e50] mb-5 text-center">Payment Details</h3>
                    <form onSubmit={handlePaymentSubmit} className="space-y-5">
                      <div>
                        <label className="block text-[#4a5568] font-medium mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[#f7fafc] border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299e1] focus:border-transparent transition-all duration-200"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          required
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-[#4a5568] font-medium mb-2">
                            Expiry
                          </label>
                          <input
                            type="text"
                            className="w-full bg-[#f7fafc] border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299e1] focus:border-transparent transition-all duration-200"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[#4a5568] font-medium mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full bg-[#f7fafc] border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299e1] focus:border-transparent transition-all duration-200"
                            placeholder="XXX"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[#4a5568] font-medium mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[#f7fafc] border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299e1] focus:border-transparent transition-all duration-200"
                          placeholder="Enter name as on card"
                          required
                        />
                      </div>
                      <div className="bg-[#ebf8ff] border border-[#bee3f8] p-4 text-[#2b6cb0] rounded-lg">
                        <p className="font-semibold text-center">Amount: ₹ {billAmount.toFixed(2)}</p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-[#4299e1] hover:bg-[#3182ce] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                        >
                          Confirm Payment
                        </button>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setShowPaymentForm(false)}
                          className="text-[#718096] hover:text-[#4a5568] font-medium transition-colors duration-200"
                        >
                          Back
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}

            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#2c3e50] mb-4 text-center">Payment Methods</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-[#f7fafc] border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-2 text-[#3182ce]">💳</div>
                  <div className="font-medium text-[#4a5568]">Credit Card</div>
                </div>
                <div className="bg-[#f7fafc] border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-2 text-[#3182ce]">🏦</div>
                  <div className="font-medium text-[#4a5568]">Debit Card</div>
                </div>
                <div className="bg-[#f7fafc] border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-2 text-[#3182ce]">🏧</div>
                  <div className="font-medium text-[#4a5568]">Net Banking</div>
                </div>
                <div className="bg-[#f7fafc] border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-2 text-[#3182ce]">📱</div>
                  <div className="font-medium text-[#4a5568]">UPI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 text-[#4a5568] text-center p-6 mt-8 rounded-xl">
        <p className="text-sm">© 2025 Government Electricity Department - All Rights Reserved</p>
        <p className="text-xs mt-2 text-gray-500">For assistance call: 1800-XXX-XXXX (Toll Free)</p>
      </footer>
    </div>
  );
}