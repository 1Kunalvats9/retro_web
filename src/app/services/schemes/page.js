'use client';

import { useState } from 'react';
import Link from 'next/link';

const schemesData = [
  {
    id: 1,
    title: "Pradhan Mantri Awas Yojana (PMAY)",
    description: "Affordable housing scheme for urban and rural areas with interest subsidy and financial assistance",
    category: "Housing",
    eligibility: "Economically weaker sections, low-income groups, middle-income groups",
    benefits: "Interest subsidy up to 6.5%, credit-linked subsidy, affordable housing units",
    applicationProcess: "Online application through PMAY portal or visit local municipal office",
    contact: "Ministry of Housing and Urban Affairs",
    website: "https://pmay-urban.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 2,
    title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
    description: "Health insurance scheme providing coverage up to ₹5 lakhs per family per year",
    category: "Healthcare",
    eligibility: "Families identified in SECC database, covering 10.74 crore families",
    benefits: "Cashless treatment, coverage for 1,393 medical procedures, pre and post hospitalization expenses",
    applicationProcess: "Automatic enrollment for eligible families, check status on portal",
    contact: "National Health Authority",
    website: "https://pmjay.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 3,
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description: "Direct income support of ₹6,000 per year to eligible farmer families",
    category: "Agriculture",
    eligibility: "Small and marginal farmers with cultivable land up to 2 hectares",
    benefits: "₹2,000 every 4 months, direct bank transfer, no middlemen",
    applicationProcess: "Online application through PM-KISAN portal or visit local agriculture office",
    contact: "Ministry of Agriculture and Farmers Welfare",
    website: "https://pmkisan.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 4,
    title: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
    description: "Guaranteed 100 days of employment per year for rural households",
    category: "Employment",
    eligibility: "Rural households willing to do unskilled manual work",
    benefits: "Guaranteed employment, minimum wages, unemployment allowance if work not provided",
    applicationProcess: "Apply at Gram Panchayat office, job card required",
    contact: "Ministry of Rural Development",
    website: "https://nrega.nic.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 5,
    title: "Pradhan Mantri Ujjwala Yojana",
    description: "Free LPG connections to women from below poverty line households",
    category: "Energy",
    eligibility: "Women from BPL households, SC/ST households, forest dwellers",
    benefits: "Free LPG connection, first refill and stove, EMI facility for refills",
    applicationProcess: "Apply through LPG distributors or online portal",
    contact: "Ministry of Petroleum and Natural Gas",
    website: "https://pmuy.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 6,
    title: "Pradhan Mantri Gram Sadak Yojana (PMGSY)",
    description: "Rural road connectivity program for unconnected habitations",
    category: "Infrastructure",
    eligibility: "Rural habitations with population of 500+ (250+ in hilly areas)",
    benefits: "All-weather road connectivity, improved access to markets and services",
    applicationProcess: "Implemented through state governments, contact local PWD office",
    contact: "Ministry of Rural Development",
    website: "https://pmgsy.nic.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 7,
    title: "Swachh Bharat Mission (SBM)",
    description: "Clean India mission focusing on sanitation and waste management",
    category: "Sanitation",
    eligibility: "All rural and urban areas, individual households",
    benefits: "Financial assistance for toilet construction, waste management infrastructure",
    applicationProcess: "Contact local municipality or Gram Panchayat",
    contact: "Ministry of Jal Shakti",
    website: "https://swachhbharatmission.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 8,
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance scheme protecting farmers against natural calamities",
    category: "Agriculture Insurance",
    eligibility: "All farmers growing notified crops in notified areas",
    benefits: "Comprehensive crop insurance, low premium rates, quick claim settlement",
    applicationProcess: "Apply through banks, insurance companies, or Common Service Centers",
    contact: "Ministry of Agriculture and Farmers Welfare",
    website: "https://pmfby.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 9,
    title: "Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY)",
    description: "Pension scheme for small and marginal farmers",
    category: "Social Security",
    eligibility: "Small and marginal farmers aged 18-40 years",
    benefits: "₹3,000 monthly pension after 60 years, government contribution",
    applicationProcess: "Online application or visit Common Service Centers",
    contact: "Ministry of Agriculture and Farmers Welfare",
    website: "https://pmkmy.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 10,
    title: "Pradhan Mantri Shram Yogi Maan Dhan (PM-SYM)",
    description: "Pension scheme for unorganized sector workers",
    category: "Social Security",
    eligibility: "Unorganized sector workers aged 18-40 years with monthly income up to ₹15,000",
    benefits: "₹3,000 monthly pension after 60 years, government contribution",
    applicationProcess: "Apply through Common Service Centers or online portal",
    contact: "Ministry of Labour and Employment",
    website: "https://maandhan.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 11,
    title: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    description: "Accident insurance scheme for bank account holders",
    category: "Insurance",
    eligibility: "Bank account holders aged 18-70 years",
    benefits: "₹2 lakh accident coverage, low premium of ₹12 per year",
    applicationProcess: "Auto-debit from bank account, opt-in through bank",
    contact: "Ministry of Finance",
    website: "https://jansuraksha.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  },
  {
    id: 12,
    title: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    description: "Life insurance scheme for bank account holders",
    category: "Insurance",
    eligibility: "Bank account holders aged 18-50 years",
    benefits: "₹2 lakh life coverage, low premium of ₹330 per year",
    applicationProcess: "Auto-debit from bank account, opt-in through bank",
    contact: "Ministry of Finance",
    website: "https://jansuraksha.gov.in",
    status: "Active",
    lastUpdated: "2024-12-01"
  }
];

const categories = ["All", "Housing", "Healthcare", "Agriculture", "Employment", "Energy", "Infrastructure", "Sanitation", "Agriculture Insurance", "Social Security", "Insurance"];

export default function SchemesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScheme, setSelectedScheme] = useState(null);

  const filteredData = schemesData.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSchemeClick = (scheme) => {
    setSelectedScheme(scheme);
  };

  const closeModal = () => {
    setSelectedScheme(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Government Schemes & Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore various government schemes and programs available for citizens across different sectors in India
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search government schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((scheme) => (
            <div 
              key={scheme.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleSchemeClick(scheme)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {scheme.category}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    scheme.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {scheme.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {scheme.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {scheme.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Eligibility:</span>
                    <p className="text-gray-600 text-sm">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Benefits:</span>
                    <p className="text-gray-600 text-sm">{scheme.benefits}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-gray-500 mb-3">
                    <span>Last Updated: {scheme.lastUpdated}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                      View Details
                    </button>
                    <a
                      href={scheme.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{schemesData.length}</div>
            <div className="text-gray-600">Total Schemes</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length - 1}</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Government Funded</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Online Access</div>
          </div>
        </div>

        {/* Back to Services */}
        <div className="mt-12 text-center">
          <Link 
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
          >
            ← Back to Services
          </Link>
        </div>
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedScheme.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {selectedScheme.category}
                  </span>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Description:</span>
                  <p className="text-gray-600 mt-1">{selectedScheme.description}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Eligibility:</span>
                  <p className="text-gray-600 mt-1">{selectedScheme.eligibility}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Benefits:</span>
                  <p className="text-gray-600 mt-1">{selectedScheme.benefits}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Application Process:</span>
                  <p className="text-gray-600 mt-1">{selectedScheme.applicationProcess}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Contact:</span>
                  <p className="text-gray-600 mt-1">{selectedScheme.contact}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-sm rounded-full ${
                    selectedScheme.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedScheme.status}
                  </span>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Last Updated:</span>
                  <p className="text-gray-600 mt-1">{selectedScheme.lastUpdated}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t">
                <a
                  href={selectedScheme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Visit Official Website
                </a>
                <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}