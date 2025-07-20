import React,{useState} from 'react';
import { faMagnifyingGlass, faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavbarSub = ()=>{
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-center bg-white p-4 shadow-md w-full">
    <div className="flex items-center space-x-6">
      <div
        className="flex items-center cursor-pointer font-bold text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        ALL CATEGORIES
        <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-gray-500" />
      </div>
      <div className="flex space-x-4 text-gray-600">
        <a href="#" className="hover:text-black">Cars</a>
        <a href="#" className="hover:text-black">Motorcycles</a>
        <a href="#" className="hover:text-black">Mobile Phones</a>
        <a href="#" className="hover:text-black">For Sale: Houses & Apartments</a>
        <a href="#" className="hover:text-black">Scooters</a>
        <a href="#" className="hover:text-black">Commercial & Other Vehicles</a>
        <a href="#" className="hover:text-black">For Rent: Houses & Apartments</a>
      </div>
    </div>
  </nav>
  );
}

export default NavbarSub