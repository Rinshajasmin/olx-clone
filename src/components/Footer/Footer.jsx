import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPlay } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import bikewale from "../../assets/bikewale.svg";
import cartrade_tech from "../../assets/cartrade_tech.svg";
import cartrade from "../../assets/cartrade.svg";
import carwale from "../../assets/carwale.svg";
import mobility from "../../assets/mobility.svg";
import olx from "../../assets/olx.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-8">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-5 gap-6 text-gray-700 text-sm pb-8">
        <div>
          <h3 className="font-bold text-gray-900">POPULAR LOCATIONS</h3>
          <ul className="mt-2 space-y-1">
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">TRENDING LOCATIONS</h3>
          <ul className="mt-2 space-y-1">
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">ABOUT US</h3>
          <p className="mt-2">Tech@OLX</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">OLX</h3>
          <ul className="mt-2 space-y-1">
            <li>Blog</li>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy Information</li>
            <li>Vulnerability Disclosure Program</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
        <h3 className="font-bold text-gray-900">FOLLOW US</h3>
        <div className="flex space-x-4 text-gray-700 text-xl">
          <FaFacebookF className="cursor-pointer hover:text-gray-900 transition" />
          <FaInstagram className="cursor-pointer hover:text-gray-900 transition" />
          <FaTwitter className="cursor-pointer hover:text-gray-900 transition" />
        </div>

        {/* App Download */}
        <div className="flex md:flex-col space-y-4 mt-4 md:mt-0">
          <button className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-800 transition">
            <FaPlay />
            <span>Get it on Google Play</span>
          </button>
          <button className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-800 transition">
            <AiFillApple />
            <span>Download on the App Store</span>
          </button>
        </div>
      </div>
      </div>

      <div className="bg-teal-900 text-white py-6">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row  items-center">
        <div className="flex items-center space-x-20">
          <img src={cartrade_tech} alt="CarTrade Tech Logo" className="h-9 md:h-30" />
          <div className="border-l border-gray-400 h-20"></div>
        </div>

        <div className="flex space-x-34 items-center pl-10">
          <img src={olx} alt="OLX Logo" className="h-6 md:h-14" />
          <img src={carwale} alt="CarWale Logo" className="h-6 md:h-14" />
          <img src={bikewale} alt="BikeWale Logo" className="h-6 md:h-14" />
          <img src={cartrade} alt="CarTrade Logo" className="h-6 md:h-14" />
          <img src={mobility} alt="Mobility Outlook Logo" className="h-6 md:h-14" />
        </div>
      </div>
      <div className="text-sm flex flex-row justify-between items-center md:items-end mt-4 md:mt-0 px-20">
          <p className="mb-2 font-medium">Help - Sitemap</p>
          <p>All rights reserved © 2006-2025 OLX</p>
        </div>
    </div>
    </footer>
  );
};

export default Footer;
