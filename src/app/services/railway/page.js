"use client";

import React, { useState } from "react";
import Link from 'next/link';
// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Railway Services",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    findTrain: "Find Train",
    pnrStatus: "PNR Status",
    liveStatus: "Live Status",
    fromStation: "From Station",
    toStation: "To Station",
    travelDate: "Travel Date",
    searching: "Searching...",
    searchTrains: "Search Trains",
    availableTrains: "Available Trains",
    searchAgain: "Search Again",
    bookNow: "Book Now",
    checkPnrStatus: "Check PNR Status",
    pnrStatusHint: "Enter your 10-digit PNR number to check your booking status.",
    pnrPlaceholder: "Enter PNR Number",
    checkStatus: "Check Status",
    liveTrainStatus: "Live Train Status",
    liveStatusHint: "Enter the train number to track its real-time location.",
    trainNumberPlaceholder: "Enter Train Number",
    trackTrain: "Track Train",
    confirmBooking: "Confirm Your Booking",
    trainLabel: "Train:",
    routeLabel: "Route:",
    fareLabel: "Fare:",
    cancel: "Cancel",
    confirmAndPay: "Confirm & Pay",
    bookingConfirmed: "Booking Confirmed!",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    changeToHindi: "हिंदी में",
  },
  hi: {
    portalTitle: "यूपीएम रेलवे सेवाएं",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    findTrain: "ट्रेन खोजें",
    pnrStatus: "पीएनआर स्थिति",
    liveStatus: "लाइव स्थिति",
    fromStation: "से स्टेशन",
    toStation: "तक स्टेशन",
    travelDate: "यात्रा की तारीख",
    searching: "खोज हो रही है...",
    searchTrains: "ट्रेन खोजें",
    availableTrains: "उपलब्ध ट्रेनें",
    searchAgain: "फिर से खोजें",
    bookNow: "अभी बुक करें",
    checkPnrStatus: "पीएनआर स्थिति जांचें",
    pnrStatusHint: "अपनी बुकिंग स्थिति जांचने के लिए अपना 10 अंकों का पीएनआर नंबर दर्ज करें।",
    pnrPlaceholder: "पीएनआर नंबर दर्ज करें",
    checkStatus: "स्थिति जांचें",
    liveTrainStatus: "लाइव ट्रेन स्थिति",
    liveStatusHint: "वास्तविक समय में ट्रेन का स्थान ट्रैक करने के लिए ट्रेन नंबर दर्ज करें।",
    trainNumberPlaceholder: "ट्रेन नंबर दर्ज करें",
    trackTrain: "ट्रेन ट्रैक करें",
    confirmBooking: "अपनी बुकिंग की पुष्टि करें",
    trainLabel: "ट्रेन:",
    routeLabel: "मार्ग:",
    fareLabel: "किराया:",
    cancel: "रद्द करें",
    confirmAndPay: "पुष्टि करें और भुगतान करें",
    bookingConfirmed: "बुकिंग की पुष्टि हो गई!",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    changeToEnglish: "English",
  },
};


// --- Helper Components ---

