"use client";

import React, { useState } from "react";
import Link from 'next/link';

// --- Language Translations ---
const translations = {
  en: {
    portalTitle: "UPM Water & Sanitation",
    portalSubtitle: "The United Pingdom of MINET",
    backToHome: "Back to Home",
    payBill: "Pay Bill",
    reportIssue: "Report Issue",
    savingTips: "Saving Tips",
    consumerNumber: "Consumer Number",
    consumerNumberPlaceholder: "Enter your 10-digit consumer number",
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
    noWaterSupply: "No Water Supply",
    pipeLeakage: "Pipe Leakage",
    waterQualityIssue: "Water Quality Issue",
    billingDispute: "Billing Dispute",
    provideMoreDetails: "Provide more details...",
    submitReport: "Submit Report",
    waterSavingTips: "Water Saving Tips",
    fixLeaks: "Fix Leaks Promptly",
    fixLeaksDescription: "A small drip can waste thousands of litres a year. Check all taps, pipes, and toilets regularly.",
    turnOffTap: "Turn Off the Tap",
    turnOffTapDescription: "Don't let water run while brushing your teeth or washing dishes.",
    monthlyConsumption: "Monthly Consumption (Litres)",
    paymentSuccessTitle: "Payment Successful!",
    paymentSuccessMessage: "Your payment has been processed.",
    receiptNumber: "Receipt Number:",
    done: "Done",
    rightsReserved: "© 1999-2025 United Pingdom of MINET - All Rights Reserved",
    changeToHindi: "हिंदी में",
  },
  hi: {
    portalTitle: "यूपीएम जल और स्वच्छता",
    portalSubtitle: "द यूनाइटेड पिंगडम ऑफ मिनेट",
    backToHome: "होम पर वापस जाएं",
    payBill: "बिल भुगतान करें",
    reportIssue: "समस्या की रिपोर्ट करें",
    savingTips: "बचत युक्तियाँ",
    consumerNumber: "उपभोक्ता संख्या",
    consumerNumberPlaceholder: "अपनी 10 अंकों की उपभोक्ता संख्या दर्ज करें",
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
    noWaterSupply: "पानी की आपूर्ति नहीं",
    pipeLeakage: "पाइप रिसाव",
    waterQualityIssue: "पानी की गुणवत्ता की समस्या",
    billingDispute: "बिलिंग विवाद",
    provideMoreDetails: "अधिक विवरण प्रदान करें...",
    submitReport: "रिपोर्ट सबमिट करें",
    waterSavingTips: "पानी बचाने के उपाय",
    fixLeaks: "लीक को तुरंत ठीक करें",
    fixLeaksDescription: "एक छोटी सी टपकन से साल में हजारों लीटर पानी बर्बाद हो सकता है। सभी नलों, पाइपों और शौचालयों की नियमित रूप से जाँच करें।",
    turnOffTap: "नल बंद करें",
    turnOffTapDescription: "दांतों को ब्रश करते समय या बर्तन धोते समय पानी को बहने न दें।",
    monthlyConsumption: "मासिक खपत (लीटर)",
    paymentSuccessTitle: "भुगतान सफल!",
    paymentSuccessMessage: "आपका भुगतान संसाधित हो गया है।",
    receiptNumber: "रसीद संख्या:",
    done: "पूर्ण",
    rightsReserved: "© 1999-2025 द यूनाइटेड पिंगडम ऑफ मिनेट - सर्वाधिकार सुरक्षित",
    changeToEnglish: "English",
  },
};


// --- Helper Components ---

