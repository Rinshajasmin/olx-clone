import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronDown, faPlus, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import UserProfileDropdown from "../userProfile/userProfile";
import { useNavigate } from "react-router-dom";

const Navbar = ({ openAuthModal, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navigateAddProduct =()=>{
    navigate('/addProduct')
  }
  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-2 bg-gray-100 shadow-md relative">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="h-8" />
        <div className="hidden md:flex items-center border-2 border-black px-4 py-2 rounded-md gap-2 bg-white">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
          <input type="text" placeholder="India" className="outline-none w-32 text-sm bg-transparent" />
          <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
        </div>
      </div>
      <div className="hidden md:flex flex-grow max-w-full mx-4 border-2 border-black rounded-md overflow-hidden bg-white">
        <input type="text" placeholder='Search "Bikes"' className="w-full px-4 py-2 outline-none text-sm" />
        <button className="bg-[#002f34] px-4 py-2 text-white">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-1 cursor-pointer text-sm">
          <p className="text-gray-700 font-bold">ENGLISH</p>
          <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
        </div>
        <FontAwesomeIcon icon={faHeart} className="text-gray-600 text-lg cursor-pointer" />
        {user ? (
          <UserProfileDropdown user={user} openAuthModal={openAuthModal} />
        ) : (
          <p className="text-gray-700 font-medium cursor-pointer underline" onClick={() => openAuthModal("login")}>
            Login
          </p>
        )}
        <button onClick={()=>navigateAddProduct()} className="flex items-center gap-2 px-1 py-1 font-semibold rounded-full border-2 border-transparent bg-white relative cursor-pointer">
          <span className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-yellow-400 via-teal-400 to-blue-500"></span>
          <span className="relative flex items-center gap-2 bg-white px-4 py-1 rounded-full">
            <FontAwesomeIcon icon={faPlus} />
            <span>SELL</span>
          </span>
        </button>
      </div>
      <button
        className="md:hidden text-xl text-gray-700"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-100 shadow-md md:hidden flex flex-col items-center py-4 gap-4 z-50">
          {/* Location Input */}
          <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md gap-2 bg-white w-4/5">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
            <input type="text" placeholder="India" className="outline-none w-full text-sm bg-transparent" />
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
          </div>

          <div className="flex items-center gap-4">
            <p className="text-gray-700 font-medium cursor-pointer">ENGLISH</p>
            <FontAwesomeIcon icon={faHeart} className="text-gray-600 text-lg cursor-pointer" />
            {user ? (
          <UserProfileDropdown user={user} openAuthModal={openAuthModal} />
        ) : (
          <p className="text-gray-700 font-medium cursor-pointer underline" onClick={() => openAuthModal("login")}>
            Login
          </p>
        )}
          </div>
          <button onClick={()=>navigateAddProduct()} className="flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer border border-gray-300 bg-white rounded-md">
            <FontAwesomeIcon icon={faPlus} />
            <span>SELL</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
