import React from "react";
import { useScrollRefs } from "../context/ScrollContext.jsx";
import { FaBell, FaFire, FaClock } from "react-icons/fa";

const ReminderSection = () => {
  const { coursesRef } = useScrollRefs();
  return (
    <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reminder */}
          <div className="bg-dark-800 rounded-xl p-6 border border-primary-500">
            <div className="flex items-center mb-4">
              <FaBell className="text-primary-500 text-2xl mr-3" />
              <h3 className="text-xl font-bold text-white">Don't Forget!</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Limited spots available in our most popular courses. Book now to
              secure your place!
            </p>
            <button
              onClick={() => {
                if (coursesRef.current) {
                  coursesRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="btn-primary w-full"
            >
              Book Your Course
            </button>
          </div>

          {/* Motivation  */}
          <div
            className=" rounded-xl p-6 border-2 border-[#2563eb]  shadow-lg flex flex-col 
          justify-center items-center animate-fade-in"
          >
            <div className="flex items-center mb-4">
              <FaFire className="text-primary-400 text-3xl mr-3 animate-spin-slow" />
              <h3 className="text-xl font-extrabold text-white tracking-wide">
                Why Code Buddy?
              </h3>
            </div>
            <p className="text-white text-center text-lg mb-2 font-mono">
              💡 With Code Buddy, you get more than just a course: <br />
              <span className="text-primary-300 font-bold">
                Personal support, real projects, and a community that helps you
                grow.
              </span>
            </p>
            <button
              className="bg-white hover:bg-primary-100 text-[#2563eb] font-bold py-2 px-4 
              rounded-xl shadow-md transition duration-300 ease-in-out mt-2 animate-bounce border border-primary-400"
              onClick={() =>
                window.open("mailto:support@codebuddy.de", "_blank")
              }
            >
              Contact Support
            </button>
            <span className="text-primary-200 font-mono mt-4 text-sm">
              #GrowTogether #CodeBuddy
            </span>
          </div>

          {/* Coming Soon */}
          <div className="bg-dark-800 rounded-xl p-6 border border-green-500">
            <div className="flex items-center mb-4">
              <FaClock className="text-green-500 text-2xl mr-3" />
              <h3 className="text-xl font-bold text-white">Coming Soon</h3>
            </div>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li>• Mobile App Development</li>
              <li>• Database Design</li>
              <li>• DevOps Fundamentals</li>
            </ul>
            <p className="text-green-500 font-semibold">Launch: January 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReminderSection;