const TrainCard = ({ train, onBookNow, lang }) => (
  <div className="bg-white border border-stone-200 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-indigo-600 font-bold">🚂 {train.name}</span>
          <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${train.typeColor}`}>
            {train.type}
          </span>
        </div>
        <div className="text-sm text-stone-600">
          <div className="flex items-center space-x-2 mb-1">
            <span>📍 {train.from}</span>
            <span className="text-indigo-500 font-bold">→</span>
            <span>📍 {train.to}</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-stone-500">
            <span>⏰ {train.duration}</span>
            <span>💰 ₹{train.fare}</span>
            <span>🕐 Departs: {train.departs}</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => onBookNow(train)}
        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm w-full sm:w-auto"
      >
        {lang.bookNow}
      </button>
    </div>
  </div>
);

const BookingModal = ({ train, onClose, lang }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl text-left">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">{lang.confirmBooking}</h2>
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg mb-6 space-y-2">
                <p><span className="font-semibold">{lang.trainLabel}</span> {train.name}</p>
                <p><span className="font-semibold">{lang.routeLabel}</span> {train.from} to {train.to}</p>
                <p><span className="font-semibold">{lang.fareLabel}</span> ₹{train.fare}</p>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onClose}
                    className="flex-1 bg-stone-200 text-stone-800 font-semibold py-3 px-4 rounded-lg hover:bg-stone-300 transition-colors"
                >
                    {lang.cancel}
                </button>
                <button
                    onClick={() => { alert(lang.bookingConfirmed); onClose(); }}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                    {lang.confirmAndPay}
                </button>
            </div>
        </div>
    </div>
);


export default function RailwayServicesPage() {
  const [fromStation, setFromStation] = useState("Susland");
  const [toStation, setToStation] = useState("Coastal City");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showTrains, setShowTrains] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('find_train');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [language, setLanguage] = useState('en');

  const lang = translations[language];

  const availableTrains = [
    { name: "UPM Express", type: "Express", typeColor: "bg-green-100 text-green-700", from: fromStation, to: toStation, duration: "4h 30m", fare: 120, departs: "6:00 AM" },
    { name: "Coastal Link", type: "Passenger", typeColor: "bg-blue-100 text-blue-700", from: fromStation, to: toStation, duration: "6h 15m", fare: 85, departs: "2:30 PM" },
    { name: "Susland Special", type: "Premium", typeColor: "bg-purple-100 text-purple-700", from: fromStation, to: toStation, duration: "3h 45m", fare: 180, departs: "8:00 PM" },
  ];

  const handleSearchTrains = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setShowTrains(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleBookNow = (train) => {
    setBookingDetails(train);
    setShowBookingModal(true);
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'find_train':
        return (
          !showTrains ? (
            <form onSubmit={handleSearchTrains} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-stone-700 font-semibold mb-2">{lang.fromStation}</label>
                  <input type="text" value={fromStation} onChange={(e) => setFromStation(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500" required />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-2">{lang.toStation}</label>
                  <input type="text" value={toStation} onChange={(e) => setToStation(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500" required />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-stone-700 font-semibold mb-2">{lang.travelDate}</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 shadow-md disabled:opacity-50 flex items-center justify-center space-x-2">
                {isLoading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <span>🔍</span>}
                <span>{isLoading ? lang.searching : lang.searchTrains}</span>
              </button>
            </form>
          ) : (
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in">
              <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">{lang.availableTrains}</h3>
              <div className="space-y-4 mb-6">
                {availableTrains.map((train, index) => (
                  <TrainCard key={index} train={train} onBookNow={handleBookNow} lang={lang} />
                ))}
              </div>
              <button onClick={() => setShowTrains(false)} className="w-full bg-stone-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-stone-700">
                🔍 {lang.searchAgain}
              </button>
            </div>
          )
        );
      case 'pnr_status':
        return (
          <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-stone-800 mb-4">{lang.checkPnrStatus}</h3>
            <p className="text-stone-600 mb-4 text-sm">{lang.pnrStatusHint}</p>
            <input type="text" className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500 mb-4" placeholder={lang.pnrPlaceholder} />
            <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700">{lang.checkStatus}</button>
          </div>
        );
      case 'live_status':
        return (
          <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-stone-800 mb-4">{lang.liveTrainStatus}</h3>
            <p className="text-stone-600 mb-4 text-sm">{lang.liveStatusHint}</p>
            <input type="text" className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500 mb-4" placeholder={lang.trainNumberPlaceholder} />
            <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700">{lang.trackTrain}</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif] text-stone-800">
      {showBookingModal && <BookingModal train={bookingDetails} onClose={() => setShowBookingModal(false)} lang={lang} />}

      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">🚂</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">{lang.portalTitle}</h1>
                <p className="text-stone-600 text-sm">{lang.portalSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
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
              <button onClick={() => setActiveTab('find_train')} className={`py-2 px-4 font-semibold ${activeTab === 'find_train' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-stone-500'}`}>{lang.findTrain}</button>
              <button onClick={() => setActiveTab('pnr_status')} className={`py-2 px-4 font-semibold ${activeTab === 'pnr_status' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-stone-500'}`}>{lang.pnrStatus}</button>
              <button onClick={() => setActiveTab('live_status')} className={`py-2 px-4 font-semibold ${activeTab === 'live_status' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-stone-500'}`}>{lang.liveStatus}</button>
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
