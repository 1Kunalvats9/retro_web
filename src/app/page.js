"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { 
  LogIn, 
  UserPlus, 
  LogOut, 
  Zap, 
  Droplets, 
  GraduationCap, 
  FileText, 
  Bus, 
  Train,
  Globe,
  Shield,
  Clock,
  Users
} from 'lucide-react';

// Import our retro components
import RetroBackground from '../components/RetroBackground';
import RetroServiceCard from '../components/RetroServiceCard';
import RetroButton from '../components/RetroButton';
import RetroInput from '../components/RetroInput';
import RetroModal from '../components/RetroModal';
import RetroStatusMessage from '../components/RetroStatusMessage';

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM GOVERNMENT PORTAL",
    portalSubtitle: "THE UNITED PINGDOM OF MINET",
    tagline: "DIGITAL SERVICES • YEAR 2000 • CYBER DIVISION",
    signIn: "SIGN IN",
    createAccount: "CREATE ACCOUNT",
    welcomeUser: "WELCOME,",
    signOut: "SIGN OUT",
    heroTitle: "WELCOME TO UPM DIGITAL SERVICES",
    heroSubtitle: "Your trusted gateway to government services. Access essentials with security and ease.",
    servicesTitle: "GOVERNMENT SERVICES",
    servicesSubtitle: "Click on any service below to get started",
    getStarted: "ACCESS",
    newsTitle: "SYSTEM UPDATES",
    newsSubtitle: "Stay informed about government services and announcements",
    news1: "Citizen ID verification system now available online.",
    news2: "Electricity bill payment portal upgraded for better security.",
    news3: "System maintenance scheduled for Sunday 2AM-4AM.",
    footerTitle: "UPM GOVERNMENT",
    footerSlogan: "Building trust through digital innovation since 1999.",
    quickLinks: "QUICK LINKS",
    aboutUpm: "About UPM",
    contactOfficials: "Contact Officials",
    helpSupport: "Help & Support",
    services: "SERVICES",
    billsPayments: "Bills & Payments",
    documents: "Documents",
    schemes: "Schemes",
    contactInfo: "CONTACT INFO",
    address: "Government Complex, Susland",
    phone: "1-800-UPM-HELP",
    email: "digital@upm.gov.minet",
    rightsReserved: "© 1999-2025 UNITED PINGDOM OF MINET - ALL RIGHTS RESERVED",
    loginTitle: "SYSTEM ACCESS",
    loginSubtitle: "Enter your credentials",
    usernameLabel: "USERNAME",
    passwordLabel: "PASSWORD",
    cancel: "CANCEL",
    signupTitle: "CREATE ACCOUNT",
    signupSubtitle: "Join thousands of UPM citizens online",
    loginSuccess: "Access granted! Welcome back.",
    loginError: "Access denied. Invalid credentials.",
    signupSuccess: "Account created! You can now sign in.",
    signupError: "Username already exists.",
    logoutMessage: "You have been logged out.",
    changeToHindi: "हिंदी में",
    onlineUsers: "ONLINE USERS",
    systemStatus: "SYSTEM STATUS",
    lastUpdate: "LAST UPDATE"
  },
  hi: {
    portalTitle: "यूपीएम सरकारी पोर्टल",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    tagline: "डिजिटल सेवाएं • वर्ष 2000 • साइबर डिवीजन",
    signIn: "साइन इन करें",
    createAccount: "खाता बनाएं",
    welcomeUser: "आपका स्वागत है,",
    signOut: "साइन आउट करें",
    heroTitle: "यूपीएम डिजिटल सेवाओं में आपका स्वागत है",
    heroSubtitle: "सरकारी सेवाओं के लिए आपका विश्वसनीय प्रवेश द्वार। सुरक्षा और आसानी से आवश्यक सेवाओं तक पहुँचें।",
    servicesTitle: "सरकारी सेवाएँ",
    servicesSubtitle: "शुरू करने के लिए नीचे दी गई किसी भी सेवा पर क्लिक करें",
    getStarted: "एक्सेस",
    newsTitle: "सिस्टम अपडेट",
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
    loginTitle: "सिस्टम एक्सेस",
    loginSubtitle: "अपनी साख दर्ज करें",
    usernameLabel: "उपयोगकर्ता नाम",
    passwordLabel: "पासवर्ड",
    cancel: "रद्द करें",
    signupTitle: "खाता बनाएं",
    signupSubtitle: "हजारों यूपीएम नागरिकों से ऑनलाइन जुड़ें",
    loginSuccess: "एक्सेस मिल गया! वापसी पर स्वागत है।",
    loginError: "एक्सेस अस्वीकृत। अमान्य साख।",
    signupSuccess: "खाता बन गया! अब आप साइन इन कर सकते हैं।",
    signupError: "उपयोगकर्ता नाम पहले से मौजूद है।",
    logoutMessage: "आपको लॉग आउट कर दिया गया है।",
    changeToEnglish: "English",
    onlineUsers: "ऑनलाइन उपयोगकर्ता",
    systemStatus: "सिस्टम स्थिति",
    lastUpdate: "अंतिम अपडेट"
  },
};

