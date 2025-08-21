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
    <section className="bg-black py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-4xl font-bold text-white mb-6">
          Learn to <span className="text-primary-500">Code</span> with Experts
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Join our interactive online coding classes and master programming
          skills with experienced instructors. Small group sessions for
          personalized learning.
        </p>
        <button onClick={scrollToCourses} className="btn-primary text-lg">
          Browse Courses
        </button>
      </div>
    </section>
  );
};

export default Hero;
