"use client";

import React, { useState } from "react";

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Public Transport",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    findRoute: "Find Route",
    liveTracking: "Live Tracking",
    buyPass: "Buy a Pass",
    fromLocation: "From Location:",
    toLocation: "To Location:",
    travelDate: "Travel Date:",
    searching: "Searching...",
    searchRoutes: "Search Routes",
    availableRoutes: "Available Routes",
    searchAgain: "Search Again",
    bookNow: "Book Now",
    liveBusTracking: "Live Bus Tracking",
    busNumber: "Bus Number:",
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
    changeToHindi: "हिंदी",
    changeToEnglish: "English",
  },
  hi: {
    portalTitle: "यूपीएम सार्वजनिक परिवहन",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    findRoute: "मार्ग खोजें",
    liveTracking: "लाइव ट्रैकिंग",
    buyPass: "पास खरीदें",
    fromLocation: "से स्थान:",
    toLocation: "तक स्थान:",
    travelDate: "यात्रा की तारीख:",
    searching: "खोज हो रही है...",
    searchRoutes: "मार्ग खोजें",
    availableRoutes: "उपलब्ध मार्ग",
    searchAgain: "फिर से खोजें",
    bookNow: "अभी बुक करें",
    liveBusTracking: "लाइव बस ट्रैकिंग",
    busNumber: "बस नंबर:",
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
    changeToHindi: "हिंदी",
  },
};

// --- Helper Components ---
const LoadingSpinner = () => <div className="spinner"></div>;

// --- Content View Components ---

const FindRouteView = ({ lang }) => {
  const [fromLocation, setFromLocation] = useState("City Center");
  const [toLocation, setToLocation] = useState("Airport");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showRoutes, setShowRoutes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const availableRoutes = [
    { name: "Route 101", from: fromLocation, to: toLocation, fare: 45 },
    { name: "Route 203", from: fromLocation, to: toLocation, fare: 25 },
    { name: "Route 156", from: fromLocation, to: toLocation, fare: 75 },
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

  return (
    <>
      {!showRoutes ? (
        <form onSubmit={handleSearchRoutes}>
          <div className="field-row-stacked">
            <label htmlFor="from-location">{lang.fromLocation}</label>
            <input id="from-location" type="text" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} required />
          </div>
          <div className="field-row-stacked">
            <label htmlFor="to-location">{lang.toLocation}</label>
            <input id="to-location" type="text" value={toLocation} onChange={(e) => setToLocation(e.target.value)} required />
          </div>
          <div className="field-row-stacked">
            <label htmlFor="travel-date">{lang.travelDate}</label>
            <input id="travel-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <section className="field-row" style={{ justifyContent: 'flex-end' }}>
            <button type="submit" disabled={isLoading} className="min-w-[120px]">
              {isLoading ? <LoadingSpinner /> : lang.searchRoutes}
            </button>
          </section>
        </form>
      ) : (
        <div>
          <p><b>{lang.availableRoutes}</b> for {fromLocation} to {toLocation}</p>
          <div className="sunken-panel">
            {availableRoutes.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-2 border-b border-gray-300">
                <span>🚌 {route.name} - ₹{route.fare}</span>
                <button onClick={() => handleBookNow(route)} className="btn-sm">{lang.bookNow}</button>
              </div>
            ))}
          </div>
          <section className="field-row mt-2" style={{ justifyContent: 'flex-end' }}>
            <button onClick={() => setShowRoutes(false)}>{lang.searchAgain}</button>
          </section>
        </div>
      )}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="window modal-window">
            <div className="title-bar"><div className="title-bar-text">{lang.confirmTicket}</div></div>
            <div className="window-body">
              <p><b>{lang.routeLabel}</b> {bookingDetails.name}</p>
              <p><b>{lang.journeyLabel}</b> {bookingDetails.from} → {bookingDetails.to}</p>
              <p><b>{lang.fareLabel}</b> ₹{bookingDetails.fare}</p>
              <section className="field-row mt-3" style={{ justifyContent: 'flex-end' }}>
                <button onClick={() => setShowBookingModal(false)}>{lang.cancel}</button>
                <button onClick={() => { alert(lang.ticketBooked); setShowBookingModal(false); }} className="ml-2">{lang.confirmAndPay}</button>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const LiveTrackingView = ({ lang }) => (
  <form>
    <div className="field-row-stacked">
      <label htmlFor="bus-number">{lang.busNumber}</label>
      <input id="bus-number" type="text" />
    </div>
    <section className="field-row" style={{ justifyContent: 'flex-end' }}>
      <button type="submit">{lang.trackBus}</button>
    </section>
  </form>
);

