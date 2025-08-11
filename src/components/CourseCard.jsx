import React from "react";
import { FaClock, FaUsers } from "react-icons/fa";
import { useLocalBookings } from "../hooks/useLocalBookings.jsx";

const CourseCard = ({ course, onBook }) => {
  const { getBookingsForCourse } = useLocalBookings();
  const bookings = getBookingsForCourse(course.id);

  const getRandomSlots = () =>
    Math.floor(Math.random() * course.maxParticipants) + 1;
  const availableSlots = getRandomSlots();

  return (
    <div className="bg-dark-900 rounded-xl p-6 border border-dark-200 hover:border-primary-500 transition-colors duration-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">
          {course.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4">{course.description}</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-300 text-sm">
          <FaClock className="mr-2 text-primary-500" />
          <span>
            {course.duration} • {course.time}
          </span>
        </div>
        <div className="flex items-center text-gray-300 text-sm">
          <FaUsers className="mr-2 text-primary-500" />
          <span>
            {availableSlots} of {course.maxParticipants} slots available
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary-500">
          {course.price}
        </span>
        <button
          onClick={onBook}
          disabled={availableSlots === 0}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            availableSlots === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-primary-600 hover:bg-primary-700 text-white"
          }`}
        >
          {availableSlots === 0 ? "Fully Booked" : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
