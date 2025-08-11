import React, { createContext, useRef, useContext } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const dashboardRef = useRef(null);
  const coursesRef = useRef(null);

  return (
    <ScrollContext.Provider value={{ dashboardRef, coursesRef }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollRefs = () => useContext(ScrollContext);
