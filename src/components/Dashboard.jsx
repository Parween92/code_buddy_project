import React from "react";
import { FaUser, FaCalendar, FaTrash } from "react-icons/fa";
import { useLocalBookings } from "../hooks/useLocalBookings.jsx";
import { courses } from "./Courses.jsx";
import { SiBookstack } from "react-icons/si";
import { useScrollRefs } from "../context/ScrollContext.jsx";

const Dashboard = () => {
  const { getAllBookings, removeBooking } = useLocalBookings();
  const bookings = getAllBookings();

  const getCourseDetails = (courseId) => {
    return courses.find((course) => course.id === courseId);
  };

  const handleRemoveBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      removeBooking(bookingId);
    }
  };

  const { dashboardRef } = useScrollRefs();
  return (
    <section id="dashboard" ref={dashboardRef} className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            My Bookings
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            View and manage your booked courses.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 flex items-center flex-col">
            <div className="text-blue-500 text-6xl mb-4">
              <SiBookstack />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              No Bookings Yet
            </h3>
            <p className="text-gray-300 mb-6">
              You haven't booked any courses yet. Browse our courses and start
              learning!
            </p>
            <button
              onClick={() => {
                const { coursesRef } = require("../ScrollContext.jsx");
                if (coursesRef && coursesRef.current) {
                  coursesRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="btn-primary"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const courseDetails = getCourseDetails(booking.courseId);
              return (
                <div
                  key={booking.id}
                  className="bg-dark-800 rounded-xl p-6 border border-dark-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      {booking.courseName}
                    </h3>
                    <button
                      onClick={() => handleRemoveBooking(booking.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Cancel booking"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300 text-sm">
                      <FaUser className="mr-2 text-primary-500" />
                      <span>{booking.name}</span>
                    </div>

                    <div className="flex items-center text-gray-300 text-sm">
                      <FaCalendar className="mr-2 text-primary-500" />
                      <span>{booking.time}</span>
                    </div>

                    {booking.email && (
                      <p className="text-gray-400 text-sm">
                        Email: {booking.email}
                      </p>
                    )}

                    <div className="pt-3 border-t border-dark-200">
                      <p className="text-primary-500 font-semibold">
                        {courseDetails?.price || "N/A"}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Booked on:{" "}
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
