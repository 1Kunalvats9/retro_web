"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Government Portal",
    portalSubtitle: "The United Pingdom of MINET",
    signIn: "Sign In",
    createAccount: "Create Account",
    welcomeUser: "Welcome,",
    signOut: "Sign Out",
    heroTitle: "Welcome to UPM Digital Services",
    heroSubtitle: "Your trusted gateway to government services. Access essentials with security and ease.",
    servicesTitle: "Government Services",
    servicesSubtitle: "Click on any service below to get started",
    getStarted: "Get Started",
    newsTitle: "Latest Updates",
    newsSubtitle: "Stay informed about government services and announcements",
    news1: "Citizen ID verification system now available online.",
    news2: "Electricity bill payment portal upgraded for better security.",
    news3: "System maintenance scheduled for Sunday 2AM-4AM.",
    footerTitle: "UPM Government",
    footerSlogan: "Building trust through digital innovation since 1999.",
    quickLinks: "Quick Links",
    aboutUpm: "About UPM",
    contactOfficials: "Contact Officials",
    helpSupport: "Help & Support",
    services: "Services",
    billsPayments: "Bills & Payments",
    documents: "Documents",
    schemes: "Schemes",
    contactInfo: "Contact Info",
    address: "Government Complex, Susland",
    phone: "1-800-UPM-HELP",
    email: "digital@upm.gov.minet",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    loginTitle: "Welcome Back",
    loginSubtitle: "Sign in to your account",
    usernameLabel: "Username",
    passwordLabel: "Password",
    cancel: "Cancel",
    signupTitle: "Create Account",
    signupSubtitle: "Join thousands of UPM citizens online",
    loginSuccess: "Welcome back!",
    loginError: "Invalid username or password.",
    signupSuccess: "Account created! You can now sign in.",
    signupError: "Username already exists.",
    logoutMessage: "You have been logged out.",
    changeToHindi: "हिंदी में",
  },
  hi: {
    portalTitle: "यूपीएम सरकारी पोर्टल",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    signIn: "साइन इन करें",
    createAccount: "खाता बनाएं",
    welcomeUser: "आपका स्वागत है,",
    signOut: "साइन आउट करें",
    heroTitle: "यूपीएम डिजिटल सेवाओं में आपका स्वागत है",
    heroSubtitle: "सरकारी सेवाओं के लिए आपका विश्वसनीय प्रवेश द्वार। सुरक्षा और आसानी से आवश्यक सेवाओं तक पहुँचें।",
    servicesTitle: "सरकारी सेवाएँ",
    servicesSubtitle: "शुरू करने के लिए नीचे दी गई किसी भी सेवा पर क्लिक करें",
    getStarted: "शुरू करें",
    newsTitle: "नवीनतम अपडेट",
    newsSubtitle: "सरकारी सेवाओं और घोषणाओं के बारे में सूचित रहें",
    news1: "नागरिक आईडी सत्यापन प्रणाली अब ऑनलाइन उपलब्ध है।",
    news2: "बेहतर सुरक्षा के लिए बिजली बिल भुगतान पोर्टल को अपग्रेड किया गया।",
    news3: "सिस्टम रखरखाव रविवार को सुबह 2 बजे से 4 बजे तक निर्धारित है।",
    footerTitle: "यूपीएम सरकार",
    footerSlogan: "1999 से डिजिटल नवाचार के माध्यम से विश्वास का निर्माण।",
    quickLinks: "त्वरित लिंक्स",
    aboutUpm: "यूपीएम के बारे में",
    contactOfficials: "अधिकारियों से संपर्क करें",
    helpSupport: "सहायता और समर्थन",
    services: "सेवाएं",
    billsPayments: "बिल और भुगतान",
    documents: "दस्तावेज़",
    schemes: "योजनाएं",
    contactInfo: "संपर्क जानकारी",
    address: "सरकारी परिसर, ससलैंड",
    phone: "1-800-यूपीएम-हेल्प",
    email: "digital@upm.gov.minet",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    loginTitle: "वापसी पर स्वागत है",
    loginSubtitle: "अपने खाते में साइन इन करें",
    usernameLabel: "उपयोगकर्ता नाम",
    passwordLabel: "पासवर्ड",
    cancel: "रद्द करें",
    signupTitle: "खाता बनाएं",
    signupSubtitle: "हजारों यूपीएम नागरिकों से ऑनलाइन जुड़ें",
    loginSuccess: "वापसी पर स्वागत है!",
    loginError: "अमान्य उपयोगकर्ता नाम या पासवर्ड।",
    signupSuccess: "खाता बन गया! अब आप साइन इन कर सकते हैं।",
    signupError: "उपयोगकर्ता नाम पहले से मौजूद है।",
    logoutMessage: "आपको लॉग आउट कर दिया गया है।",
    changeToEnglish: "English",
  },
};

