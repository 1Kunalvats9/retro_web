"use client";

import React, { useState, useEffect } from "react";

// --- Language Translations (unchanged) ---
const translations = {
  en: {
    portalTitle: "UPM Government Portal",
    portalSubtitle: "The United Pingdom of MINET",
    signIn: "Sign In",
    createAccount: "Create Account",
    welcomeUser: "Welcome,",
    signOut: "Sign Out",
    heroTitle: "UPM Digital Services",
    heroSubtitle: "Your trusted gateway to government services.",
    servicesTitle: "Government Services",
    servicesSubtitle: "Select a service below to get started.",
    getStarted: "Go »",
    newsTitle: "Latest Updates",
    news1: "Citizen ID verification system now available online.",
    news2: "Electricity bill payment portal upgraded for better security.",
    news3: "System maintenance scheduled for Sunday 2AM-4AM.",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    loginTitle: "Sign in to UPM Portal",
    usernameLabel: "Username:",
    passwordLabel: "Password:",
    cancel: "Cancel",
    signupTitle: "Create Account",
    loginSuccess: "Welcome back!",
    loginError: "Invalid username or password.",
    signupSuccess: "Account created! You can now sign in.",
    signupError: "Username already exists.",
    logoutMessage: "You have been logged out.",
    changeToHindi: "हिंदी",
    changeToEnglish: "English",
    quickLinks: "Quick Links",
    aboutUpm: "About UPM",
    contactOfficials: "Contact Officials",
    helpSupport: "Help & Support",
    footerSlogan: "Building trust through digital innovation since 1999.",
  },
  hi: {
    portalTitle: "यूपीएम सरकारी पोर्टल",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    signIn: "साइन इन करें",
    createAccount: "खाता बनाएं",
    welcomeUser: "आपका स्वागत है,",
    signOut: "साइन आउट करें",
    heroTitle: "यूपीएम डिजिटल सेवाओं में आपका स्वागत है",
    heroSubtitle: "सरकारी सेवाओं के लिए आपका विश्वसनीय प्रवेश द्वार।",
    servicesTitle: "सरकारी सेवाएँ",
    servicesSubtitle: "शुरू करने के लिए नीचे दी गई किसी भी सेवा पर क्लिक करें",
    getStarted: "जाएँ »",
    newsTitle: "नवीनतम अपडेट",
    news1: "नागरिक आईडी सत्यापन प्रणाली अब ऑनलाइन उपलब्ध है।",
    news2: "बेहतर सुरक्षा के लिए बिजली बिल भुगतान पोर्टल को अपग्रेड किया गया।",
    news3: "सिस्टम रखरखाव रविवार को सुबह 2 बजे से 4 बजे तक निर्धारित है।",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    loginTitle: "यूपीएम पोर्टल में साइन इन करें",
    usernameLabel: "उपयोगकर्ता नाम:",
    passwordLabel: "पासवर्ड:",
    cancel: "रद्द करें",
    signupTitle: "खाता बनाएं",
    loginSuccess: "वापसी पर स्वागत है!",
    loginError: "अमान्य उपयोगकर्ता नाम या पासवर्ड।",
    signupSuccess: "खाता बन गया! अब आप साइन इन कर सकते हैं।",
    signupError: "उपयोगकर्ता नाम पहले से मौजूद है।",
    logoutMessage: "आपको लॉग आउट कर दिया गया है।",
    changeToEnglish: "English",
    changeToHindi: "हिंदी",
    quickLinks: "त्वरित लिंक्स",
    aboutUpm: "यूपीएम के बारे में",
    contactOfficials: "अधिकारियों से संपर्क करें",
    helpSupport: "सहायता और समर्थन",
    footerSlogan: "1999 से डिजिटल नवाचार के माध्यम से विश्वास का निर्माण।",
  },
};

// --- Helper Components ---
const LoadingSpinner = () => <div className="spinner"></div>;

const StatusMessage = ({ type, message, onClose }) => {
    const typeClasses = {
        success: "status-success",
        error: "status-error",
        info: "status-info",
    };
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`status-message ${typeClasses[type]}`}>
            <span>{message}</span>
            <button onClick={onClose} className="status-close-btn">&times;</button>
        </div>
    );
};

// --- Main Service Item Component ---
const ServiceItem = ({ icon, name, description, path, lang }) => {
  return (
    <div className="service-item">
      <img src={icon} alt={`${name} icon`} className="service-icon" width="24" height="24" />
      <div className="service-content">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <a href={path} className="service-link">{lang.getStarted}</a>
    </div>
  );
};

