"use client";

import React, { useState } from "react";
import Link from 'next/link';

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Public Transport",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    findRoute: "Find Route",
    liveTracking: "Live Tracking",
    buyPass: "Buy a Pass",
    fromLocation: "From Location",
    toLocation: "To Location",
    travelDate: "Travel Date",
    searching: "Searching...",
    searchRoutes: "Search Routes",
    availableRoutes: "Available Routes",
    searchAgain: "Search Again",
    bookNow: "Book Now",
    liveBusTracking: "Live Bus Tracking",
    liveBusHint: "Enter the bus number to see its live location.",
    busNumberPlaceholder: "Enter Bus Number (e.g., 101)",
    trackBus: "Track Bus",
    dailyPass: "Daily Pass",
    weeklyPass: "Weekly Pass",
    monthlyPass: "Monthly Pass",
    proceedToBuy: "Proceed to Buy",
    confirmTicket: "Confirm Your Ticket",
    routeLabel: "Route:",
    journeyLabel: "Journey:",
    fareLabel: "Fare:",
    cancel: "Cancel",
    confirmAndPay: "Confirm & Pay",
    ticketBooked: "Ticket Booked Successfully!",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    changeToHindi: "हिंदी में",
  },
  hi: {
    portalTitle: "यूपीएम सार्वजनिक परिवहन",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    findRoute: "मार्ग खोजें",
    liveTracking: "लाइव ट्रैकिंग",
    buyPass: "पास खरीदें",
    fromLocation: "से स्थान",
    toLocation: "तक स्थान",
    travelDate: "यात्रा की तारीख",
    searching: "खोज हो रही है...",
    searchRoutes: "मार्ग खोजें",
    availableRoutes: "उपलब्ध मार्ग",
    searchAgain: "फिर से खोजें",
    bookNow: "अभी बुक करें",
    liveBusTracking: "लाइव बस ट्रैकिंग",
    liveBusHint: "बस का लाइव स्थान देखने के लिए बस नंबर दर्ज करें।",
    busNumberPlaceholder: "बस नंबर दर्ज करें (उदा., 101)",
    trackBus: "बस ट्रैक करें",
    dailyPass: "दैनिक पास",
    weeklyPass: "साप्ताहिक पास",
    monthlyPass: "मासिक पास",
    proceedToBuy: "खरीदने के लिए आगे बढ़ें",
    confirmTicket: "अपने टिकट की पुष्टि करें",
    routeLabel: "मार्ग:",
    journeyLabel: "यात्रा:",
    fareLabel: "किराया:",
    cancel: "रद्द करें",
    confirmAndPay: "पुष्टि करें और भुगतान करें",
    ticketBooked: "टिकट सफलतापूर्वक बुक हो गया!",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    changeToEnglish: "English",
  },
};

// --- Helper Components ---

