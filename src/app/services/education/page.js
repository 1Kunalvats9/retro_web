"use client";

import React, { useState } from "react";
import Link from 'next/link';

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Education Portal",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    quickActions: "Quick Actions",
    viewRecords: "View Academic Records",
    applyScholarships: "Apply for Scholarships",
    exploreResources: "Explore Resources",
    digitalLibrary: "Digital Library",
    studentPortalAccess: "Student Portal Access",
    studentIdLabel: "Student ID",
    studentIdPlaceholder: "Enter your student ID (e.g., UPM12345)",
    studentIdHint: "* Enter your registered student ID to view your results.",
    checking: "Checking...",
    checkResults: "Check Results",
    academicResults: "Academic Results",
    studentIdResult: "Student ID:",
    academicYearResult: "Academic Year:",
    semesterResult: "Semester:",
    cgpaResult: "CGPA:",
    subjectMarks: "Subject-wise Marks",
    math: "Mathematics:",
    physics: "Physics:",
    chemistry: "Chemistry:",
    english: "English:",
    performanceSummary: "Performance Summary",
    totalMarks: "Total Marks:",
    percentage: "Percentage:",
    grade: "Grade:",
    rank: "Rank:",
    checkAnother: "Check Another",
    printResults: "Print Results",
    exploreLearningResources: "Explore Online Learning Resources",
    digitalLibraryAccess: "Digital Library Access",
    borrowBooks: "Borrow eBooks and Audiobooks",
    libraryDescription: "With your UPM citizen ID, you can access thousands of digital books, audiobooks, and magazines for free through our partnership with OverDrive. Use the Libby app on your phone or tablet to start reading.",
    getStartedLibby: "Get Started with Libby",
    scholarshipApplications: "Scholarship Applications",
    meritScholarship: "Merit-based Scholarships",
    needScholarship: "Need-based Financial Aid",
    sportsScholarship: "Sports Excellence Awards",
    applyNow: "Apply Now",
    documentDownloads: "Document Downloads",
    academicTranscripts: "Academic Transcripts",
    degreeCertificates: "Degree Certificates",
    characterCertificates: "Character Certificates",
    downloadAll: "Download All",
    footerTitle: "UPM Education Portal",
    footerSlogan: "Empowering minds since 1999",
    footerLinksTitle: "Quick Links",
    academicCalendar: "Academic Calendar",
    studentHandbook: "Student Handbook",
    helpSupport: "Help & Support",
    contactInfoTitle: "Contact Info",
    address: "Education Complex, Susland",
    phone: "1-800-UPM-EDU",
    email: "education@upm.gov.minet",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    optimizedFor: "Optimized for all modern browsers and devices",
    changeToHindi: "हिंदी में",
  },
  hi: {
    portalTitle: "यूपीएम शिक्षा पोर्टल",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    quickActions: "त्वरित कार्रवाई",
    viewRecords: "शैक्षणिक रिकॉर्ड देखें",
    applyScholarships: "छात्रवृत्ति के लिए आवेदन करें",
    exploreResources: "संसाधन खोजें",
    digitalLibrary: "डिजिटल लाइब्रेरी",
    studentPortalAccess: "छात्र पोर्टल एक्सेस",
    studentIdLabel: "छात्र आईडी",
    studentIdPlaceholder: "अपनी छात्र आईडी दर्ज करें (उदा., UPM12345)",
    studentIdHint: "* अपने परिणाम देखने के लिए अपनी पंजीकृत छात्र आईडी दर्ज करें।",
    checking: "जाँच हो रही है...",
    checkResults: "परिणाम जांचें",
    academicResults: "शैक्षणिक परिणाम",
    studentIdResult: "छात्र आईडी:",
    academicYearResult: "शैक्षणिक वर्ष:",
    semesterResult: "सेमेस्टर:",
    cgpaResult: "सीजीपीए:",
    subjectMarks: "विषय-वार अंक",
    math: "गणित:",
    physics: "भौतिकी:",
    chemistry: "रसायन विज्ञान:",
    english: "अंग्रेजी:",
    performanceSummary: "प्रदर्शन सारांश",
    totalMarks: "कुल अंक:",
    percentage: "प्रतिशत:",
    grade: "ग्रेड:",
    rank: "रैंक:",
    checkAnother: "दूसरा जांचें",
    printResults: "परिणाम प्रिंट करें",
    exploreLearningResources: "ऑनलाइन शिक्षण संसाधन खोजें",
    digitalLibraryAccess: "डिजिटल लाइब्रेरी एक्सेस",
    borrowBooks: "ई-बुक्स और ऑडियोबुक्स उधार लें",
    libraryDescription: "अपने यूपीएम नागरिक आईडी के साथ, आप ओवरड्राइव के साथ हमारी साझेदारी के माध्यम से हजारों डिजिटल किताबें, ऑडियोबुक और पत्रिकाएं मुफ्त में एक्सेस कर सकते हैं। पढ़ना शुरू करने के लिए अपने फोन या टैबलेट पर लिब्बी ऐप का उपयोग करें।",
    getStartedLibby: "लिब्बी के साथ शुरू करें",
    scholarshipApplications: "छात्रवृत्ति आवेदन",
    meritScholarship: "योग्यता-आधारित छात्रवृत्ति",
    needScholarship: "आवश्यकता-आधारित वित्तीय सहायता",
    sportsScholarship: "खेल उत्कृष्टता पुरस्कार",
    applyNow: "अभी आवेदन करें",
    documentDownloads: "दस्तावेज़ डाउनलोड",
    academicTranscripts: "शैक्षणिक प्रतिलेख",
    degreeCertificates: "डिग्री प्रमाण पत्र",
    characterCertificates: "चरित्र प्रमाण पत्र",
    downloadAll: "सभी डाउनलोड करें",
    footerTitle: "यूपीएम शिक्षा पोर्टल",
    footerSlogan: "1999 से मस्तिष्कों को सशक्त बनाना",
    footerLinksTitle: "त्वरित लिंक्स",
    academicCalendar: "शैक्षणिक कैलेंडर",
    studentHandbook: "छात्र पुस्तिका",
    helpSupport: "सहायता और समर्थन",
    contactInfoTitle: "संपर्क जानकारी",
    address: "शिक्षा परिसर, ससलैंड",
    phone: "1-800-यूपीएम-ईडीयू",
    email: "education@upm.gov.minet",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    optimizedFor: "सभी आधुनिक ब्राउज़रों और उपकरणों के लिए अनुकूलित",
    changeToEnglish: "English",
  },
};