const ConsumptionChart = ({ lang }) => {
  const data = [
    { month: "Feb", usage: 8000 },
    { month: "Mar", usage: 8500 },
    { month: "Apr", usage: 9000 },
    { month: "May", usage: 11000 },
    { month: "Jun", usage: 12500 },
    { month: "Jul", usage: 12000 },
  ];
  const maxUsage = Math.max(...data.map(d => d.usage), 1);

  return (
    <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
      <h3 className="text-lg font-bold text-stone-800 mb-4">{lang.monthlyConsumption}</h3>
      <div className="flex justify-around items-end h-48 border-b border-stone-200 pb-2">
        {data.map((item) => (
          <div key={item.month} className="flex flex-col items-center w-1/6">
            <div 
              className="w-8 bg-blue-400 hover:bg-blue-500 rounded-t-md transition-all duration-200"
              style={{ height: `${(item.usage / maxUsage) * 100}%`, minHeight: '2px' }}
              title={`${item.usage} Litres`}
            ></div>
            <span className="text-xs font-medium text-stone-600 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
            <button onClick={onClose} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700">{lang.done}</button>
        </div>
    </div>
);


export default function WaterServicesPage() {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [billAmount, setBillAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [activeTab, setActiveTab] = useState('pay_bill');
  const [language, setLanguage] = useState('en');

  const lang = translations[language];

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
  }
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const renderContent = () => {
      switch(activeTab) {
          case 'pay_bill':
            return (
                !billAmount ? (
                <form onSubmit={handleCheckBill} className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm">
                  <div className="mb-5">
                    <label className="block text-stone-700 font-semibold mb-2">{lang.consumerNumber}</label>
                    <input type="text" value={consumerNumber} onChange={(e) => setConsumerNumber(e.target.value)} className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500" placeholder={lang.consumerNumberPlaceholder} required pattern="[0-9]{10}" />
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
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
                        <div className="flex justify-between pb-3 mb-3 border-b"><span className="font-semibold">{lang.consumerNo}</span> <span className="font-mono">{consumerNumber}</span></div>
                        <div className="flex justify-between text-2xl"><span className="font-semibold">{lang.amountDue}</span> <span className="font-bold text-green-600">₹ {billAmount.toFixed(2)}</span></div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => setShowPaymentForm(true)} className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700">💳 {lang.payNow}</button>
                        <button onClick={() => setBillAmount(null)} className="flex-1 bg-stone-200 text-stone-800 font-semibold py-3 px-4 rounded-lg hover:bg-stone-300">❌ {lang.cancel}</button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <h3 className="text-xl font-bold text-stone-800 text-center">{lang.paymentDetails}</h3>
                      <p className="text-center font-semibold text-blue-700 bg-blue-50 p-3 rounded-lg">{lang.amountToPay} ₹ {billAmount.toFixed(2)}</p>
                      <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700">{lang.confirmPayment}</button>
                      <button type="button" onClick={() => setShowPaymentForm(false)} className="w-full text-stone-600 font-medium">← {lang.back}</button>
                    </form>
                  )}
                </div>
              )
            );
          case 'report_issue':
            return (
                <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in">
                    <h3 className="text-xl font-bold text-stone-800 mb-4">{lang.reportAnIssue}</h3>
                    <form className="space-y-4">
                        <select className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black">
                            <option>{lang.noWaterSupply}</option>
                            <option>{lang.pipeLeakage}</option>
                            <option>{lang.waterQualityIssue}</option>
                            <option>{lang.billingDispute}</option>
                        </select>
                        <textarea className="w-full bg-white border-2 border-stone-300 p-4 rounded-lg text-black placeholder-stone-500" rows="3" placeholder={lang.provideMoreDetails}></textarea>
                        <button type="submit" className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700">{lang.submitReport}</button>
                    </form>
                </div>
            );
          case 'tips':
            return (
                <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg shadow-sm animate-fade-in space-y-4">
                    <h3 className="text-xl font-bold text-stone-800 mb-4">{lang.waterSavingTips}</h3>
                    <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-bold text-blue-700">{lang.fixLeaks}</h4>
                        <p className="text-sm text-stone-600">{lang.fixLeaksDescription}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-bold text-blue-700">{lang.turnOffTap}</h4>
                        <p className="text-sm text-stone-600">{lang.turnOffTapDescription}</p>
                    </div>
                </div>
            );
          default: return null;
      }
  }

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter', 'Segoe UI', sans-serif] text-stone-800">
      {paymentSuccess && <PaymentSuccessModal receiptNumber={receipt} onClose={closeSuccessModal} lang={lang} />}

      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">💧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">{lang.portalTitle}</h1>
                <p className="text-stone-600 text-sm">{lang.portalSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
               <button onClick={toggleLanguage} className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-800">
                {language === 'en' ? lang.changeToHindi : lang.changeToEnglish}
              </button>
              <Link href="/" className="px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 shadow-sm">
                {lang.backToHome}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 p-8">
              <div className="border-b border-stone-200 mb-6">
                <nav className="flex space-x-4">
                  <button onClick={() => setActiveTab('pay_bill')} className={`py-2 px-4 font-semibold ${activeTab === 'pay_bill' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-stone-500'}`}>{lang.payBill}</button>
                  <button onClick={() => setActiveTab('report_issue')} className={`py-2 px-4 font-semibold ${activeTab === 'report_issue' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-stone-500'}`}>{lang.reportIssue}</button>
                  <button onClick={() => setActiveTab('tips')} className={`py-2 px-4 font-semibold ${activeTab === 'tips' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-stone-500'}`}>{lang.savingTips}</button>
                </nav>
              </div>
              {renderContent()}
            </div>
          </div>
          <div className="lg:col-span-1">
            <ConsumptionChart lang={lang} />
          </div>
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
