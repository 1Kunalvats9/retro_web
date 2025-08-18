"use client";

import React, { useState } from "react";

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Water & Sanitation",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    payBill: "Pay Bill",
    reportIssue: "Report Issue",
    savingTips: "Saving Tips",
    consumerNumber: "Consumer Number:",
    checking: "Checking...",
    checkBill: "Check Bill",
    billDetails: "Bill Details",
    consumerNo: "Consumer No:",
    amountDue: "Amount Due:",
    payNow: "Pay Now",
    cancel: "Cancel",
    paymentDetails: "Payment Details",
    amountToPay: "Amount:",
    confirmPayment: "Confirm Payment",
    back: "Back",
    reportAnIssue: "Report an Issue",
    issueType: "Issue Type:",
    noWaterSupply: "No Water Supply",
    pipeLeakage: "Pipe Leakage",
    waterQualityIssue: "Water Quality Issue",
    billingDispute: "Billing Dispute",
    details: "Details:",
    submitReport: "Submit Report",
    waterSavingTips: "Water Saving Tips",
    fixLeaks: "Fix Leaks Promptly",
    fixLeaksDescription: "A small drip can waste thousands of litres a year. Check all taps, pipes, and toilets regularly.",
    turnOffTap: "Turn Off the Tap",
    turnOffTapDescription: "Don't let water run while brushing your teeth or washing dishes.",
    monthlyConsumption: "Monthly Consumption History",
    paymentSuccessTitle: "Payment Successful!",
    paymentSuccessMessage: "Your payment has been processed. Your receipt number is:",
    done: "Done",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    changeToHindi: "हिंदी",
    changeToEnglish: "English",
  },
  hi: {
    portalTitle: "यूपीएम जल और स्वच्छता",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    payBill: "बिल भुगतान करें",
    reportIssue: "समस्या की रिपोर्ट करें",
    savingTips: "बचत युक्तियाँ",
    consumerNumber: "उपभोक्ता संख्या:",
    checking: "जाँच हो रही है...",
    checkBill: "बिल जांचें",
    billDetails: "बिल विवरण",
    consumerNo: "उपभोक्ता संख्या:",
    amountDue: "देय राशि:",
    payNow: "अभी भुगतान करें",
    cancel: "रद्द करें",
    paymentDetails: "भुगतान विवरण",
    amountToPay: "राशि:",
    confirmPayment: "भुगतान की पुष्टि करें",
    back: "वापस",
    reportAnIssue: "समस्या की रिपोर्ट करें",
    issueType: "समस्या का प्रकार:",
    noWaterSupply: "पानी की आपूर्ति नहीं",
    pipeLeakage: "पाइप रिसाव",
    waterQualityIssue: "पानी की गुणवत्ता की समस्या",
    billingDispute: "बिलिंग विवाद",
    details: "विवरण:",
    submitReport: "रिपोर्ट सबमिट करें",
    waterSavingTips: "पानी बचाने के उपाय",
    fixLeaks: "लीक को तुरंत ठीक करें",
    fixLeaksDescription: "एक छोटी सी टपकन से साल में हजारों लीटर पानी बर्बाद हो सकता है।",
    turnOffTap: "नल बंद करें",
    turnOffTapDescription: "दांतों को ब्रश करते समय या बर्तन धोते समय पानी को बहने न दें।",
    monthlyConsumption: "मासिक खपत इतिहास",
    paymentSuccessTitle: "भुगतान सफल!",
    paymentSuccessMessage: "आपका भुगतान संसाधित हो गया है। आपकी रसीद संख्या है:",
    done: "पूर्ण",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    changeToEnglish: "English",
    changeToHindi: "हिंदी",
  },
};

// --- Helper Components ---
const LoadingSpinner = () => <div className="spinner"></div>;

// --- Content View Components ---