// Helper component for resource cards for a cleaner look
const ResourceCard = ({ icon, title, description, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white rounded-xl shadow-md border border-stone-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className="flex items-center space-x-4 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-lg font-bold text-stone-800 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>
    </div>
    <p className="text-stone-600 text-sm">{description}</p>
  </a>
);

export default function EducationPortalPage() {
  const [studentId, setStudentId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('hi'); // Default to Hindi

  const lang = translations[language];

  const handleCheckResults = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'hi' ? 'en' : 'hi');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif] text-stone-800">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">📚</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">{lang.portalTitle}</h1>
                <p className="text-stone-600 text-sm">{lang.portalSubtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="px-4 py-2 text-sm font-semibold text-purple-600 hover:text-purple-800">
                {language === 'hi' ? lang.changeToEnglish : lang.changeToHindi}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6 mb-6 sticky top-28">
              <h2 className="text-xl font-bold text-stone-800 mb-5 border-b border-stone-200 pb-2">
                {lang.quickActions}
              </h2>
              <div className="space-y-3">
                <a href="#student-portal" className="block text-stone-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50 font-medium">
                  📊 {lang.viewRecords}
                </a>
                <a href="#scholarships" className="block text-stone-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50 font-medium">
                  🎓 {lang.applyScholarships}
                </a>
                <a href="#resources" className="block text-stone-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50 font-medium">
                  📖 {lang.exploreResources}
                </a>
                <a href="#library" className="block text-stone-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50 font-medium">
                  🏛️ {lang.digitalLibrary}
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            {/* Student Portal Access Section */}
            <section id="student-portal" className="bg-white rounded-xl shadow-md border border-stone-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-stone-800 mb-6 text-center">
                {lang.studentPortalAccess}
              </h2>

              {!showResults ? (
                <form onSubmit={handleCheckResults} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <div className="mb-5">
                    <label className="block text-stone-700 font-semibold mb-2">
                      {lang.studentIdLabel}
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-black placeholder-stone-500"
                      placeholder={lang.studentIdPlaceholder}
                      required
                    />
                    <p className="text-stone-500 text-sm mt-1">{lang.studentIdHint}</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <span>🔍</span>}
                    <span>{isLoading ? lang.checking : lang.checkResults}</span>
                  </button>
                </form>
              ) : (
                <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in">
                  <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">{lang.academicResults}</h3>
                   <div className="bg-white border border-stone-200 p-5 mb-6 rounded-lg">
                    <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                      <span className="font-semibold text-stone-700">{lang.studentIdResult}</span>
                      <span className="text-stone-800 font-mono">{studentId}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                      <span className="font-semibold text-stone-700">{lang.academicYearResult}</span>
                      <span className="text-stone-800">2024-25</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-3 mb-3">
                      <span className="font-semibold text-stone-700">{lang.semesterResult}</span>
                      <span className="text-stone-800">2nd Semester</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-stone-700">{lang.cgpaResult}</span>
                      <span className="font-bold text-green-600">8.7/10</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-stone-800 mb-2">{lang.subjectMarks}</h4>
                      <div className="space-y-2 text-black text-sm">
                        <div className="flex justify-between">
                          <span>{lang.math}</span>
                          <span className="font-semibold text-green-600">85/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang.physics}</span>
                          <span className="font-semibold text-green-600">88/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang.chemistry}</span>
                          <span className="font-semibold text-green-600">82/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang.english}</span>
                          <span className="font-semibold text-green-600">90/100</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-stone-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-stone-800 mb-2">{lang.performanceSummary}</h4>
                      <div className="space-y-2 text-black text-sm">
                        <div className="flex justify-between">
                          <span>{lang.totalMarks}</span>
                          <span className="font-semibold">345/400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang.percentage}</span>
                          <span className="font-semibold text-green-600">86.25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang.grade}</span>
                          <span className="font-semibold text-blue-600">A</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang.rank}</span>
                          <span className="font-semibold text-purple-600">15/120</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowResults(false)}
                      className="flex-1 bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md"
                    >
                      🔍 {lang.checkAnother}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-md"
                    >
                      🖨️ {lang.printResults}
                    </button>
                  </div>
                </div>
              )}
            </section>
            
            {/* --- NEW: Online Learning Resources Section --- */}
            <section id="resources" className="mb-8">
              <h2 className="text-3xl font-bold text-stone-800 mb-6 text-center">{lang.exploreLearningResources}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard 
                  icon="🎓"
                  title="Khan Academy"
                  description="Free, world-class education for anyone, anywhere. Covers math, science, computing, history, art history, economics, and more."
                  link="https://www.khanacademy.org/"
                />
                <ResourceCard 
                  icon="🏛️"
                  title="Coursera"
                  description="Learn from top universities and companies. Access courses, specializations, and degrees in a variety of subjects."
                  link="https://www.coursera.org/"
                />
                <ResourceCard 
                  icon="💡"
                  title="edX"
                  description="Access 2000 free online courses from 140 leading institutions worldwide. Gain new skills and earn a certificate of completion."
                  link="https://www.edx.org/"
                />
                <ResourceCard 
                  icon="📖"
                  title="Project Gutenberg"
                  description="A library of over 60,000 free eBooks. Find the world's great literature here, with a focus on older works for which U.S. copyright has expired."
                  link="https://www.gutenberg.org/"
                />
              </div>
            </section>

            {/* --- NEW: Digital Library Section --- */}
            <section id="library" className="mb-8">
               <h2 className="text-3xl font-bold text-stone-800 mb-6 text-center">{lang.digitalLibraryAccess}</h2>
               <div className="bg-white rounded-xl shadow-md border border-stone-200 p-8 text-center">
                 <span className="text-5xl mb-4 inline-block">📚</span>
                 <h3 className="text-xl font-bold text-stone-800 mb-2">{lang.borrowBooks}</h3>
                 <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
                   {lang.libraryDescription}
                 </p>
                 <a 
                   href="https://www.overdrive.com/apps/libby" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                 >
                   {lang.getStartedLibby}
                 </a>
               </div>
            </section>

            {/* Scholarship Section */}
            <section id="scholarships" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  {lang.scholarshipApplications}
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm text-green-800">{lang.meritScholarship}</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">✅</span>
                      <span className="text-sm text-blue-800">{lang.needScholarship}</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✅</span>
                      <span className="text-sm text-purple-800">{lang.sportsScholarship}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  {lang.applyNow}
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4 text-center border-b border-stone-200 pb-2">
                  {lang.documentDownloads}
                </h3>
                <div className="space-y-3">
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-stone-600">📄</span>
                      <span className="text-sm text-stone-700">{lang.academicTranscripts}</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-stone-600">🎓</span>
                      <span className="text-sm text-stone-700">{lang.degreeCertificates}</span>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-stone-600">📋</span>
                      <span className="text-sm text-stone-700">{lang.characterCertificates}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  {lang.downloadAll}
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-purple-400">{lang.footerTitle}</h4>
              <p className="text-stone-300 text-sm">
                {lang.portalSubtitle}<br />
                {lang.footerSlogan}
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-purple-400">{lang.footerLinksTitle}</h4>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">{lang.academicCalendar}</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">{lang.studentHandbook}</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">{lang.helpSupport}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-purple-400">{lang.contactInfoTitle}</h4>
              <div className="text-stone-300 text-sm space-y-2">
                <p>📚 {lang.address}</p>
                <p>📞 {lang.phone}</p>
                <p>📧 {lang.email}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-stone-700 pt-8 text-center">
            <p className="text-stone-400 text-sm">
              {lang.rightsReserved}
            </p>
            <p className="text-xs text-stone-500 mt-2">
              {lang.optimizedFor}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
