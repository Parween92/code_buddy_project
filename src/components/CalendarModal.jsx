import React, { useState } from "react";
import { useScrollRefs } from "../context/ScrollContext.jsx";

import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocalBookings } from "../hooks/useLocalBookings.jsx";

const CalendarModal = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    selectedDate: null,
    selectedTime: null,
  });
  const { dashboardRef } = useScrollRefs();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addBooking, getBookingsForCourse } = useLocalBookings();

  const bookings = getBookingsForCourse(course.id);
  const availableSlots = course.maxParticipants - bookings.length;

  const generateCalendarDates = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const parseAvailableTimes = () => {
    return course.availableTimes.map((timeStr) => {
      const dayMatch = timeStr.match(
        /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/
      );
      const timeMatch = timeStr.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);

      const dayNames = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 0,
      };

      return {
        dayOfWeek: dayNames[dayMatch?.[1]] ?? null,
        startTime: timeMatch?.[1] ?? "",
        endTime: timeMatch?.[2] ?? "",
        fullText: timeStr,
      };
    });
  };

  const availableTimeSlots = parseAvailableTimes();

  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return false;

    return availableTimeSlots.some((slot) => slot.dayOfWeek === date.getDay());
  };

  const getTimesForDate = (date) => {
    return availableTimeSlots.filter(
      (slot) => slot.dayOfWeek === date.getDay()
    );
  };

  const handleDateSelect = (date) => {
    if (!isDateAvailable(date)) return;

    setFormData({
      ...formData,
      selectedDate: date,
      selectedTime: null,
    });
  };

  const handleTimeSelect = (timeSlot) => {
    setFormData({
      ...formData,
      selectedTime: timeSlot.fullText,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (availableSlots > 0 && formData.selectedDate && formData.selectedTime) {
      addBooking({
        courseId: course.id,
        courseName: course.title,
        name: formData.name,
        email: formData.email,
        time: formData.selectedTime,
        date: formData.selectedDate.toISOString().split("T")[0],
        bookingDate: new Date().toISOString(),
      });
      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
        if (dashboardRef.current) {
          dashboardRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    setFormData({
      ...formData,
      selectedTime: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-dark-800 rounded-xl p-8 max-w-md w-full border border-dark-200">
          <div className="text-center">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Booking Confirmed!
            </h3>
            <p className="text-white mb-6">
              Your spot in {course.title} has been reserved for{" "}
              {formData.selectedTime} on{" "}
              {formData.selectedDate?.toLocaleDateString()}.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  onClose();
                  if (dashboardRef.current) {
                    dashboardRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="btn-primary flex-1"
              >
                View My Bookings
              </button>
              <button onClick={onClose} className="btn-secondary flex-1">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dates = generateCalendarDates();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-800 rounded-xl p-8 max-w-4xl w-full border border-dark-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Book Course</h3>
          <button
            onClick={onClose}
            className="text hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">
            {course.title}
          </h4>
          <p className="text-gray-400 text-sm mb-2">{course.description}</p>
          <p className="text-white font-semibold">{course.price}</p>
          <p className="text-gray-400 text-sm">
            {availableSlots} slots remaining
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-dark-900 border border-dark-200 rounded-lg
                 text-white focus:outline-none focus:border-primary-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-200 rounded-lg
                 text-white focus:outline-none focus:border-primary-500"
                placeholder="Enter your email (optional)"
              />
            </div>
          </div>

          {/* Calendar */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Select Date *
            </label>
            <div className="bg-dark-900 rounded-lg p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1
                      )
                    )
                  }
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <FaChevronLeft />
                </button>
                <h4 className="text-white font-semibold text-lg">
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h4>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1
                      )
                    )
                  }
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <FaChevronRight />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-gray-400 text-sm py-2 font-medium"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {dates.map((date, index) => {
                  const isCurrentMonth =
                    date.getMonth() === currentMonth.getMonth();
                  const isAvailable = isDateAvailable(date);
                  const isSelected =
                    formData.selectedDate?.toDateString() ===
                    date.toDateString();
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      disabled={!isAvailable}
                      className={`
                        h-12 text-sm rounded-lg transition-all duration-200 font-medium border-2
                        ${
                          !isCurrentMonth
                            ? "text-gray-600 border-transparent"
                            : ""
                        }
                        ${
                          !isAvailable
                            ? "text-gray-600 cursor-not-allowed border-transparent bg-gray-800"
                            : ""
                        }
                        ${
                          isAvailable && isCurrentMonth && !isSelected
                            ? "text-white hover:bg-primary-600 hover:border-primary-400 bg-dark-700 border-transparent"
                            : ""
                        }
                        ${
                          isSelected
                            ? "bg-primary-600 text-white border-primary-400 shadow-lg"
                            : ""
                        }
                        ${isToday && !isSelected ? "border-primary-300" : ""}
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Zeit Selection */}
          {formData.selectedDate && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Select Time *
                </label>
                <select
                  value={formData.selectedTime || ""}
                  onChange={handleTimeChange}
                  required
                  className="w-full px-3 py-3 bg-dark-900 border border-dark-200 rounded-lg
                   text-white focus:outline-none focus:border-primary-500"
                >
                  <option className="text-black" value="">
                    Choose a time slot
                  </option>
                  {getTimesForDate(formData.selectedDate).map(
                    (timeSlot, index) => (
                      <option
                        className="text-black"
                        key={index}
                        value={timeSlot.fullText}
                      >
                        {timeSlot.startTime} - {timeSlot.endTime}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    availableSlots <= 0 ||
                    !formData.selectedDate ||
                    !formData.selectedTime
                  }
                  className={`btn-primary flex-1 ${
                    availableSlots <= 0 ||
                    !formData.selectedDate ||
                    !formData.selectedTime
                      ? "disabled:bg-gray-600 disabled:cursor-not-allowed"
                      : ""
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {/* Button zeigen nur wenn ein Termin ausgewählt ist  */}
          {!formData.selectedDate && (
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={true}
                className="btn-primary flex-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Select Date First
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CalendarModal;