const PayBillView = ({ lang }) => {
  const [consumerNumber, setConsumerNumber] = useState("0987654321");
  const [billAmount, setBillAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receipt, setReceipt] = useState("");

  const handleCheckBill = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const amount = Math.floor(Math.random() * 1800) + 200;
      setBillAmount(amount);
      setIsLoading(false);
    }, 1500);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const receiptNumber = "WATER-" + Math.floor(Math.random() * 1000000);
    setReceipt(receiptNumber);
    setPaymentSuccess(true);
  };

  const closeSuccessModal = () => {
    setPaymentSuccess(false);
    setBillAmount(null);
    setConsumerNumber("");
    setShowPaymentForm(false);
  };

  return (
    <>
      {!billAmount ? (
        <form onSubmit={handleCheckBill}>
          <div className="field-row-stacked">
            <label htmlFor="consumer-number">{lang.consumerNumber}</label>
            <input id="consumer-number" type="text" value={consumerNumber} onChange={(e) => setConsumerNumber(e.target.value)} required />
          </div>
          <section className="field-row" style={{ justifyContent: 'flex-end' }}>
            <button type="submit" disabled={isLoading} className="min-w-[100px]">
              {isLoading ? <LoadingSpinner /> : lang.checkBill}
            </button>
          </section>
        </form>
      ) : !showPaymentForm ? (
        <div>
          <fieldset>
            <legend>{lang.billDetails}</legend>
            <p><b>{lang.consumerNo}</b> {consumerNumber}</p>
            <p className="text-lg"><b>{lang.amountDue}</b> ₹ {billAmount.toFixed(2)}</p>
          </fieldset>
          <section className="field-row mt-2" style={{ justifyContent: 'flex-end' }}>
            <button onClick={() => setBillAmount(null)}>{lang.cancel}</button>
            <button onClick={() => setShowPaymentForm(true)} className="ml-2">{lang.payNow}</button>
          </section>
        </div>
      ) : (
        <form onSubmit={handlePaymentSubmit}>
          <fieldset>
            <legend>{lang.paymentDetails}</legend>
            <p><b>{lang.amountToPay}</b> ₹ {billAmount.toFixed(2)}</p>
          </fieldset>
          <section className="field-row mt-2" style={{ justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowPaymentForm(false)}>{lang.back}</button>
            <button type="submit" className="ml-2">{lang.confirmPayment}</button>
          </section>
        </form>
      )}
      {paymentSuccess && (
        <div className="modal-overlay">
          <div className="window modal-window">
            <div className="title-bar"><div className="title-bar-text">{lang.paymentSuccessTitle}</div></div>
            <div className="window-body text-center">
              <p>{lang.paymentSuccessMessage}</p>
              <p className="font-bold text-lg">{receipt}</p>
              <button onClick={closeSuccessModal} className="mt-2">{lang.done}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ReportIssueView = ({ lang }) => (
  <form>
    <div className="field-row-stacked">
      <label htmlFor="issue-type">{lang.issueType}</label>
      <select id="issue-type">
        <option>{lang.noWaterSupply}</option>
        <option>{lang.pipeLeakage}</option>
        <option>{lang.waterQualityIssue}</option>
        <option>{lang.billingDispute}</option>
      </select>
    </div>
    <div className="field-row-stacked">
        <label htmlFor="details">{lang.details}</label>
        <textarea id="details" rows="3"></textarea>
    </div>
    <section className="field-row" style={{ justifyContent: 'flex-end' }}>
      <button type="submit">{lang.submitReport}</button>
    </section>
  </form>
);

const SavingTipsView = ({ lang }) => (
    <div>
        <div className="sunken-panel p-2">
            <p><b>{lang.fixLeaks}</b></p>
            <p className="text-xs mb-2">{lang.fixLeaksDescription}</p>
            <p><b>{lang.turnOffTap}</b></p>
            <p className="text-xs">{lang.turnOffTapDescription}</p>
        </div>
    </div>
);

// --- Main Page Component ---
export default function WaterServicesPage() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('pay');

  const lang = translations[language];

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  const iconUrl = (name) => `https://placehold.co/16x16/d4d0c8/000000?text=${name.charAt(0)}`;

  const renderActiveView = () => {
    switch (activeTab) {
      case 'pay': return <PayBillView lang={lang} />;
      case 'report': return <ReportIssueView lang={lang} />;
      case 'tips': return <SavingTipsView lang={lang} />;
      default: return <PayBillView lang={lang} />;
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
                  <img src={iconUrl("W")} alt="UPM Water Logo" className="title-bar-icon" />
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
                <div className="main-content-grid">
                    <div className="services-column">
                        <div className="sunken-panel p-1">
                            <div role="tablist" className="flex border-b-2 border-gray-500">
                                <button role="tab" aria-selected={activeTab === 'pay'} onClick={() => setActiveTab('pay')} className="btn-tab">{lang.payBill}</button>
                                <button role="tab" aria-selected={activeTab === 'report'} onClick={() => setActiveTab('report')} className="btn-tab">{lang.reportIssue}</button>
                                <button role="tab" aria-selected={activeTab === 'tips'} onClick={() => setActiveTab('tips')} className="btn-tab">{lang.savingTips}</button>
                            </div>
                            <div className="p-2">
                                {renderActiveView()}
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-column">
                        <div className="panel">
                            <div className="panel-header">{lang.monthlyConsumption}</div>
                            <ul className="panel-body list-none">
                                <li><b>Jul 2025:</b> 12000 L</li>
                                <li><b>Jun 2025:</b> 12500 L</li>
                                <li><b>May 2025:</b> 11000 L</li>
                                <li><b>Apr 2025:</b> 9000 L</li>
                            </ul>
                        </div>
                    </div>
                </div>
              </main>

              <footer className="status-bar">
                <p className="status-bar-field">UPM Water & Sanitation</p>
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