const BuyPassView = ({ lang }) => (
  <div>
    <div className="sunken-panel p-2">
      <div className="flex justify-between items-center p-2 border-b border-gray-300"><span>{lang.dailyPass}</span> <b>₹50</b></div>
      <div className="flex justify-between items-center p-2 border-b border-gray-300"><span>{lang.weeklyPass}</span> <b>₹250</b></div>
      <div className="flex justify-between items-center p-2"><span>{lang.monthlyPass}</span> <b>₹800</b></div>
    </div>
    <section className="field-row mt-2" style={{ justifyContent: 'flex-end' }}>
      <button>{lang.proceedToBuy}</button>
    </section>
  </div>
);

// --- Main Page Component ---
export default function TransportServicesPage() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('find');

  const lang = translations[language];

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  const iconUrl = (name) => `https://placehold.co/16x16/d4d0c8/000000?text=${name.charAt(0)}`;

  const renderActiveView = () => {
    switch (activeTab) {
      case 'find': return <FindRouteView lang={lang} />;
      case 'live': return <LiveTrackingView lang={lang} />;
      case 'pass': return <BuyPassView lang={lang} />;
      default: return <FindRouteView lang={lang} />;
    }
  };

  return (
    <div className="desktop-background">
      <div className="crt-monitor">
        <div className="monitor-bezel">
          <div className="monitor-screen">
            <div className="container-wrapper">
              <header className="title-bar">
                <div className="title-bar-text">
                  <img src={iconUrl("T")} alt="UPM Transport Logo" className="title-bar-icon" />
                  {lang.portalTitle} - {lang.portalSubtitle}
                </div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize" disabled></button>
                  <button aria-label="Maximize" disabled></button>
                  <button aria-label="Close" disabled></button>
                </div>
              </header>

              <div className="toolbar">
                <a href="/" className="btn btn-sm">
                  <img src={iconUrl("H")} alt="" /> {lang.backToHome}
                </a>
                <button onClick={toggleLanguage} className="lang-toggle">
                  <img src={iconUrl("G")} alt="" />
                  {language === 'en' ? lang.changeToHindi : lang.changeToEnglish}
                </button>
              </div>

              <main className="window-body">
                <div className="sunken-panel p-1">
                  <div role="tablist" className="flex border-b-2 border-gray-500">
                    <button role="tab" aria-selected={activeTab === 'find'} onClick={() => setActiveTab('find')} className="btn-tab">{lang.findRoute}</button>
                    <button role="tab" aria-selected={activeTab === 'live'} onClick={() => setActiveTab('live')} className="btn-tab">{lang.liveTracking}</button>
                    <button role="tab" aria-selected={activeTab === 'pass'} onClick={() => setActiveTab('pass')} className="btn-tab">{lang.buyPass}</button>
                  </div>
                  <div className="p-2">
                    {renderActiveView()}
                  </div>
                </div>
              </main>

              <footer className="status-bar">
                <p className="status-bar-field">UPM Public Transport</p>
                <p className="status-bar-field">{lang.rightsReserved}</p>
                <p className="status-bar-field">
                  <img src={iconUrl("O")} alt="" /> Online
                </p>
              </footer>
            </div>
          </div>
          <div className="monitor-details">
            <span className="monitor-brand">SONY</span>
            <div className="power-button"></div>
            <div className="power-led"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