// --- Helper Components (Inlined to ensure functionality) ---

const LoadingSpinner = ({ size = 'md', color = 'white' }) => {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8' };
  const colorClasses = { white: 'border-white', black: 'border-black' };
  return <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 ${colorClasses[color]}`}></div>;
};

const StatusMessage = ({ type, message, onClose }) => {
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg flex items-center space-x-3 z-50 ${typeClasses[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="font-bold text-lg">&times;</button>
    </div>
  );
};

// --- Main Service Card Component ---

const ServiceCard = ({ icon, name, description, color, path, lang }) => {
  const colorClasses = {
    yellow: { bg: "from-yellow-50 via-amber-50", iconBg: "bg-yellow-100", iconText: "text-yellow-600" },
    blue: { bg: "from-blue-50 via-sky-50", iconBg: "bg-blue-100", iconText: "text-blue-600" },
    purple: { bg: "from-purple-50 via-fuchsia-50", iconBg: "bg-purple-100", iconText: "text-purple-600" },
    green: { bg: "from-green-50 via-emerald-50", iconBg: "bg-green-100", iconText: "text-green-600" },
    red: { bg: "from-red-50 via-rose-50", iconBg: "bg-red-100", iconText: "text-red-600" },
    indigo: { bg: "from-indigo-50 via-violet-50", iconBg: "bg-indigo-100", iconText: "text-indigo-600" },
  };
  const selectedColor = colorClasses[color] || colorClasses.yellow;

  return (
    <a href={path} className={`block relative p-6 bg-gradient-to-br ${selectedColor.bg} to-stone-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group border border-stone-200/50`}>
      <div className="relative z-10">
        <div className={`w-16 h-16 ${selectedColor.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
          <span className={`text-3xl ${selectedColor.iconText}`}>{icon}</span>
        </div>
        <h4 className="text-xl font-bold text-stone-800 mb-2">{name}</h4>
        <p className="text-stone-600 mb-4 h-12">{description}</p>
        <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700">
          <span>{lang.getStarted}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  );
};

