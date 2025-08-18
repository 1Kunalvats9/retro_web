"use client";

import React, { useState } from "react";

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Citizen Benefits",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    allSchemes: "All Schemes",
    checkStatus: "Check Status",
    benefit: "Benefit:",
    eligibility: "Eligibility:",
    apply: "Apply",
    applyForScheme: "Apply for",
    applicationModalText: "You are about to start the application process. Please ensure you have all required documents ready.",
    cancel: "Cancel",
    proceedToApplication: "Proceed",
    applicationId: "Application ID:",
    checking: "Checking...",
    statusFor: "Status for",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    changeToHindi: "हिंदी",
    changeToEnglish: "English",
  },
  hi: {
    portalTitle: "यूपीएम नागरिक लाभ",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    allSchemes: "सभी योजनाएं",
    checkStatus: "स्थिति जांचें",
    benefit: "लाभ:",
    eligibility: "पात्रता:",
    apply: "आवेदन करें",
    applyForScheme: "के लिए आवेदन करें",
    applicationModalText: "आप आवेदन प्रक्रिया शुरू करने वाले हैं। कृपया सुनिश्चित करें कि आपके पास सभी आवश्यक दस्तावेज तैयार हैं।",
    cancel: "रद्द करें",
    proceedToApplication: "आगे बढ़ें",
    applicationId: "आवेदन आईडी:",
    checking: "जाँच हो रही है...",
    statusFor: "के लिए स्थिति",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    changeToEnglish: "English",
    changeToHindi: "हिंदी",
  },
};

// --- Helper Components ---
const LoadingSpinner = () => <div className="spinner"></div>;

// --- Content View Components ---

const AllSchemesView = ({ lang, schemes, onApply }) => (
  <div>
    <p>Explore and apply for available citizen benefit schemes.</p>
    <div className="sunken-panel">
      {schemes.map((scheme, index) => (
        <div key={index} className="flex items-start justify-between p-2 border-b border-gray-300">
          <div className="flex-grow">
            <p className="font-bold"><span>{scheme.icon}</span> {scheme.name}</p>
            <p className="text-xs"><b>{lang.benefit}</b> {scheme.benefit}</p>
            <p className="text-xs"><b>{lang.eligibility}</b> {scheme.eligibility}</p>
          </div>
          <button onClick={() => onApply(scheme)} className="btn-sm ml-2">{lang.apply}</button>
        </div>
      ))}
    </div>
  </div>
);

const CheckStatusView = ({ lang }) => {
  const [applicationId, setApplicationId] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckStatus = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setApplicationStatus({
        id: applicationId,
        status: "Under Review",
        message: "Your application is being verified. Please check back in 5-7 working days."
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <form onSubmit={handleCheckStatus}>
        <div className="field-row-stacked">
          <label htmlFor="app-id">{lang.applicationId}</label>
          <input id="app-id" type="text" value={applicationId} onChange={(e) => setApplicationId(e.target.value)} required />
        </div>
        <section className="field-row" style={{ justifyContent: 'flex-end' }}>
          <button type="submit" disabled={isLoading} className="min-w-[120px]">
            {isLoading ? <LoadingSpinner /> : lang.checkStatus}
          </button>
        </section>
      </form>
      {applicationStatus && (
        <fieldset className="mt-3">
          <legend>{lang.statusFor} {applicationStatus.id}</legend>
          <p><b>Status:</b> {applicationStatus.status}</p>
          <p className="text-sm">{applicationStatus.message}</p>
        </fieldset>
      )}
    </div>
  );
};

// --- Main Page Component ---
export default function CitizenBenefitsPage() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('schemes');
  const [showModal, setShowModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const lang = translations[language];

  const schemesData = {
    en: [
      { icon: "🎓", name: "Education Scholarship", benefit: "₹25,000/year for higher education.", eligibility: "Students with 75%+ marks." },
      { icon: "🏥", name: "Health Insurance", benefit: "Up to ₹5,00,000 medical coverage.", eligibility: "All citizens below poverty line." },
      { icon: "🏠", name: "Housing Scheme", benefit: "Interest subsidy on home loans.", eligibility: "First-time home buyers." },
      { icon: "👩‍🌾", name: "Farmer Support", benefit: "₹6,000/year income support.", eligibility: "Land-holding farmers." },
    ],
    hi: [
      { icon: "🎓", name: "शिक्षा छात्रवृत्ति", benefit: "उच्च शिक्षा के लिए प्रति वर्ष ₹25,000।", eligibility: "75%+ अंकों वाले छात्र।" },
      { icon: "🏥", name: "स्वास्थ्य बीमा", benefit: "₹5,00,000 तक का मेडिकल कवरेज।", eligibility: "गरीबी रेखा से नीचे के सभी नागरिक।" },
      { icon: "🏠", name: "आवास योजना", benefit: "होम लोन पर ब्याज सब्सिडी।", eligibility: "पहली बार घर खरीदने वाले।" },
      { icon: "👩‍🌾", name: "किसान सहायता", benefit: "प्रति वर्ष ₹6,000 की आय सहायता।", eligibility: "भूमि-धारक किसान।" },
    ]
  };

  const handleApply = (scheme) => {
    setSelectedScheme(scheme);
    setShowModal(true);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  const iconUrl = (name) => `https://placehold.co/16x16/d4d0c8/000000?text=${name.charAt(0)}`;

  const renderActiveView = () => {
    switch (activeTab) {
      case 'schemes': return <AllSchemesView lang={lang} schemes={schemesData[language]} onApply={handleApply} />;
      case 'status': return <CheckStatusView lang={lang} />;
      default: return <AllSchemesView lang={lang} schemes={schemesData[language]} onApply={handleApply} />;
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
                  <img src={iconUrl("B")} alt="UPM Benefits Logo" className="title-bar-icon" />
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
                    <button role="tab" aria-selected={activeTab === 'schemes'} onClick={() => setActiveTab('schemes')} className="btn-tab">{lang.allSchemes}</button>
                    <button role="tab" aria-selected={activeTab === 'status'} onClick={() => setActiveTab('status')} className="btn-tab">{lang.checkStatus}</button>
                  </div>
                  <div className="p-2">
                    {renderActiveView()}
                  </div>
                </div>
              </main>

              <footer className="status-bar">
                <p className="status-bar-field">UPM Citizen Benefits</p>
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
      
      {showModal && (
        <div className="modal-overlay">
          <div className="window modal-window">
            <div className="title-bar"><div className="title-bar-text">{lang.applyForScheme} {selectedScheme.name}</div></div>
            <div className="window-body">
              <p>{lang.applicationModalText}</p>
              <section className="field-row mt-3" style={{ justifyContent: 'flex-end' }}>
                <button onClick={() => setShowModal(false)}>{lang.cancel}</button>
                <button onClick={() => { alert('Redirecting...'); setShowModal(false); }} className="ml-2">{lang.proceedToApplication}</button>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
