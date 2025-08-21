import React from "react";
import { useScrollRefs } from "../context/ScrollContext.jsx";

const Navbar = () => {
  const { dashboardRef, coursesRef } = useScrollRefs();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToDashboard = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToCourses = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-dark-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span
              className="text-xl lg:text-xl md:text-xl font-bold text-primary-500 cursor-pointer"
              onClick={scrollToTop}
            >
              Code Buddy
            </span>
          </div>
          <div className="flex items-center space-x-6 ">
            <button
              className="text-sm text-gray-300 hover:text-primary-500 transition-colors btn-primary"
              onClick={scrollToCourses}
            >
              DevTraining
            </button>
            <button
              className="text-sm text-gray-300 hover:text-primary-500 transition-colors btn-primary"
              onClick={scrollToDashboard}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
