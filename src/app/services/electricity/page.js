"use client";

import React, { useState } from "react";

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Electricity Services",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    quickActions: "Quick Actions",
    payBill: "Pay Bill",
    viewHistory: "View History",
    reportOutage: "Report Outage",
    savingTips: "Saving Tips",
    checkAndPayBill: "Check & Pay Your Electricity Bill",
    consumerNumber: "Consumer Number:",
    checking: "Checking...",
    checkBill: "Check Bill",
    billDetails: "Bill Details",
    billingPeriod: "Billing Period:",
    dueDate: "Due Date:",
    amountDue: "Amount Due:",
    payNow: "Pay Now",
    cancel: "Cancel",
    paymentDetails: "Payment Details",
    cardholderName: "Cardholder Name:",
    amountToPay: "Amount to Pay",
    confirmPayment: "Confirm Payment",
    back: "Back",
    monthlyConsumption: "Monthly Consumption History",
    reportPowerOutage: "Report a Power Outage",
    issueType: "Issue Type:",
    noPowerMyLoc: "No Power (My location only)",
    noPowerArea: "No Power (Entire area)",
    flickeringLights: "Flickering Lights",
    otherIssue: "Other Issue",
    submitReport: "Submit Report",
    energySavingTips: "Energy Saving Tips",
    switchToLed: "Switch to LED",
    ledDescription: "LED bulbs use up to 85% less energy and last much longer than traditional bulbs.",
    unplugDevices: "Unplug Unused Devices",
    unplugDescription: "Appliances on standby mode still consume power. Unplug them when not in use.",
    paymentSuccessTitle: "Payment Successful!",
    paymentSuccessMessage: "Thank you for your payment. Your receipt number is:",
    done: "Done",
    changeToHindi: "हिंदी",
    changeToEnglish: "English",
    avgConsumption: "Avg. Consumption",
    lastBillPaid: "Last Bill Paid",
    nextBillDate: "Next Bill Date",
  },
  hi: {
    portalTitle: "यूपीएम बिजली सेवाएं",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    quickActions: "त्वरित कार्रवाई",
    payBill: "बिल भुगतान करें",
    viewHistory: "इतिहास देखें",
    reportOutage: "आउटेज की रिपोर्ट करें",
    savingTips: "बचत युक्तियाँ",
    checkAndPayBill: "अपना बिजली बिल जांचें और भुगतान करें",
    consumerNumber: "उपभोक्ता संख्या:",
    checking: "जाँच हो रही है...",
    checkBill: "बिल जांचें",
    billDetails: "बिल विवरण",
    billingPeriod: "बिलिंग अवधि:",
    dueDate: "देय तिथि:",
    amountDue: "देय राशि:",
    payNow: "अभी भुगतान करें",
    cancel: "रद्द करें",
    paymentDetails: "भुगतान विवरण",
    cardholderName: "कार्डधारक का नाम:",
    amountToPay: "भुगतान की जाने वाली राशि",
    confirmPayment: "भुगतान की पुष्टि करें",
    back: "वापस",
    monthlyConsumption: "मासिक खपत इतिहास",
    reportPowerOutage: "बिजली कटौती की रिपोर्ट करें",
    issueType: "समस्या का प्रकार:",
    noPowerMyLoc: "कोई बिजली नहीं (केवल मेरा स्थान)",
    noPowerArea: "कोई बिजली नहीं (पूरा क्षेत्र)",
    flickeringLights: "टिमटिमाती बत्तियाँ",
    otherIssue: "अन्य समस्या",
    submitReport: "रिपोर्ट सबमिट करें",
    energySavingTips: "ऊर्जा बचत युक्तियाँ",
    switchToLed: "एलईडी पर स्विच करें",
    ledDescription: "एलईडी बल्ब 85% तक कम ऊर्जा का उपयोग करते हैं और पारंपरिक बल्बों की तुलना में बहुत अधिक समय तक चलते हैं।",
    unplugDevices: "अप्रयुक्त उपकरणों को अनप्लग करें",
    unplugDescription: "स्टैंडबाय मोड पर उपकरण अभी भी बिजली की खपत करते हैं। उपयोग में न होने पर उन्हें अनप्लग करें।",
    paymentSuccessTitle: "भुगतान सफल!",
    paymentSuccessMessage: "आपके भुगतान के लिए धन्यवाद। आपकी रसीद संख्या है:",
    done: "पूर्ण",
    changeToEnglish: "English",
    changeToHindi: "हिंदी",
    avgConsumption: "औसत खपत",
    lastBillPaid: "पिछला बिल भुगतान",
    nextBillDate: "अगली बिल तिथि",
  },
};

// --- Helper Components ---
const LoadingSpinner = () => <div className="spinner"></div>;

// --- Content View Components ---

