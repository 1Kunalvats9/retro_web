"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaterBillPage() {
  const [connectionId, setConnectionId] = useState("");
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
    setConnectionId("");
    setShowPaymentForm(false);
  };

  return (
    <div className="min-h-screen bg-[#4169e1] font-['Comic_Sans_MS',_cursive] p-4">
      {/* Header */}
      <header className="bg-[#00ffff] border-4 border-[#0000ff] p-4 mb-6 text-center">
        <h1 className="text-4xl font-bold text-[#000080] animate-pulse mb-2">
          WATER BILL PAYMENT
        </h1>
        <div className="bg-[#ffffff] text-[#0000ff] border-2 border-[#000080] p-2">
          <marquee scrollamount="5">
            CONSERVE WATER, CONSERVE LIFE! PAY YOUR WATER BILLS ON TIME! CURRENT DISCOUNT: 5% FOR EARLY PAYMENTS!
          </marquee>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with navigation */}
        <div className="w-full md:w-1/4 bg-[#87ceeb] border-4 border-[#000080] p-4">
          <h2 className="text-2xl font-bold text-[#000080] mb-4 text-center">NAVIGATION</h2>
          <Link href="/">
            <div className="bg-[#1e90ff] hover:bg-[#4682b4] text-white font-bold py-2 px-4 border-4 border-[#000000] mb-4 text-center">
              BACK TO HOME
            </div>
          </Link>
          <div className="bg-[#e0ffff] border-2 border-[#0000ff] p-3 text-[#0000ff] mt-6">
            <p className="font-bold animate-bounce text-center">WATER ALERT!</p>
            <p className="text-sm">Water supply will be disrupted in Sector 7 on 25-08-2025 from 10AM to 2PM for maintenance</p>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 bg-[#b0e0e6] border-4 border-[#000080] p-4">
          <h2 className="text-3xl font-bold text-[#000080] text-center mb-6 underline decoration-wavy">
            CHECK & PAY YOUR WATER BILL
          </h2>

          {!billAmount ? (
            <form onSubmit={handleCheckBill} className="bg-[#e0ffff] border-4 border-dashed border-[#0000ff] p-6 mb-6">
              <div className="mb-4">
                <label className="block text-[#000080] font-bold mb-2 text-xl">
                  CONNECTION ID:
                </label>
                <input
                  type="text"
                  value={connectionId}
                  onChange={(e) => setConnectionId(e.target.value)}
                  className="w-full bg-[#ffffff] border-4 border-[#0000ff] p-2 text-lg"
                  placeholder="Enter your 8-digit water connection ID"
                  required
                  pattern="[0-9]{8}"
                />
                <p className="text-[#0000ff] text-sm mt-1">* 8 digits only</p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#00bfff] hover:bg-[#1e90ff] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl w-full"
              >
                {isLoading ? "CHECKING..." : "CHECK BILL"}
              </button>
            </form>
          ) : (
            <div className="bg-[#e0ffff] border-4 border-dashed border-[#0000ff] p-6 mb-6">
              {!showPaymentForm ? (
                <>
                  <h3 className="text-2xl font-bold text-[#000080] mb-4 text-center">BILL DETAILS</h3>
                  <div className="bg-[#ffffff] border-2 border-[#000080] p-4 mb-4">
                    <div className="flex justify-between border-b-2 border-dashed border-[#0000ff] pb-2 mb-2">
                      <span className="font-bold">Connection ID:</span>
                      <span>{connectionId}</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-dashed border-[#0000ff] pb-2 mb-2">
                      <span className="font-bold">Billing Period:</span>
                      <span>July 2025</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-dashed border-[#0000ff] pb-2 mb-2">
                      <span className="font-bold">Due Date:</span>
                      <span>25-08-2025</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-dashed border-[#0000ff] pb-2 mb-2">
                      <span className="font-bold">Water Usage:</span>
                      <span>{Math.floor(Math.random() * 50) + 10} kL</span>
                    </div>
                    <div className="flex justify-between text-xl text-[#0000ff] font-bold">
                      <span>Amount Due:</span>
                      <span>₹ {billAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handlePayBill}
                      className="bg-[#00bfff] hover:bg-[#1e90ff] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl flex-1"
                    >
                      PAY NOW
                    </button>
                    <button
                      onClick={() => setBillAmount(null)}
                      className="bg-[#ff6347] hover:bg-[#ff4500] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl flex-1"
                    >
                      CANCEL
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-[#000080] mb-4 text-center">PAYMENT DETAILS</h3>
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-4">
                      <label className="block text-[#000080] font-bold mb-2">
                        CARD NUMBER:
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#ffffff] border-4 border-[#0000ff] p-2"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        required
                      />
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <label className="block text-[#000080] font-bold mb-2">
                          EXPIRY:
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[#ffffff] border-4 border-[#0000ff] p-2"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[#000080] font-bold mb-2">
                          CVV:
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[#ffffff] border-4 border-[#0000ff] p-2"
                          placeholder="XXX"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-[#000080] font-bold mb-2">
                        CARDHOLDER NAME:
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#ffffff] border-4 border-[#0000ff] p-2"
                        placeholder="Enter name as on card"
                        required
                      />
                    </div>
                    <div className="bg-[#afeeee] border-2 border-[#0000ff] p-3 text-[#0000ff] mb-4">
                      <p className="font-bold text-center">AMOUNT: ₹ {billAmount.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-[#00bfff] hover:bg-[#1e90ff] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl flex-1"
                      >
                        CONFIRM PAYMENT
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPaymentForm(false)}
                        className="bg-[#ff6347] hover:bg-[#ff4500] text-white font-bold py-3 px-6 border-4 border-[#000000] text-xl flex-1"
                      >
                        BACK
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}

          <div className="bg-[#afeeee] border-4 border-[#000080] p-4">
            <h3 className="text-xl font-bold text-[#000080] mb-2 text-center">WATER CONSERVATION TIPS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-[#ffffff] border-2 border-[#000080] p-2">
                <div className="text-2xl mb-1 text-center">🚿</div>
                <div className="font-bold text-center">TAKE SHORTER SHOWERS</div>
              </div>
              <div className="bg-[#ffffff] border-2 border-[#000080] p-2">
                <div className="text-2xl mb-1 text-center">🚰</div>
                <div className="font-bold text-center">FIX LEAKING TAPS</div>
              </div>
              <div className="bg-[#ffffff] border-2 border-[#000080] p-2">
                <div className="text-2xl mb-1 text-center">🌱</div>
                <div className="font-bold text-center">WATER PLANTS IN EVENING</div>
              </div>
              <div className="bg-[#ffffff] border-2 border-[#000080] p-2">
                <div className="text-2xl mb-1 text-center">🧴</div>
                <div className="font-bold text-center">USE WATER EFFICIENT APPLIANCES</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#000080] text-[#00ffff] text-center p-4 mt-6 border-t-4 border-[#00bfff]">
        <p className="text-sm">© 2025 GOVERNMENT WATER DEPARTMENT - ALL RIGHTS RESERVED</p>
        <p className="text-xs mt-2">For water emergencies call: 1800-XXX-YYYY (Toll Free)</p>
      </footer>
    </div>
  );
}