// --- Home Page Component ---

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]); // In-memory user store
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'

  const lang = translations[language];

  // Check for saved user in localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('upm_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      const foundUser = users.find(u => u.username === username && u.password === password);
      if (foundUser) {
        setCurrentUser(foundUser);
        setIsLoggedIn(true);
        localStorage.setItem('upm_user', JSON.stringify(foundUser));
        setShowLoginModal(false);
        setUsername("");
        setPassword("");
        setStatusMessage({ type: 'success', message: lang.loginSuccess });
      } else {
        setStatusMessage({ type: 'error', message: lang.loginError });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      if (users.some(u => u.username === username)) {
        setStatusMessage({ type: 'error', message: lang.signupError });
      } else {
        const newUser = { username, password };
        setUsers([...users, newUser]);
        setShowSignupModal(false);
        setUsername("");
        setPassword("");
        setStatusMessage({ type: 'success', message: lang.signupSuccess });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('upm_user');
    setStatusMessage({ type: 'info', message: lang.logoutMessage });
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  const servicesData = {
    en: [
      { name: "Electricity Services", icon: "⚡", path: "/services/electricity", color: "yellow", description: "Pay bills, check consumption, and report outages." },
      { name: "Water & Sanitation", icon: "💧", path: "/services/water", color: "blue", description: "Manage water billing and submit maintenance requests." },
      { name: "Education Portal", icon: "📚", path: "/services/education", color: "purple", description: "Access student records and apply for scholarships." },
      { name: "Citizen Benefits", icon: "📋", path: "/services/schemes", color: "green", description: "Explore social schemes and various welfare programs." },
      { name: "Public Transport", icon: "🚌", path: "/services/transport", color: "red", description: "Find bus schedules and detailed route information." },
      { name: "Railway Services", icon: "🚂", path: "/services/railway", color: "indigo", description: "Book tickets for trains and check train schedules." },
    ],
    hi: [
      { name: "बिजली सेवाएं", icon: "⚡", path: "/services/electricity", color: "yellow", description: "बिल भुगतान करें, खपत जांचें, और आउटेज की रिपोर्ट करें।" },
      { name: "जल और स्वच्छता", icon: "💧", path: "/services/water", color: "blue", description: "पानी के बिल का प्रबंधन करें और रखरखाव अनुरोध सबमिट करें।" },
      { name: "शिक्षा पोर्टल", icon: "📚", path: "/services/education", color: "purple", description: "छात्र रिकॉर्ड तक पहुंचें और छात्रवृत्ति के लिए आवेदन करें।" },
      { name: "नागरिक लाभ", icon: "📋", path: "/services/schemes", color: "green", description: "सामाजिक योजनाओं और विभिन्न कल्याणकारी कार्यक्रमों का अन्वेषण करें।" },
      { name: "सार्वजनिक परिवहन", icon: "🚌", path: "/services/transport", color: "red", description: "बस शेड्यूल और विस्तृत मार्ग जानकारी प्राप्त करें।" },
      { name: "रेलवे सेवाएं", icon: "🚂", path: "/services/railway", color: "indigo", description: "ट्रेनों के लिए टिकट बुक करें और ट्रेन शेड्यूल जांचें।" },
    ]
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif] text-stone-800">
      {statusMessage && <StatusMessage type={statusMessage.type} message={statusMessage.message} onClose={() => setStatusMessage(null)} />}

      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">{lang.portalTitle}</h1>
                <p className="text-stone-600 text-sm">{lang.portalSubtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="px-4 py-2 text-sm font-semibold text-amber-600 hover:text-amber-800">
                {language === 'en' ? lang.changeToHindi : lang.changeToEnglish}
              </button>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm"><span className="text-stone-600">{lang.welcomeUser}</span> <span className="font-semibold">{currentUser?.username}</span></div>
                  <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 shadow-sm">🚪 {lang.signOut}</button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowLoginModal(true)} className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 shadow-sm">🔐 {lang.signIn}</button>
                  <button onClick={() => setShowSignupModal(true)} className="px-6 py-2 border-2 border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50">✨ {lang.createAccount}</button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-stone-800 mb-6">{lang.heroTitle}</h2>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">{lang.heroSubtitle}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">{lang.servicesTitle}</h3>
            <p className="text-stone-600 text-lg">{lang.servicesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData[language].map((service, index) => <ServiceCard key={index} {...service} lang={lang} />)}
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">{lang.newsTitle}</h3>
            <p className="text-stone-600 text-lg">{lang.newsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-green-100 text-green-800 font-bold text-sm px-3 py-1 rounded-full">NEW</span>
                <span className="text-stone-400 text-sm">August 17, 2025</span>
              </div>
              <p className="text-stone-700">{lang.news1}</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-100 text-blue-800 font-bold text-sm px-3 py-1 rounded-full">UPDATE</span>
                <span className="text-stone-400 text-sm">August 16, 2025</span>
              </div>
              <p className="text-stone-700">{lang.news2}</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-amber-100 text-amber-800 font-bold text-sm px-3 py-1 rounded-full">NOTICE</span>
                <span className="text-stone-400 text-sm">August 15, 2025</span>
              </div>
              <p className="text-stone-700">{lang.news3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-400">{lang.footerTitle}</h4>
              <p className="text-stone-300 text-sm">{lang.footerSlogan}</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-400">{lang.quickLinks}</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-amber-400">{lang.aboutUpm}</a></li>
                <li><a href="#" className="hover:text-amber-400">{lang.contactOfficials}</a></li>
                <li><a href="#" className="hover:text-amber-400">{lang.helpSupport}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-400">{lang.services}</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-amber-400">{lang.billsPayments}</a></li>
                <li><a href="#" className="hover:text-amber-400">{lang.documents}</a></li>
                <li><a href="#" className="hover:text-amber-400">{lang.schemes}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-400">{lang.contactInfo}</h4>
              <div className="text-stone-300 text-sm space-y-2">
                <p>🏛️ {lang.address}</p>
                <p>📞 {lang.phone}</p>
                <p>📧 {lang.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700 pt-8 text-center">
            <p className="text-stone-400 text-sm">{lang.rightsReserved}</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-stone-800 text-center mb-6">{lang.loginTitle}</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">{lang.usernameLabel}</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black" required />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-2">{lang.passwordLabel}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 flex items-center justify-center">
                {isLoading ? <LoadingSpinner size="sm" /> : lang.signIn}
              </button>
              <button type="button" onClick={() => setShowLoginModal(false)} className="w-full text-stone-600 font-medium">{lang.cancel}</button>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-stone-800 text-center mb-6">{lang.signupTitle}</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-2">{lang.usernameLabel}</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black" required />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-2">{lang.passwordLabel}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 flex items-center justify-center">
                {isLoading ? <LoadingSpinner size="sm" /> : lang.createAccount}
              </button>
              <button type="button" onClick={() => setShowSignupModal(false)} className="w-full text-stone-600 font-medium">{lang.cancel}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
