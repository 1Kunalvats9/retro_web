"use client";

import React, { useState } from "react";
import Link from 'next/link';

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Electricity Services",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    avgConsumption: "Avg. Consumption",
    lastBillPaid: "Last Bill Paid",
    nextBillDate: "Next Bill Date",
    quickActions: "Quick Actions",
    payBill: "Pay Bill",
    viewHistory: "View History",
    reportOutage: "Report Outage",
    savingTips: "Saving Tips",
    checkAndPayBill: "Check & Pay Your Electricity Bill",
    consumerNumber: "Consumer Number",
    consumerNumberPlaceholder: "Enter your 10-digit consumer number",
    consumerNumberHint: "* Your unique 10-digit account identifier.",
    checking: "Checking...",
    checkBill: "Check Bill",
    billDetails: "Bill Details",
    billingPeriod: "Billing Period",
    dueDate: "Due Date",
    amountDue: "Amount Due",
    payNow: "Pay Now",
    cancel: "Cancel",
    paymentDetails: "Payment Details",
    cardholderName: "Cardholder Name",
    cardholderNamePlaceholder: "Enter name as on card",
    amountToPay: "Amount to Pay",
    confirmPayment: "Confirm Payment",
    back: "Back",
    monthlyConsumption: "Monthly Consumption (kWh)",
    reportPowerOutage: "Report a Power Outage",
    reportOutageSubtitle: "Experiencing a power cut? Let us know so we can resolve it quickly.",
    issueType: "Issue Type",
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
    paymentSuccessMessage: "Thank you for your payment.",
    receiptNumber: "Your receipt number is:",
    done: "Done",
    changeToHindi: "हिंदी में",
  },
  hi: {
    portalTitle: "यूपीएम बिजली सेवाएं",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    avgConsumption: "औसत खपत",
    lastBillPaid: "पिछला बिल भुगतान",
    nextBillDate: "अगली बिल तिथि",
    quickActions: "त्वरित कार्रवाई",
    payBill: "बिल भुगतान करें",
    viewHistory: "इतिहास देखें",
    reportOutage: "आउटेज की रिपोर्ट करें",
    savingTips: "बचत युक्तियाँ",
    checkAndPayBill: "अपना बिजली बिल जांचें और भुगतान करें",
    consumerNumber: "उपभोक्ता संख्या",
    consumerNumberPlaceholder: "अपनी 10 अंकों की उपभोक्ता संख्या दर्ज करें",
    consumerNumberHint: "* आपका अद्वितीय 10-अंकीय खाता पहचानकर्ता।",
    checking: "जाँच हो रही है...",
    checkBill: "बिल जांचें",
    billDetails: "बिल विवरण",
    billingPeriod: "बिलिंग अवधि",
    dueDate: "देय तिथि",
    amountDue: "देय राशि",
    payNow: "अभी भुगतान करें",
    cancel: "रद्द करें",
    paymentDetails: "भुगतान विवरण",
    cardholderName: "कार्डधारक का नाम",
    cardholderNamePlaceholder: "कार्ड पर जैसा नाम है वैसा दर्ज करें",
    amountToPay: "भुगतान की जाने वाली राशि",
    confirmPayment: "भुगतान की पुष्टि करें",
    back: "वापस",
    monthlyConsumption: "मासिक खपत (kWh)",
    reportPowerOutage: "बिजली कटौती की रिपोर्ट करें",
    reportOutageSubtitle: "बिजली कटौती का सामना कर रहे हैं? हमें बताएं ताकि हम इसे जल्दी से हल कर सकें।",
    issueType: "समस्या का प्रकार",
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
    paymentSuccessMessage: "आपके भुगतान के लिए धन्यवाद।",
    receiptNumber: "आपकी रसीद संख्या है:",
    done: "पूर्ण",
    changeToEnglish: "English",
  },
};


// --- Helper Components ---

// Card for displaying key metrics
const MetricCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-stone-200">
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <div>
        <p className="text-stone-600 text-sm">{title}</p>
        <p className="text-xl font-bold text-stone-800">{value}</p>
      </div>
    </div>
  </div>
);