const RouteCard = ({ route, onBookNow, lang }) => (
  <div className="bg-white border border-stone-200 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-red-600 font-bold">🚌 {route.name}</span>
          <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${route.typeColor}`}>
            {route.type}
          </span>
        </div>
        <div className="text-sm text-stone-600">
          <div className="flex items-center space-x-2 mb-1">
            <span>📍 {route.from}</span>
            <span className="text-red-500 font-bold">→</span>
            <span>📍 {route.to}</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-stone-500">
            <span>⏰ {route.duration}</span>
            <span>💰 ₹{route.fare}</span>
            <span>🕐 Freq: {route.frequency}</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => onBookNow(route)}
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm w-full sm:w-auto"
      >
        {lang.bookNow}
      </button>
    </div>
  </div>
);

const BookingModal = ({ route, onClose, lang }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl text-left">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">{lang.confirmTicket}</h2>
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg mb-6 space-y-2">
                <p><span className="font-semibold">{lang.routeLabel}</span> {route.name}</p>
                <p><span className="font-semibold">{lang.journeyLabel}</span> {route.from} to {route.to}</p>
                <p><span className="font-semibold">{lang.fareLabel}</span> ₹{route.fare}</p>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onClose}
                    className="flex-1 bg-stone-200 text-stone-800 font-semibold py-3 px-4 rounded-lg hover:bg-stone-300 transition-colors"
                >
                    {lang.cancel}
                </button>
                <button
                    onClick={() => { alert(lang.ticketBooked); onClose(); }}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                    {lang.confirmAndPay}
                </button>
            </div>
        </div>
    </div>
);


export default function TransportServicesPage() {
  const [fromLocation, setFromLocation] = useState("City Center");
  const [toLocation, setToLocation] = useState("Airport");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showRoutes, setShowRoutes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('find_route');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [language, setLanguage] = useState('en');

  const lang = translations[language];

  const availableRoutes = [
    { name: "Route 101", type: "Express", typeColor: "bg-green-100 text-green-700", from: fromLocation, to: toLocation, duration: "2h 15m", fare: 45, frequency: "Every 30 min" },
    { name: "Route 203", type: "Local", typeColor: "bg-blue-100 text-blue-700", from: fromLocation, to: toLocation, duration: "3h 30m", fare: 25, frequency: "Every 45 min" },
    { name: "Route 156", type: "Premium", typeColor: "bg-purple-100 text-purple-700", from: fromLocation, to: toLocation, duration: "1h 45m", fare: 75, frequency: "Every 1 hour" },
  ];

  const handleSearchRoutes = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setShowRoutes(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleBookNow = (route) => {
    setBookingDetails(route);
    setShowBookingModal(true);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'find_route':
        return (
          !showRoutes ? (
            <form onSubmit={handleSearchRoutes} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-stone-700 font-semibold mb-2">{lang.fromLocation}</label>
                  <input type="text" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500" required />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-2">{lang.toLocation}</label>
                  <input type="text" value={toLocation} onChange={(e) => setToLocation(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500" required />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-stone-700 font-semibold mb-2">{lang.travelDate}</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 shadow-md disabled:opacity-50 flex items-center justify-center space-x-2">
                {isLoading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <span>🔍</span>}
                <span>{isLoading ? lang.searching : lang.searchRoutes}</span>
              </button>
            </form>
          ) : (
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in">
              <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">{lang.availableRoutes}</h3>
              <div className="space-y-4 mb-6">
                {availableRoutes.map((route, index) => (
                  <RouteCard key={index} route={route} onBookNow={handleBookNow} lang={lang} />
                ))}
              </div>
              <button onClick={() => setShowRoutes(false)} className="w-full bg-stone-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-stone-700">
                🔍 {lang.searchAgain}
              </button>
            </div>
          )
        );
      case 'live_tracking':
        return (
          <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in">
            <h3 className="text-xl font-bold text-stone-800 mb-4">{lang.liveBusTracking}</h3>
            <p className="text-stone-600 mb-4 text-sm">{lang.liveBusHint}</p>
            <input type="text" className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500 mb-4" placeholder={lang.busNumberPlaceholder} />
            <button className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700">{lang.trackBus}</button>
          </div>
        );
      case 'buy_pass':
        return (
          <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in">
            <h3 className="text-xl font-bold text-stone-800 mb-4">{lang.buyPass}</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border"><span>{lang.dailyPass}</span> <span className="font-bold">₹50</span></div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border"><span>{lang.weeklyPass}</span> <span className="font-bold">₹250</span></div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border"><span>{lang.monthlyPass}</span> <span className="font-bold">₹800</span></div>
            </div>
            <button className="w-full mt-4 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700">{lang.proceedToBuy}</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif] text-stone-800">
      {showBookingModal && <BookingModal route={bookingDetails} onClose={() => setShowBookingModal(false)} lang={lang} />}

      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">🚌</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">{lang.portalTitle}</h1>
                <p className="text-stone-600 text-sm">{lang.portalSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
               <button onClick={toggleLanguage} className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-800">
                {language === 'en' ? lang.changeToHindi : lang.changeToEnglish}
              </button>
              <Link href="/">
                <button className="px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 shadow-sm">
                  {lang.backToHome}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md border border-stone-200 p-8">
          <div className="border-b border-stone-200 mb-6">
            <nav className="flex space-x-4">
              <button onClick={() => setActiveTab('find_route')} className={`py-2 px-4 font-semibold ${activeTab === 'find_route' ? 'border-b-2 border-red-600 text-red-600' : 'text-stone-500'}`}>{lang.findRoute}</button>
              <button onClick={() => setActiveTab('live_tracking')} className={`py-2 px-4 font-semibold ${activeTab === 'live_tracking' ? 'border-b-2 border-red-600 text-red-600' : 'text-stone-500'}`}>{lang.liveTracking}</button>
              <button onClick={() => setActiveTab('buy_pass')} className={`py-2 px-4 font-semibold ${activeTab === 'buy_pass' ? 'border-b-2 border-red-600 text-red-600' : 'text-stone-500'}`}>{lang.buyPass}</button>
            </nav>
          </div>
          {renderContent()}
        </div>
      </main>

      <footer className="bg-stone-800 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-stone-400 text-sm">{lang.rightsReserved}</p>
        </div>
      </footer>
    </div>
  );
}
