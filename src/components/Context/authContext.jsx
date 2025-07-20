import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const userDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setModalOpen(false);
  };


//Login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading,setLoding] = useState(false)


  return (
    <userDataContext.Provider
      value={{
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        mode: authMode,
        setMode: setAuthMode,
        onLoginSuccess: handleLoginSuccess,
        openAuthModal: openAuthModal,
        user: user,
        email,
        setEmail,
        name,
        setName,
        password,
        setPassword,
        loading,
        setLoding
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export { userDataContext, UserDataProvider };