const PayBillView = ({ lang }) => {
  const [consumerNumber, setConsumerNumber] = useState("1234567890");
  const [billAmount, setBillAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receipt, setReceipt] = useState("");

  const handleCheckBill = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const amount = Math.floor(Math.random() * 4500) + 500;
      setBillAmount(amount);
      setIsLoading(false);
    }, 1500);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const receiptNumber = "ELEC-" + Math.floor(Math.random() * 1000000);
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
    <div className="panel">
      <div className="panel-header">{lang.checkAndPayBill}</div>
      <div className="panel-body">
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
              <p><b>{lang.consumerNumber}</b> {consumerNumber}</p>
              <p><b>{lang.billingPeriod}</b> July 2025</p>
              <p><b>{lang.dueDate}</b> 30-08-2025</p>
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
              <div className="field-row-stacked">
                <label htmlFor="card-name">{lang.cardholderName}</label>
                <input id="card-name" type="text" required />
              </div>
              <p><b>{lang.amountToPay}:</b> ₹ {billAmount.toFixed(2)}</p>
            </fieldset>
            <section className="field-row mt-2" style={{ justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowPaymentForm(false)}>{lang.back}</button>
              <button type="submit" className="ml-2">{lang.confirmPayment}</button>
            </section>
          </form>
        )}
      </div>
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
    </div>
  );
};

const HistoryView = ({ lang }) => (
  <div className="panel">
    <div className="panel-header">{lang.monthlyConsumption}</div>
    <div className="panel-body">
      <div className="sunken-panel">
        <ul className="p-2">
          <li><b>Jul 2025:</b> 210 kWh</li>
          <li><b>Jun 2025:</b> 180 kWh</li>
          <li><b>May 2025:</b> 160 kWh</li>
          <li><b>Apr 2025:</b> 130 kWh</li>
          <li><b>Mar 2025:</b> 150 kWh</li>
          <li><b>Feb 2025:</b> 120 kWh</li>
        </ul>
      </div>
    </div>
  </div>
);

const ReportOutageView = ({ lang }) => (
  <div className="panel">
    <div className="panel-header">{lang.reportPowerOutage}</div>
    <div className="panel-body">
      <form>
        <div className="field-row-stacked">
          <label htmlFor="issue-type">{lang.issueType}</label>
          <select id="issue-type">
            <option>{lang.noPowerMyLoc}</option>
            <option>{lang.noPowerArea}</option>
            <option>{lang.flickeringLights}</option>
            <option>{lang.otherIssue}</option>
          </select>
        </div>
        <section className="field-row mt-2" style={{ justifyContent: 'flex-end' }}>
          <button type="submit">{lang.submitReport}</button>
        </section>
      </form>
    </div>
  </div>
);

const SavingTipsView = ({ lang }) => (
  <div className="panel">
    <div className="panel-header">{lang.energySavingTips}</div>
    <div className="panel-body">
      <div className="sunken-panel p-2">
        <p><b>{lang.switchToLed}</b></p>
        <p className="text-xs mb-2">{lang.ledDescription}</p>
        <p><b>{lang.unplugDevices}</b></p>
        <p className="text-xs">{lang.unplugDescription}</p>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function ElectricityBillPage() {
  const [language, setLanguage] = useState('en');
  const [activeView, setActiveView] = useState('pay');

  const lang = translations[language];

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  const iconUrl = (name) => `https://placehold.co/16x16/d4d0c8/000000?text=${name.charAt(0)}`;

  const renderActiveView = () => {
    switch (activeView) {
      case 'pay': return <PayBillView lang={lang} />;
      case 'history': return <HistoryView lang={lang} />;
      case 'report': return <ReportOutageView lang={lang} />;
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
                  <img src={iconUrl("ELEC")} alt="UPM Electricity Logo" className="title-bar-icon" />
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
                    {renderActiveView()}
                  </div>
                  <div className="sidebar-column">
                    <div className="panel">
                      <div className="panel-header">{lang.quickActions}</div>
                      <ul className="panel-body list-none">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('pay'); }}>› {lang.payBill}</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('history'); }}>› {lang.viewHistory}</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('report'); }}>› {lang.reportOutage}</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveView('tips'); }}>› {lang.savingTips}</a></li>
                      </ul>
                    </div>
                     <div className="panel mt-3">
                        <div className="panel-header">Account Info</div>
                         <ul className="panel-body list-none">
                            <li><b>{lang.avgConsumption}:</b> 158 kWh</li>
                            <li><b>{lang.lastBillPaid}:</b> ₹ 1850.75</li>
                            <li><b>{lang.nextBillDate}:</b> 15-09-2025</li>
                        </ul>
                    </div>
                  </div>
                </div>
              </main>

              <footer className="status-bar">
                <p className="status-bar-field">UPM Electricity Services</p>
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
