'use client';

import { useState } from 'react';
import Link from 'next/link';

const educationData = [
  {
    id: 1,
    title: "PM Poshan Shakti Nirman (Mid-Day Meal Scheme)",
    description: "Free nutritious meals for students in government and government-aided schools from classes 1-8",
    eligibility: "Students in government schools, classes 1-8",
    benefits: "Free lunch, improved nutrition, increased attendance",
    applicationProcess: "Automatic enrollment for students in eligible schools",
    contact: "Ministry of Education, Government of India",
    website: "https://education.gov.in/mid-day-meal",
    category: "Nutrition"
  },
  {
    id: 2,
    title: "Beti Bachao Beti Padhao",
    description: "Comprehensive scheme for girl child education, protection, and empowerment",
    eligibility: "Girl students from birth to 18 years",
    benefits: "Education support, skill development, financial assistance",
    applicationProcess: "Contact local Anganwadi centers or schools",
    contact: "Ministry of Women and Child Development",
    website: "https://wcd.nic.in/bbbp",
    category: "Girl Child Education"
  },
  {
    id: 3,
    title: "PM Vidya Lakshmi Portal",
    description: "Centralized portal for education loans from multiple banks",
    eligibility: "Students pursuing higher education in India or abroad",
    benefits: "Easy loan application, multiple bank options, tracking",
    applicationProcess: "Online application through portal",
    contact: "Department of Financial Services",
    website: "https://www.vidyalakshmi.co.in",
    category: "Education Loans"
  },
  {
    id: 4,
    title: "National Scholarship Portal",
    description: "One-stop solution for various government scholarships",
    eligibility: "Students from different categories (SC/ST/OBC/Minority)",
    benefits: "Financial assistance for education, merit-based support",
    applicationProcess: "Online application with required documents",
    contact: "Ministry of Electronics and IT",
    website: "https://scholarships.gov.in",
    category: "Scholarships"
  },
  {
    id: 5,
    title: "Skill India Mission",
    description: "Skill development and vocational training programs",
    eligibility: "Youth aged 15-45 years",
    benefits: "Free training, certification, job placement assistance",
    applicationProcess: "Register at nearest training center",
    contact: "Ministry of Skill Development and Entrepreneurship",
    website: "https://www.msde.gov.in/skill-india",
    category: "Skill Development"
  },
  {
    id: 6,
    title: "Digital India e-Learning",
    description: "Free online courses and digital learning resources",
    eligibility: "All students and learners",
    benefits: "Free courses, certificates, flexible learning",
    applicationProcess: "Direct access through portal",
    contact: "Ministry of Electronics and IT",
    website: "https://www.digitalindia.gov.in",
    category: "Digital Learning"
  },
  {
    id: 7,
    title: "PM Kaushal Vikas Yojana",
    description: "Short-term skill training for unemployed youth",
    eligibility: "Unemployed youth aged 15-45 years",
    benefits: "Free training, stipend, placement support",
    applicationProcess: "Online registration or visit training centers",
    contact: "National Skill Development Corporation",
    website: "https://pmkvyofficial.org",
    category: "Vocational Training"
  },
  {
    id: 8,
    title: "National Education Policy 2020 Implementation",
    description: "Comprehensive reforms in education system",
    eligibility: "All students and educational institutions",
    benefits: "Modern curriculum, skill integration, holistic development",
    applicationProcess: "Implemented through schools and colleges",
    contact: "Ministry of Education",
    website: "https://education.gov.in/nep",
    category: "Policy Implementation"
  }
];

const categories = ["All", "Nutrition", "Girl Child Education", "Education Loans", "Scholarships", "Skill Development", "Digital Learning", "Vocational Training", "Policy Implementation"];

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = educationData.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Educational Resources & Schemes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover government educational programs, scholarships, and resources available for students across India
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search educational resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {resource.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {resource.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Eligibility:</span>
                    <p className="text-gray-600 text-sm">{resource.eligibility}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Benefits:</span>
                    <p className="text-gray-600 text-sm">{resource.benefits}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>Contact: {resource.contact}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Visit Website
                    </a>
                    <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{educationData.length}</div>
            <div className="text-gray-600">Total Programs</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">8</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Free Access</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Online Support</div>
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
    </div>
  );
}