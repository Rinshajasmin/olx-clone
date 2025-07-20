import React, { useContext } from 'react';
import banner from '../../assets/ad.jpg';
import TitleCard from '../TitleCard/TitleCard';
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import NavbarSub from "../Navbar/NavbarSub";
import AuthModal from "../Login/Login";
import { userDataContext } from '../Context/authContext';

const Home = () => {
  const { 
    isOpen, 
    onClose, 
    mode, 
    setMode, 
    onLoginSuccess, 
    openAuthModal, 
    user 
  } = useContext(userDataContext);

  return (
    <>
      <Navbar openAuthModal={openAuthModal} user={user} />
      <NavbarSub />
      <div className="max-w-6xl mx-auto p-4">
        <img src={banner} alt="" className="w-full h-40 object-cover rounded-lg mt-10 mb-10" />
        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Fresh Recommendations
          </h2>
          <TitleCard />
        </div>
      </div>
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        mode={mode}
        setMode={setMode}
        onLoginSuccess={onLoginSuccess}
      />
      <Footer />
    </>
  );
};

export default Home;
