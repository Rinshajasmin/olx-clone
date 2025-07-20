import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaClipboardList, FaQuestionCircle, FaCog, FaDownload, FaWallet } from "react-icons/fa";
import { IoBusiness } from "react-icons/io5";
import {logout} from '../../firebase'

const UserProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2  p-2 rounded-full focus:outline-none hover:bg-gray-200 transition-all duration-200"
      >
        <div className="w-8 h-8 bg-pink-500 flex items-center justify-center text-white rounded-full text-lg font-semibold">
          {user?.displayName?.charAt(0).toUpperCase() || "R"}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          {/* Profile Info */}
          <div className="flex items-center space-x-3 p-2">
            <div className="w-12 h-12 bg-pink-500 flex items-center justify-center text-white rounded-full text-xl font-semibold">
              {user?.displayName?.charAt(0).toUpperCase() || "S"}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{user?.displayName || "unKnown"}</h3>
              <button className="text-sm text-teal-600 font-semibold">View and edit profile</button>
            </div>
          </div>

          <hr className="my-2" />

          {/* Menu Items */}
          <ul className="space-y-3">
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md">
              <FaClipboardList className="text-gray-600" />
              <span>My ADS</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md">
              <IoBusiness className="text-gray-600" />
              <span>Buy Business Packages</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md">
              <FaWallet className="text-gray-600" />
              <span>Bought Packages & Billing</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md">
              <FaQuestionCircle className="text-gray-600" />
              <span>Help</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md">
              <FaCog className="text-gray-600" />
              <span>Settings</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md">
              <FaDownload className="text-gray-600" />
              <span>Install OLX Lite App</span>
            </li>
          </ul>

          <hr className="my-2" />

          {/* Logout */}
          <button
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-100 rounded-md"
            onClick={onLogout}
          >
            <FaSignOutAlt className="text-red-500" />
            <span className="text-red-500 font-semibold" onClick={()=>{logout()}}>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