// --- Home Page Component ---
export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('en');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const lang = translations[language];

  useEffect(() => {
    const savedUser = localStorage.getItem('upm_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => { e.preventDefault(); setIsLoading(true); setStatusMessage(null); setTimeout(() => { const foundUser = users.find(u => u.username === username && u.password === password); if (foundUser) { setCurrentUser(foundUser); setIsLoggedIn(true); localStorage.setItem('upm_user', JSON.stringify(foundUser)); setShowLoginModal(false); setUsername(""); setPassword(""); setStatusMessage({ type: 'success', message: lang.loginSuccess }); } else { setStatusMessage({ type: 'error', message: lang.loginError }); } setIsLoading(false); }, 1000); };
  const handleSignup = (e) => { e.preventDefault(); setIsLoading(true); setStatusMessage(null); setTimeout(() => { if (users.some(u => u.username === username)) { setStatusMessage({ type: 'error', message: lang.signupError }); } else { const newUser = { username, password }; setUsers([...users, newUser]); setShowSignupModal(false); setUsername(""); setPassword(""); setStatusMessage({ type: 'success', message: lang.signupSuccess }); } setIsLoading(false); }, 1000); };
  const handleLogout = () => { setIsLoggedIn(false); setCurrentUser(null); localStorage.removeItem('upm_user'); setStatusMessage({ type: 'info', message: lang.logoutMessage }); };
  const toggleLanguage = () => { setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en'); };

  const servicesData = {
    en: [
        { name: "Electricity Services", icon: "https://placehold.co/24x24/ffc107/000000?text=E", path: "/services/electricity", description: "Pay bills, check consumption, and report outages." },
        { name: "Water & Sanitation", icon: "https://placehold.co/24x24/00bcd4/ffffff?text=W", path: "/services/water", description: "Manage water bills and submit maintenance requests." },
        { name: "Education Portal", icon: "https://placehold.co/24x24/9c27b0/ffffff?text=B", path: "/services/education", description: "Access student records and apply for scholarships." },
        { name: "Citizen Benefits", icon: "https://placehold.co/24x24/4caf50/ffffff?text=C", path: "/services/schemes", description: "Explore social schemes and various welfare programs." },
        { name: "Public Transport", icon: "https://placehold.co/24x24/f44336/ffffff?text=T", path: "/services/transport", description: "Find bus schedules and detailed route information." },
        { name: "Railway Services", icon: "https://placehold.co/24x24/3f51b5/ffffff?text=R", path: "/services/railway", description: "Book tickets for trains and check train schedules." },
    ],
    hi: [
        { name: "बिजली सेवाएं", icon: "https://placehold.co/24x24/ffc107/000000?text=E", path: "#", description: "बिल भुगतान करें, खपत जांचें, और आउटेज की रिपोर्ट करें।" },
        { name: "जल और स्वच्छता", icon: "https://placehold.co/24x24/00bcd4/ffffff?text=W", path: "#", description: "पानी के बिल का प्रबंधन करें और रखरखाव अनुरोध सबमिट करें।" },
        { name: "शिक्षा पोर्टल", icon: "https://placehold.co/24x24/9c27b0/ffffff?text=B", path: "#", description: "छात्र रिकॉर्ड तक पहुंचें और छात्रवृत्ति के लिए आवेदन करें।" },
        { name: "नागरिक लाभ", icon: "https://placehold.co/24x24/4caf50/ffffff?text=C", path: "#", description: "सामाजिक योजनाओं और विभिन्न कल्याणकारी कार्यक्रमों का अन्वेषण करें।" },
        { name: "सार्वजनिक परिवहन", icon: "https://placehold.co/24x24/f44336/ffffff?text=T", path: "#", description: "बस शेड्यूल और विस्तृत मार्ग जानकारी प्राप्त करें।" },
        { name: "रेलवे सेवाएं", icon: "https://placehold.co/24x24/3f51b5/ffffff?text=R", path: "#", description: "ट्रेनों के लिए टिकट बुक करें और ट्रेन शेड्यूल जांचें।" },
    ]
  };
  
  const newsItems = [lang.news1, lang.news2, lang.news3].join("  *** ");
  const iconUrl = (name) => `https://placehold.co/16x16/d4d0c8/000000?text=${name.charAt(0)}`;

  return (
    <div className="desktop-background">
      {statusMessage && <StatusMessage type={statusMessage.type} message={statusMessage.message} onClose={() => setStatusMessage(null)} />}

      <div className="crt-monitor">
          <div className="monitor-bezel">
              <div className="monitor-screen">
                  <div className="container-wrapper">
                      <header className="title-bar">
                        <div className="title-bar-text">
                            <img src={iconUrl("UPM")} alt="UPM Logo" className="title-bar-icon" />
                            {lang.portalTitle} - {lang.portalSubtitle}
                        </div>
                        <div className="title-bar-controls">
                            <button aria-label="Minimize" disabled></button>
                            <button aria-label="Maximize" disabled></button>
                            <button aria-label="Close" disabled></button>
                        </div>
                      </header>

                      <div className="toolbar">
                          <div className="user-session">
                              {isLoggedIn? (
                                  <>
                                      <span>{lang.welcomeUser} <b>{currentUser?.username}</b></span>
                                      <button onClick={handleLogout} className="btn btn-sm">
                                          <img src={iconUrl("L")} alt="" /> {lang.signOut}
                                      </button>
                                  </>
                              ) : (
                                  <>
                                      <button onClick={() => setShowLoginModal(true)} className="btn btn-sm">
                                          <img src={iconUrl("K")} alt="" /> {lang.signIn}
                                      </button>
                                      <button onClick={() => setShowSignupModal(true)} className="btn btn-sm">
                                          <img src={iconUrl("U")} alt="" /> {lang.createAccount}
                                      </button>
                                  </>
                              )}
                          </div>
                          <button onClick={toggleLanguage} className="lang-toggle">
                              <img src={iconUrl("G")} alt="" />
                              {language === 'en'? lang.changeToHindi : lang.changeToEnglish}
                          </button>
                      </div>

                      <main className="window-body">
                        <fieldset className="hero-section">
                            <legend>{lang.heroTitle}</legend>
                            <p>{lang.heroSubtitle}</p>
                        </fieldset>

                        <div className="news-marquee">
                            <marquee behavior="scroll" direction="left" scrollamount="4">
                              {newsItems}
                            </marquee>
                        </div>

                        <div className="main-content-grid">
                            <div className="services-column">
                              <div className="panel">
                                  <div className="panel-header">{lang.servicesTitle}</div>
                                  <div className="panel-body">
                                    <p>{lang.servicesSubtitle}</p>
                                    <div className="sunken-panel">
                                        {servicesData[language].map((service, index) => <ServiceItem key={index} {...service} lang={lang} />)}
                                    </div>
                                  </div>
                              </div>
                            </div>

                            <div className="sidebar-column">
                                <div className="panel">
                                    <div className="panel-header">{lang.quickLinks}</div>
                                    <ul className="panel-body list-none">
                                        <li><a href="#">› {lang.aboutUpm}</a></li>
                                        <li><a href="#">› {lang.contactOfficials}</a></li>
                                        <li><a href="#">› {lang.helpSupport}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                      </main>

                      <footer className="status-bar">
                          <p className="status-bar-field">{lang.footerSlogan}</p>
                          <p className="status-bar-field">{lang.rightsReserved}</p>
                          <p className="status-bar-field">
                            <img src={iconUrl("O")} alt="" /> Online
                          </p>
                      </footer>
                  </div>
              </div>
              <div className="monitor-details">
                <div className="monitor-vents">
                    <div></div><div></div><div></div><div></div>
                </div>
                <span className="monitor-brand">SONY</span>
                <div className="flex items-center">
                    <div className="power-button"></div>
                    <div className="power-led"></div>
                </div>
              </div>
          </div>
      </div>

      { (showLoginModal || showSignupModal) &&
        <div className="modal-overlay">
          <div className="window modal-window">
            <div className="title-bar">
                <div className="title-bar-text">{showLoginModal? lang.loginTitle : lang.signupTitle}</div>
                <div className="title-bar-controls">
                    <button aria-label="Close" onClick={() => { setShowLoginModal(false); setShowSignupModal(false); }}></button>
                </div>
            </div>
            <div className="window-body">
                <form onSubmit={showLoginModal? handleLogin : handleSignup}>
                  <div className="field-row-stacked">
                    <label htmlFor="username-input">{lang.usernameLabel}</label>
                    <input id="username-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                  <div className="field-row-stacked">
                    <label htmlFor="password-input">{lang.passwordLabel}</label>
                    <input id="password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <section className="field-row" style={{ justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => { setShowLoginModal(false); setShowSignupModal(false); }}>{lang.cancel}</button>
                    <button type="submit" disabled={isLoading} className="ml-2 min-w-[75px]">
                      {isLoading? <LoadingSpinner /> : (showLoginModal? lang.signIn : lang.createAccount)}
                    </button>
                  </section>
                </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