// --- Main Home Component ---
export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('en');
  const [onlineUsers] = useState(1247);
  const [systemStatus] = useState('OPERATIONAL');

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
    <div className="min-h-screen retro-grid relative">
      <RetroBackground />
      
      {statusMessage && (
        <RetroStatusMessage 
          type={statusMessage.type} 
          message={statusMessage.message} 
          onClose={() => setStatusMessage(null)} 
        />
      )}

      {/* Retro Header */}
      <header className="glass-card border-b border-cyan-400/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg neon-border">
                <Globe className="text-white text-2xl glow-text" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white retro-title cyber-glow">
                  {lang.portalTitle}
                </h1>
                <p className="text-cyan-300 text-sm retro-subtitle">
                  {lang.portalSubtitle}
                </p>
                <p className="text-cyan-400/60 text-xs retro-subtitle tracking-widest">
                  {lang.tagline}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* System Status */}
              <div className="hidden md:flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 retro-subtitle">{lang.systemStatus}: {systemStatus}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 retro-subtitle">{lang.onlineUsers}: {onlineUsers.toLocaleString()}</span>
                </div>
              </div>

              <RetroButton 
                onClick={toggleLanguage} 
                variant="ghost" 
                size="sm"
                className="text-xs"
              >
                {language === 'en' ? lang.changeToHindi : lang.changeToEnglish}
              </RetroButton>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-cyan-400 retro-subtitle">{lang.welcomeUser}</span>
                    <span className="font-semibold text-white ml-2 cyber-glow">{currentUser?.username}</span>
                  </div>
                  <RetroButton 
                    onClick={handleLogout} 
                    variant="danger" 
                    size="sm"
                    icon={LogOut}
                  >
                    {lang.signOut}
                  </RetroButton>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <RetroButton 
                    onClick={() => setShowLoginModal(true)} 
                    variant="primary"
                    size="sm"
                    icon={LogIn}
                  >
                    {lang.signIn}
                  </RetroButton>
                  <RetroButton 
                    onClick={() => setShowSignupModal(true)} 
                    variant="secondary"
                    size="sm"
                    icon={UserPlus}
                  >
                    {lang.createAccount}
                  </RetroButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl font-bold text-white mb-6 retro-title cyber-glow slide-in-up">
            {lang.heroTitle}
          </h2>
          <p className="text-xl text-cyan-300 mb-8 max-w-3xl mx-auto retro-subtitle fade-in">
            {lang.heroSubtitle}
          </p>
          
          {/* Status indicators */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 text-sm retro-subtitle">SECURE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 text-sm retro-subtitle">24/7 AVAILABLE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 text-sm retro-subtitle">FAST ACCESS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4 retro-title matrix-glow">
              {lang.servicesTitle}
            </h3>
            <p className="text-cyan-300 text-lg retro-subtitle">
              {lang.servicesSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData[language].map((service, index) => (
              <div key={index} className="slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <RetroServiceCard {...service} lang={lang} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4 retro-title glow-text">
              {lang.newsTitle}
            </h3>
            <p className="text-cyan-300 text-lg retro-subtitle">
              {lang.newsSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'NEW', date: 'August 17, 2025', message: lang.news1, color: 'emerald' },
              { type: 'UPDATE', date: 'August 16, 2025', message: lang.news2, color: 'cyan' },
              { type: 'NOTICE', date: 'August 15, 2025', message: lang.news3, color: 'purple' }
            ].map((news, index) => (
              <div key={index} className="glass-card p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 slide-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`
                    font-bold text-xs px-3 py-1 rounded-full retro-subtitle tracking-wider
                    ${news.color === 'emerald' ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30' : ''}
                    ${news.color === 'cyan' ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : ''}
                    ${news.color === 'purple' ? 'bg-purple-400/20 text-purple-400 border border-purple-400/30' : ''}
                  `}>
                    {news.type}
                  </span>
                  <span className="text-white/60 text-sm retro-subtitle">{news.date}</span>
                </div>
                <p className="text-white/90 retro-subtitle leading-relaxed">{news.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="retro-footer py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-cyan-400 retro-title">
                {lang.footerTitle}
              </h4>
              <p className="text-white/70 text-sm retro-subtitle leading-relaxed">
                {lang.footerSlogan}
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4 text-cyan-400 retro-title">
                {lang.quickLinks}
              </h4>
              <ul className="space-y-2 text-white/70 text-sm retro-subtitle">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{lang.aboutUpm}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{lang.contactOfficials}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{lang.helpSupport}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4 text-cyan-400 retro-title">
                {lang.services}
              </h4>
              <ul className="space-y-2 text-white/70 text-sm retro-subtitle">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{lang.billsPayments}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{lang.documents}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{lang.schemes}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4 text-cyan-400 retro-title">
                {lang.contactInfo}
              </h4>
              <div className="text-white/70 text-sm space-y-2 retro-subtitle">
                <p className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>{lang.address}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>{lang.phone}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>{lang.email}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-cyan-400/20 pt-8 text-center">
            <p className="text-white/60 text-sm retro-subtitle tracking-wider">
              {lang.rightsReserved}
            </p>
            <div className="flex justify-center items-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400/60 text-xs retro-subtitle">
                {lang.lastUpdate}: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <RetroModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        title={lang.loginTitle}
      >
        <p className="text-cyan-300 mb-6 retro-subtitle">{lang.loginSubtitle}</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <RetroInput
            label={lang.usernameLabel}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            icon={LogIn}
          />
          
          <RetroInput
            label={lang.passwordLabel}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            icon={Shield}
          />
          
          <div className="flex gap-4">
            <RetroButton 
              type="submit" 
              disabled={isLoading}
              loading={isLoading}
              variant="primary"
              className="flex-1"
            >
              {lang.signIn}
            </RetroButton>
            <RetroButton 
              type="button" 
              onClick={() => setShowLoginModal(false)}
              variant="ghost"
              className="flex-1"
            >
              {lang.cancel}
            </RetroButton>
          </div>
        </form>
      </RetroModal>

      {/* Signup Modal */}
      <RetroModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        title={lang.signupTitle}
      >
        <p className="text-cyan-300 mb-6 retro-subtitle">{lang.signupSubtitle}</p>
        <form onSubmit={handleSignup} className="space-y-6">
          <RetroInput
            label={lang.usernameLabel}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose username"
            required
            icon={UserPlus}
          />
          
          <RetroInput
            label={lang.passwordLabel}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose password"
            required
            icon={Shield}
          />
          
          <div className="flex gap-4">
            <RetroButton 
              type="submit" 
              disabled={isLoading}
              loading={isLoading}
              variant="success"
              className="flex-1"
            >
              {lang.createAccount}
            </RetroButton>
            <RetroButton 
              type="button" 
              onClick={() => setShowSignupModal(false)}
              variant="ghost"
              className="flex-1"
            >
              {lang.cancel}
            </RetroButton>
          </div>
        </form>
      </RetroModal>
    </div>
  );
}