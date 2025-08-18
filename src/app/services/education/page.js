"use client";

import React, { useState, useEffect } from "react";

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
    studentIdLabel: "Student ID:",
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
    scholarshipApplications: "Scholarship Applications",
    documentDownloads: "Document Downloads",
    footerSlogan: "Empowering minds since 1999",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    changeToHindi: "हिंदी",
    changeToEnglish: "English",
    meritScholarship: "Merit-based Scholarships",
    needScholarship: "Need-based Financial Aid",
    sportsScholarship: "Sports Excellence Awards",
    applyNow: "Apply Now",
    academicTranscripts: "Academic Transcripts",
    degreeCertificates: "Degree Certificates",
    getStartedLibby: "Get Started with Libby",
    libraryDescription: "With your UPM citizen ID, you can access thousands of digital books, audiobooks, and magazines for free through our partnership with OverDrive.",
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
    studentIdLabel: "छात्र आईडी:",
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
    scholarshipApplications: "छात्रवृत्ति आवेदन",
    documentDownloads: "दस्तावेज़ डाउनलोड",
    footerSlogan: "1999 से मस्तिष्कों को सशक्त बनाना",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    changeToEnglish: "English",
    changeToHindi: "हिंदी",
    meritScholarship: "योग्यता-आधारित छात्रवृत्ति",
    needScholarship: "आवश्यकता-आधारित वित्तीय सहायता",
    sportsScholarship: "खेल उत्कृष्टता पुरस्कार",
    applyNow: "अभी आवेदन करें",
    academicTranscripts: "शैक्षणिक प्रतिलेख",
    degreeCertificates: "डिग्री प्रमाण पत्र",
    getStartedLibby: "लिब्बी के साथ शुरू करें",
    libraryDescription: "अपने यूपीएम नागरिक आईडी के साथ, आप ओवरड्राइव के साथ हमारी साझेदारी के माध्यम से हजारों डिजिटल किताबें, ऑडियोबुक और पत्रिकाएं मुफ्त में एक्सेस कर सकते हैं।",
  },
};

// --- Helper Components ---
const LoadingSpinner = () => <div className="spinner"></div>;

// --- Content View Components ---

const AcademicResultsView = ({ lang }) => {
  const [studentId, setStudentId] = useState("UPM12345");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckResults = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleCheckAnother = () => {
    setShowResults(false);
    setStudentId("");
  };

  return (
    <div className="panel">
        <div className="panel-header">{lang.academicResults}</div>
        <div className="panel-body">
            {!showResults ? (
                <form onSubmit={handleCheckResults}>
                    <div className="field-row-stacked">
                        <label htmlFor="student-id">{lang.studentIdLabel}</label>
                        <input id="student-id" type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                    </div>
                    <section className="field-row" style={{ justifyContent: 'flex-end' }}>
                        <button type="submit" disabled={isLoading} className="min-w-[100px]">
                            {isLoading ? <LoadingSpinner /> : lang.checkResults}
                        </button>
                    </section>
                </form>
            ) : (
                <div>
                    <div className="sunken-panel p-2 mb-2">
                        <p><b>{lang.studentIdResult}</b> {studentId}</p>
                        <p><b>{lang.academicYearResult}</b> 2024-25</p>
                        <p><b>{lang.semesterResult}</b> 2nd Semester</p>
                        <p><b>{lang.cgpaResult}</b> 8.7/10</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="panel">
                            <div className="panel-header">{lang.subjectMarks}</div>
                            <ul className="panel-body">
                                <li>{lang.math} 85/100</li>
                                <li>{lang.physics} 88/100</li>
                                <li>{lang.chemistry} 82/100</li>
                                <li>{lang.english} 90/100</li>
                            </ul>
                        </div>
                        <div className="panel">
                            <div className="panel-header">{lang.performanceSummary}</div>
                            <ul className="panel-body">
                                <li>{lang.totalMarks} 345/400</li>
                                <li>{lang.percentage} 86.25%</li>
                                <li>{lang.grade} A</li>
                                <li>{lang.rank} 15/120</li>
                            </ul>
                        </div>
                    </div>
                    <section className="field-row" style={{ justifyContent: 'flex-end' }}>
                        <button onClick={handleCheckAnother}>{lang.checkAnother}</button>
                        <button onClick={() => window.print()} className="ml-2">{lang.printResults}</button>
                    </section>
                </div>
            )}
        </div>
    </div>
  );
};

