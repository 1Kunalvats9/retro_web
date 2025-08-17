"use client";

import React, { useState } from "react";
import Link from 'next/link';

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
    learnMoreApply: "Learn More & Apply",
    applyForScheme: "Apply for",
    applicationModalText: "You are about to start the application process for the selected scheme. Please ensure you have all the required documents ready.",
    cancel: "Cancel",
    proceedToApplication: "Proceed to Application",
    applicationId: "Application ID",
    applicationIdPlaceholder: "Enter your application ID",
    checking: "Checking...",
    statusFor: "Status for",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    changeToHindi: "हिंदी में",
  },
  hi: {
    portalTitle: "यूपीएम नागरिक लाभ",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    allSchemes: "सभी योजनाएं",
    checkStatus: "स्थिति जांचें",
    benefit: "लाभ:",
    eligibility: "पात्रता:",
    learnMoreApply: "और जानें और आवेदन करें",
    applyForScheme: "के लिए आवेदन करें",
    applicationModalText: "आप चयनित योजना के लिए आवेदन प्रक्रिया शुरू करने वाले हैं। कृपया सुनिश्चित करें कि आपके पास सभी आवश्यक दस्तावेज तैयार हैं।",
    cancel: "रद्द करें",
    proceedToApplication: "आवेदन के लिए आगे बढ़ें",
    applicationId: "आवेदन आईडी",
    applicationIdPlaceholder: "अपनी आवेदन आईडी दर्ज करें",
    checking: "जाँच हो रही है...",
    statusFor: "के लिए स्थिति",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    changeToEnglish: "English",
  },
};

// --- Helper Components ---

const SchemeCard = ({ scheme, onApply, lang }) => (
  <div className="bg-white border border-stone-200 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <div className="flex-grow">
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-3xl">{scheme.icon}</span>
        <h3 className="text-lg font-bold text-stone-800">{scheme.name}</h3>
      </div>
      <p className="text-sm text-stone-600 mb-2"><span className="font-semibold">{lang.benefit}</span> {scheme.benefit}</p>
      <p className="text-sm text-stone-600"><span className="font-semibold">{lang.eligibility}</span> {scheme.eligibility}</p>
    </div>
    <button 
      onClick={() => onApply(scheme)}
      className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
    >
      {lang.learnMoreApply}
    </button>
  </div>
);

const ApplicationModal = ({ scheme, onClose, lang }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl text-left">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">{lang.applyForScheme} {scheme.name}</h2>
            <p className="text-stone-600 mb-6">{lang.applicationModalText}</p>
            <div className="flex gap-4">
                <button
                    onClick={onClose}
                    className="flex-1 bg-stone-200 text-stone-800 font-semibold py-3 px-4 rounded-lg hover:bg-stone-300 transition-colors"
                >
                    {lang.cancel}
                </button>
                <button
                    onClick={() => { alert('Redirecting to application page...'); onClose(); }}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                    {lang.proceedToApplication}
                </button>
            </div>
        </div>
    </div>
);


export default function CitizenBenefitsPage() {
  const [activeTab, setActiveTab] = useState('all_schemes');
  const [applicationId, setApplicationId] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [language, setLanguage] = useState('en');

  const lang = translations[language];

  const schemesData = {
    en: [
      { icon: "🎓", name: "Education Scholarship", benefit: "₹25,000 per year for higher education.", eligibility: "Students with 75%+ marks." },
      { icon: "🏥", name: "Health Insurance", benefit: "Up to ₹5,00,000 medical coverage.", eligibility: "All citizens below poverty line." },
      { icon: "🏠", name: "Housing Scheme", benefit: "Interest subsidy on home loans.", eligibility: "First-time home buyers." },
      { icon: "👩‍🌾", name: "Farmer Support", benefit: "₹6,000 per year income support.", eligibility: "Land-holding farmers." },
    ],
    hi: [
      { icon: "🎓", name: "शिक्षा छात्रवृत्ति", benefit: "उच्च शिक्षा के लिए प्रति वर्ष ₹25,000।", eligibility: "75%+ अंकों वाले छात्र।" },
      { icon: "🏥", name: "स्वास्थ्य बीमा", benefit: "₹5,00,000 तक का मेडिकल कवरेज।", eligibility: "गरीबी रेखा से नीचे के सभी नागरिक।" },
      { icon: "🏠", name: "आवास योजना", benefit: "होम लोन पर ब्याज सब्सिडी।", eligibility: "पहली बार घर खरीदने वाले।" },
      { icon: "👩‍🌾", name: "किसान सहायता", benefit: "प्रति वर्ष ₹6,000 की आय सहायता।", eligibility: "भूमि-धारक किसान।" },
    ]
  };
  
  const handleCheckStatus = (e) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
          setApplicationStatus({
              id: applicationId,
              scheme: "Health Insurance",
              status: "Under Review",
              message: "Your application is currently being verified. Please check back in 5-7 working days."
          });
          setIsLoading(false);
      }, 1500);
  };

  const handleApply = (scheme) => {
      setSelectedScheme(scheme);
      setShowModal(true);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'all_schemes':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {schemesData[language].map((scheme, index) => (
              <SchemeCard key={index} scheme={scheme} onApply={handleApply} lang={lang} />
            ))}
          </div>
        );
      case 'check_status':
        return (
          <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in">
            <form onSubmit={handleCheckStatus}>
              <label className="block text-stone-700 font-semibold mb-2">{lang.applicationId}</label>
              <input 
                type="text" 
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500 mb-4" 
                placeholder={lang.applicationIdPlaceholder}
                required
              />
              <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2">
                {isLoading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <span>📊</span>}
                <span>{isLoading ? lang.checking : lang.checkStatus}</span>
              </button>
            </form>
            {applicationStatus && (
                <div className="mt-6 bg-white border border-stone-200 p-4 rounded-lg">
                    <p><span className="font-semibold">{lang.statusFor} {applicationStatus.id}:</span> <span className="font-bold text-yellow-600">{applicationStatus.status}</span></p>
                    <p className="text-sm text-stone-600">{applicationStatus.message}</p>
                </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif] text-stone-800">
      {showModal && <ApplicationModal scheme={selectedScheme} onClose={() => setShowModal(false)} lang={lang} />}

      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">📋</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">{lang.portalTitle}</h1>
                <p className="text-stone-600 text-sm">{lang.portalSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
               <button onClick={toggleLanguage} className="px-4 py-2 text-sm font-semibold text-green-600 hover:text-green-800">
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
              <button onClick={() => setActiveTab('all_schemes')} className={`py-2 px-4 font-semibold ${activeTab === 'all_schemes' ? 'border-b-2 border-green-600 text-green-600' : 'text-stone-500'}`}>{lang.allSchemes}</button>
              <button onClick={() => setActiveTab('check_status')} className={`py-2 px-4 font-semibold ${activeTab === 'check_status' ? 'border-b-2 border-green-600 text-green-600' : 'text-stone-500'}`}>{lang.checkStatus}</button>
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
