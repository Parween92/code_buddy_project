import React from "react";
import { ScrollProvider } from "./context/ScrollContext.jsx";
import Navbar from "./layouts/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import SpecialOfferPopup from "./components/SpecialOfferPopup.jsx";
import ReminderSection from "./components/ReminderSection.jsx";
import CourseList from "./components/CourseList.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CodePlayground from "./components/CodePlayground.jsx";
import Footer from "./layouts/Footer.jsx";

function App() {
  return (
    <ScrollProvider>
      <div className="min-h-screen bg-dark-900">
        <SpecialOfferPopup />
        <Navbar />
        <Hero />
        <ReminderSection />
        <CourseList />
        <Dashboard />
        <CodePlayground />
        <Footer />
      </div>
    </ScrollProvider>
  );
}

export default App;
