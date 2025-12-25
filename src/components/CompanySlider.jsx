import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, ExternalLink } from 'lucide-react';

const companies = [
   {
    id: 1,
    name: "Yettel d.o.o Beograd",
    logo: "./yettel.png",
    rating: 0,
    reviews: 0,
    salaries: 0,
    tech: ["java", "hibernate", "rest", "git", "linux", "jenkins"],
    benefits: ["Education, professional development", "Hybrid work model", "Family and parenthood"]
  },
  {
    id: 2,
    name: "A1 Srbija d.o.o",
    logo: "./A1_Logo_Red.jpg",
    rating: 0,
    reviews: 0,
    salaries: 0,
    tech: ["java", ".net", "sql", "azure", "angular"],
    benefits: ["Private health insurance", "Gym membership", "Flexible hours"]
  },
  {
    id: 3,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png",
    rating: 0,
    reviews: 0,
    salaries: 0,
    tech: ["c++", "c#", "azure", "typescript", "react"],
    benefits: ["Stock options", "Paid sabbatical", "On-site gym"]
  },
  {
    id: 4,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    rating: 0,
    reviews: 0,
    salaries: 0,
    tech: ["python", "go", "tensorflow", "kubernetes", "java"],
    benefits: ["Free gourmet meals", "20% project time", "Extensive health plan"]
  },
  {
    id: 5,
    name: "databricks",
    logo: "./databricks.png",
    rating: 0,
    reviews: 0,
    salaries: 0,
    tech: ["unity", "python", "aws", "react"],
    benefits: ["Unlimited vacation", "Personal travel budget", "Game room"]
  }

];

const CompanySlider = () => {
  return (
    <div className="bg-slate-50 py-16 px-4">
      <h2 className="text-center text-2xl font-bold">Istaknute kompanije</h2>
    </div>
  );
};

export default CompanySlider;