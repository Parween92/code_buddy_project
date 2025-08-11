import React, { useEffect, useState } from "react";
import { FaFire, FaTimes } from "react-icons/fa";

const SpecialOfferPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-dark-800 border-2 border-yellow-500 rounded-xl p-8 max-w-sm w-full shadow-2xl relative">
        <button
          className="absolute top-3 right-3 text-yellow-500 hover:text-white"
          onClick={() => setVisible(false)}
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>
        <div className="flex items-center mb-4">
          <FaFire className="text-yellow-500 text-2xl mr-3" />
          <h3 className="text-xl font-bold text-white">Special Offer</h3>
        </div>
        <p className="text-gray-300 mb-2">
          <span className="text-yellow-500 font-bold">50% OFF</span> on Advanced JavaScript
        </p>
        <p className="text-gray-300 mb-4 text-sm">
          Valid until end of month. Use code: <span className="text-yellow-500 font-mono">SAVE50</span>
        </p>
        <div className="text-center mb-2">
          <span className="text-2xl text-yellow-500 font-bold">€24.50</span>
          <span className="text-gray-400 line-through ml-2">€49</span>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferPopup;