// Bar chart for consumption history
const ConsumptionChart = ({ lang }) => {
  const data = [
    { month: "Feb", usage: 120 },
    { month: "Mar", usage: 150 },
    { month: "Apr", usage: 130 },
    { month: "May", usage: 160 },
    { month: "Jun", usage: 180 },
    { month: "Jul", usage: 210 },
  ];
  const maxUsage = Math.max(...data.map(d => d.usage), 1);

  return (
    <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
      <h3 className="text-lg font-bold text-stone-800 mb-4">{lang.monthlyConsumption}</h3>
      <div className="flex justify-around items-end h-48 border-b border-stone-200 pb-2">
        {data.map((item) => (
          <div key={item.month} className="flex flex-col items-center w-1/6">
            <div 
              className="w-8 bg-yellow-400 hover:bg-yellow-500 rounded-t-md transition-all duration-200"
              style={{ height: `${(item.usage / maxUsage) * 100}%`, minHeight: '2px' }}
              title={`${item.usage} kWh`}
            ></div>
            <span className="text-xs font-medium text-stone-600 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Modal for payment success
const PaymentSuccessModal = ({ receiptNumber, onClose, lang }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-800 mb-2">{lang.paymentSuccessTitle}</h2>
            <p className="text-stone-600 mb-4">{lang.paymentSuccessMessage}</p>
            <div className="bg-stone-100 border border-stone-200 p-3 rounded-lg mb-6">
                <p className="text-sm text-stone-700">{lang.receiptNumber}</p>
                <p className="font-mono font-bold text-lg text-stone-800">{receiptNumber}</p>
            </div>
            <button
                onClick={onClose}
                className="w-full bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors"
            >
                {lang.done}
            </button>
        </div>
    </div>
);


export default function ElectricityBillPage() {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [billAmount, setBillAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [language, setLanguage] = useState('en');

  const lang = translations[language];

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
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif] text-stone-800">
       {paymentSuccess && <PaymentSuccessModal receiptNumber={receipt} onClose={closeSuccessModal} lang={lang} />}

      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">⚡</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <MetricCard icon="💡" title={lang.avgConsumption} value="158 kWh" color="bg-blue-500" />
            <MetricCard icon="💰" title={lang.lastBillPaid} value="₹ 1850.75" color="bg-green-500" />
            <MetricCard icon="📅" title={lang.nextBillDate} value="15-09-2025" color="bg-purple-500" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6 mb-6 sticky top-28">
              <h2 className="text-xl font-bold text-stone-800 mb-5 border-b border-stone-200 pb-2">
                {lang.quickActions}
              </h2>
              <div className="space-y-3">
                <a href="#bill-payment" className="block text-stone-600 hover:text-amber-600 font-medium p-2 rounded-lg hover:bg-amber-50">
                  � {lang.payBill}
                </a>
                <a href="#consumption-history" className="block text-stone-600 hover:text-amber-600 font-medium p-2 rounded-lg hover:bg-amber-50">
                  📊 {lang.viewHistory}
                </a>
                <a href="#report-outage" className="block text-stone-600 hover:text-amber-600 font-medium p-2 rounded-lg hover:bg-amber-50">
                  🔧 {lang.reportOutage}
                </a>
                <a href="#saving-tips" className="block text-stone-600 hover:text-amber-600 font-medium p-2 rounded-lg hover:bg-amber-50">
                  🌱 {lang.savingTips}
                </a>
              </div>
            </div>
          </aside>

          <div className="w-full lg:w-3/4">
            <section id="bill-payment" className="bg-white rounded-xl shadow-md border border-stone-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-stone-800 mb-6 text-center">
                {lang.checkAndPayBill}
              </h2>

              {!billAmount ? (
                <form onSubmit={handleCheckBill} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <div className="mb-5">
                    <label className="block text-stone-700 font-semibold mb-2">{lang.consumerNumber}</label>
                    <input type="text" value={consumerNumber} onChange={(e) => setConsumerNumber(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500" placeholder={lang.consumerNumberPlaceholder} required pattern="[0-9]{10}" />
                    <p className="text-stone-500 text-sm mt-1">{lang.consumerNumberHint}</p>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-amber-700 flex items-center justify-center space-x-2">
                    {isLoading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <span>🔍</span>}
                    <span>{isLoading ? lang.checking : lang.checkBill}</span>
                  </button>
                </form>
              ) : (
                <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in">
                  {!showPaymentForm ? (
                    <>
                      <h3 className="text-xl font-bold text-stone-800 mb-5 text-center">{lang.billDetails}</h3>
                      <div className="bg-white border border-stone-200 p-5 mb-6 rounded-lg">
                        <div className="flex justify-between pb-3 mb-3 border-b"><span className="font-semibold">{lang.consumerNumber}:</span> <span className="font-mono">{consumerNumber}</span></div>
                        <div className="flex justify-between pb-3 mb-3 border-b"><span className="font-semibold">{lang.billingPeriod}:</span> <span>July 2025</span></div>
                        <div className="flex justify-between pb-3 mb-3 border-b"><span className="font-semibold">{lang.dueDate}:</span> <span className="font-bold text-red-600">30-08-2025</span></div>
                        <div className="flex justify-between text-2xl"><span className="font-semibold">{lang.amountDue}:</span> <span className="font-bold text-green-600">₹ {billAmount.toFixed(2)}</span></div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => setShowPaymentForm(true)} className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700">💳 {lang.payNow}</button>
                        <button onClick={() => setBillAmount(null)} className="flex-1 bg-stone-200 text-stone-800 font-semibold py-3 px-4 rounded-lg hover:bg-stone-300">❌ {lang.cancel}</button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <h3 className="text-xl font-bold text-stone-800 text-center">{lang.paymentDetails}</h3>
                      <div>
                        <label className="block text-stone-700 font-semibold mb-2">{lang.cardholderName}</label>
                        <input type="text" className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500" placeholder={lang.cardholderNamePlaceholder} required />
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-4 text-blue-800 rounded-lg"><p className="font-semibold text-center">{lang.amountToPay}: ₹ {billAmount.toFixed(2)}</p></div>
                      <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700">💳 {lang.confirmPayment}</button>
                      <button type="button" onClick={() => setShowPaymentForm(false)} className="w-full text-stone-600 font-medium">← {lang.back}</button>
                    </form>
                  )}
                </div>
              )}
            </section>
            
            <section id="consumption-history" className="mb-8">
                <ConsumptionChart lang={lang} />
            </section>

            <section id="report-outage" className="bg-white rounded-xl shadow-md border border-stone-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-stone-800 mb-4 text-center">{lang.reportPowerOutage}</h2>
                <p className="text-center text-stone-600 mb-6">{lang.reportOutageSubtitle}</p>
                <form className="space-y-4">
                    <div>
                        <label className="block text-stone-700 font-semibold mb-2">{lang.issueType}</label>
                        <select className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black">
                            <option>{lang.noPowerMyLoc}</option>
                            <option>{lang.noPowerArea}</option>
                            <option>{lang.flickeringLights}</option>
                            <option>{lang.otherIssue}</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700">{lang.submitReport}</button>
                </form>
            </section>

            <section id="saving-tips">
                <h2 className="text-2xl font-bold text-stone-800 mb-4 text-center">{lang.energySavingTips}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-stone-200">
                        <h4 className="font-bold text-green-700 mb-2">{lang.switchToLed}</h4>
                        <p className="text-sm text-stone-600">{lang.ledDescription}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-stone-200">
                        <h4 className="font-bold text-green-700 mb-2">{lang.unplugDevices}</h4>
                        <p className="text-sm text-stone-600">{lang.unplugDescription}</p>
                    </div>
                </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-stone-800 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-stone-400 text-sm">
            © 1999-2025 United Pingdom of MINET - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
