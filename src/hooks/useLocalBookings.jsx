import { useState, useEffect, useCallback } from "react";

const BOOKINGS_KEY = "codebuddy_bookings";

let globalBookings = [];
let listeners = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener(globalBookings));
};

export const useLocalBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem(BOOKINGS_KEY);
    if (savedBookings) {
      globalBookings = JSON.parse(savedBookings);
      setBookings(globalBookings);
    }

    const updateBookings = (newBookings) => {
      setBookings([...newBookings]);
    };
    listeners.push(updateBookings);

    return () => {
      listeners = listeners.filter((l) => l !== updateBookings);
    };
  }, []);

  const saveBookings = useCallback((newBookings) => {
    globalBookings = newBookings;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(newBookings));
    notifyListeners();
  }, []);

  const addBooking = useCallback(
    (booking) => {
      const newBooking = {
        ...booking,
        id: Date.now().toString(),
      };
      const updatedBookings = [...globalBookings, newBooking];
      saveBookings(updatedBookings);
    },
    [saveBookings]
  );

  const getBookingsForCourse = useCallback(
    (courseId) => {
      return bookings.filter((booking) => booking.courseId === courseId);
    },
    [bookings]
  );

  const getAllBookings = useCallback(() => {
    return bookings;
  }, [bookings]);

  const removeBooking = useCallback(
    (bookingId) => {
      const updatedBookings = globalBookings.filter(
        (booking) => booking.id !== bookingId
      );
      saveBookings(updatedBookings);
    },
    [saveBookings]
  );

  return {
    bookings,
    addBooking,
    getBookingsForCourse,
    getAllBookings,
    removeBooking,
  };
};
