import React, { useState } from "react";
import CourseCard from "./CourseCard.jsx";
import CalendarModal from "./CalendarModal.jsx";
import { useScrollRefs } from "../context/ScrollContext.jsx";
import { courses } from "./Courses.jsx";

const CourseList = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const { coursesRef } = useScrollRefs();
  return (
    <section id="courses" ref={coursesRef} className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Available Courses
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose from our carefully crafted coding courses. Each session is
            limited to ensure quality interaction and personalized attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onBook={() => handleBookCourse(course)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && selectedCourse && (
        <CalendarModal course={selectedCourse} onClose={closeModal} />
      )}
    </section>
  );
};

export default CourseList;
