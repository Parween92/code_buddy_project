import React from "react";
import { useScrollRefs } from "../context/ScrollContext.jsx";
const Hero = () => {
  const { coursesRef } = useScrollRefs();
  const scrollToCourses = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black py-10 sm:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
          Learn to <span className="text-primary-500">Code</span> with Experts
        </h1>
        <p className="text-base sm:text-xl text-gray-300 mb-5 sm:mb-8 max-w-md sm:max-w-3xl mx-auto">
          Join our interactive online coding classes and master programming
          skills with experienced instructors. Small group sessions for
          personalized learning.
        </p>
        <button
          onClick={scrollToCourses}
          className="btn-primary text-base sm:text-lg px-4 py-2 sm:px-6 sm:py-3"
        >
          Browse Courses
        </button>
      </div>
    </section>
  );
};

export default Hero;
