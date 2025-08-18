"use client";

import React, { useState } from "react";

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Railway Services",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    findTrain: "Find Train",
    pnrStatus: "PNR Status",
    liveStatus: "Live Status",
    fromStation: "From Station:",
    toStation: "To Station:",
    travelDate: "Travel Date:",
    searching: "Searching...",
    searchTrains: "Search Trains",
    availableTrains: "Available Trains",
    searchAgain: "Search Again",
    bookNow: "Book Now",
    checkPnrStatus: "Check PNR Status",
    pnrNumber: "PNR Number:",
    checkStatus: "Check Status",
    liveTrainStatus: "Live Train Status",
    trainNumber: "Train Number:",
    trackTrain: "Track Train",
    confirmBooking: "Confirm Your Booking",
    trainLabel: "Train:",
    routeLabel: "Route:",
    fareLabel: "Fare:",
    cancel: "Cancel",
    confirmAndPay: "Confirm & Pay",
    bookingConfirmed: "Booking Confirmed!",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    changeToHindi: "हिंदी",
    changeToEnglish: "English",
  },
  hi: {
    portalTitle: "यूपीएम रेलवे सेवाएं",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    findTrain: "ट्रेन खोजें",
    pnrStatus: "पीएनआर स्थिति",
    liveStatus: "लाइव स्थिति",
    fromStation: "से स्टेशन:",
    toStation: "तक स्टेशन:",
    travelDate: "यात्रा की तारीख:",
    searching: "खोज हो रही है...",
    searchTrains: "ट्रेन खोजें",
    availableTrains: "उपलब्ध ट्रेनें",
    searchAgain: "फिर से खोजें",
    bookNow: "अभी बुक करें",
    checkPnrStatus: "पीएनआर स्थिति जांचें",
    pnrNumber: "पीएनआर नंबर:",
    checkStatus: "स्थिति जांचें",
    liveTrainStatus: "लाइव ट्रेन स्थिति",
    trainNumber: "ट्रेन नंबर:",
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
    changeToHindi: "हिंदी",
  },
};

// --- Helper Components ---
const LoadingSpinner = () => <div className="spinner"></div>;

// --- Content View Components ---

const FindTrainView = ({ lang }) => {
  const [fromStation, setFromStation] = useState("Susland");
  const [toStation, setToStation] = useState("Coastal City");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showTrains, setShowTrains] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const availableTrains = [
    { name: "UPM Express", from: fromStation, to: toStation, fare: 120 },
    { name: "Coastal Link", from: fromStation, to: toStation, fare: 85 },
    { name: "Susland Special", from: fromStation, to: toStation, fare: 180 },
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

  return (
    <>
      {!showTrains ? (
        <form onSubmit={handleSearchTrains}>
          <div className="field-row-stacked">
            <label htmlFor="from-station">{lang.fromStation}</label>
            <input id="from-station" type="text" value={fromStation} onChange={(e) => setFromStation(e.target.value)} required />
          </div>
          <div className="field-row-stacked">
            <label htmlFor="to-station">{lang.toStation}</label>
            <input id="to-station" type="text" value={toStation} onChange={(e) => setToStation(e.target.value)} required />
          </div>
          <div className="field-row-stacked">
            <label htmlFor="travel-date">{lang.travelDate}</label>
            <input id="travel-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <section className="field-row" style={{ justifyContent: 'flex-end' }}>
            <button type="submit" disabled={isLoading} className="min-w-[120px]">
              {isLoading ? <LoadingSpinner /> : lang.searchTrains}
            </button>
          </section>
        </form>
      ) : (
        <div>
          <p><b>{lang.availableTrains}</b> for {fromStation} to {toStation}</p>
          <div className="sunken-panel">
            {availableTrains.map((train, index) => (
              <div key={index} className="flex items-center justify-between p-2 border-b border-gray-300">
                <span>� {train.name} - ₹{train.fare}</span>
                <button onClick={() => handleBookNow(train)} className="btn-sm">{lang.bookNow}</button>
              </div>
            ))}
          </div>
          <section className="field-row mt-2" style={{ justifyContent: 'flex-end' }}>
            <button onClick={() => setShowTrains(false)}>{lang.searchAgain}</button>
          </section>
        </div>
      )}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="window modal-window">
            <div className="title-bar"><div className="title-bar-text">{lang.confirmBooking}</div></div>
            <div className="window-body">
              <p><b>{lang.trainLabel}</b> {bookingDetails.name}</p>
              <p><b>{lang.routeLabel}</b> {bookingDetails.from} → {bookingDetails.to}</p>
              <p><b>{lang.fareLabel}</b> ₹{bookingDetails.fare}</p>
              <section className="field-row mt-3" style={{ justifyContent: 'flex-end' }}>
                <button onClick={() => setShowBookingModal(false)}>{lang.cancel}</button>
                <button onClick={() => { alert(lang.bookingConfirmed); setShowBookingModal(false); }} className="ml-2">{lang.confirmAndPay}</button>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PnrStatusView = ({ lang }) => (
  <form>
    <div className="field-row-stacked">
      <label htmlFor="pnr-number">{lang.pnrNumber}</label>
      <input id="pnr-number" type="text" maxLength="10" />
    </div>
    <section className="field-row" style={{ justifyContent: 'flex-end' }}>
      <button type="submit">{lang.checkStatus}</button>
    </section>
  </form>
);

const LiveStatusView = ({ lang }) => (
  <form>
    <div className="field-row-stacked">
      <label htmlFor="train-number">{lang.trainNumber}</label>
      <input id="train-number" type="text" />
    </div>
    <section className="field-row" style={{ justifyContent: 'flex-end' }}>
      <button type="submit">{lang.trackTrain}</button>
    </section>
  </form>
);

// --- Main Page Component ---
export default function RailwayServicesPage() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('find');

  const lang = translations[language];

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  const iconUrl = (name) => `https://placehold.co/16x16/d4d0c8/000000?text=${name.charAt(0)}`;

  const renderActiveView = () => {
    switch (activeTab) {
      case 'find': return <FindTrainView lang={lang} />;
      case 'pnr': return <PnrStatusView lang={lang} />;
      case 'live': return <LiveStatusView lang={lang} />;
      default: return <FindTrainView lang={lang} />;
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
                  <img src={iconUrl("RAIL")} alt="UPM Railway Logo" className="title-bar-icon" />
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
                        <button role="tab" aria-selected={activeTab === 'find'} onClick={() => setActiveTab('find')} className="btn-tab">{lang.findTrain}</button>
                        <button role="tab" aria-selected={activeTab === 'pnr'} onClick={() => setActiveTab('pnr')} className="btn-tab">{lang.pnrStatus}</button>
                        <button role="tab" aria-selected={activeTab === 'live'} onClick={() => setActiveTab('live')} className="btn-tab">{lang.liveStatus}</button>
                    </div>
                    <div className="p-2">
                        {renderActiveView()}
                    </div>
                </div>
              </main>

              <footer className="status-bar">
                <p className="status-bar-field">UPM Railway Services</p>
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