const ScholarshipsView = ({ lang }) => (
  <div className="panel">
    <div className="panel-header">{lang.scholarshipApplications}</div>
    <div className="panel-body">
        <p>Explore and apply for available scholarships.</p>
        <div className="sunken-panel">
            <div className="p-2 border-b border-gray-300"><b>{lang.meritScholarship}</b><p className="text-xs">For students with excellent academic records.</p></div>
            <div className="p-2 border-b border-gray-300"><b>{lang.needScholarship}</b><p className="text-xs">Financial aid for eligible students.</p></div>
            <div className="p-2"><b>{lang.sportsScholarship}</b><p className="text-xs">For students with outstanding achievements in sports.</p></div>
        </div>
        <section className="field-row mt-2" style={{ justifyContent: 'flex-end' }}>
            <button>{lang.applyNow}</button>
        </section>
    </div>
  </div>
);

const ResourcesView = ({ lang }) => (
  <div className="panel">
    <div className="panel-header">{lang.exploreResources}</div>
    <div className="panel-body">
        <p>Access free online learning resources from top institutions.</p>
        <ul className="sunken-panel p-2">
            <li><a href="https://www.khanacademy.org/" target="_blank" rel="noopener noreferrer">› Khan Academy</a></li>
            <li><a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer">› Coursera</a></li>
            <li><a href="https://www.edx.org/" target="_blank" rel="noopener noreferrer">› edX</a></li>
            <li><a href="https://www.gutenberg.org/" target="_blank" rel="noopener noreferrer">› Project Gutenberg</a></li>
        </ul>
    </div>
  </div>
);

const DigitalLibraryView = ({ lang }) => (
  <div className="panel">
    <div className="panel-header">{lang.digitalLibrary}</div>
    <div className="panel-body">
        <p>{lang.libraryDescription}</p>
        <section className="field-row mt-2" style={{ justifyContent: 'center' }}>
            <a href="https://www.overdrive.com/apps/libby" target="_blank" rel="noopener noreferrer" className="btn">
                {lang.getStartedLibby}
            </a>
        </section>
    </div>
  </div>
);


// --- Main Page Component ---
export default function EducationPortalPage() {
  const [language, setLanguage] = useState('en');
  const [activeView, setActiveView] = useState('records'); // 'records', 'scholarships', 'resources', 'library'

  const lang = translations[language];

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };
  
  const iconUrl = (name) => `https://placehold.co/16x16/d4d0c8/000000?text=${name.charAt(0)}`;

  const renderActiveView = () => {
    switch (activeView) {
        case 'records':
            return <AcademicResultsView lang={lang} />;
        case 'scholarships':
            return <ScholarshipsView lang={lang} />;
        case 'resources':
            return <ResourcesView lang={lang} />;
        case 'library':
            return <DigitalLibraryView lang={lang} />;
        default:
            return <AcademicResultsView lang={lang} />;
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
                            <img src={iconUrl("EDU")} alt="UPM Education Logo" className="title-bar-icon" />
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
                              {language === 'en'? lang.changeToHindi : lang.changeToEnglish}
                          </button>
                      </div>

                      <main className="window-body">
                        <div className="main-content-grid">
                            {/* --- Main Content Area --- */}
                            <div className="services-column">
                                {renderActiveView()}
                            </div>

                            {/* --- Sidebar Area --- */}
                            <div className="sidebar-column">
                                <div className="panel">
                                    <div className="panel-header">{lang.quickActions}</div>
                                    <ul className="panel-body list-none">
                                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('records'); }}>› {lang.viewRecords}</a></li>
                                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('scholarships'); }}>› {lang.applyScholarships}</a></li>
                                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('resources'); }}>› {lang.exploreResources}</a></li>
                                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('library'); }}>› {lang.digitalLibrary}</a></li>
                                    </ul>
                                </div>
                                <div className="panel mt-3">
                                    <div className="panel-header">{lang.documentDownloads}</div>
                                     <ul className="panel-body list-none">
                                        <li><a href="#">› {lang.academicTranscripts}</a></li>
                                        <li><a href="#">› {lang.degreeCertificates}</a></li>
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
    </div>
  );
}
