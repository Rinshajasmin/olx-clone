
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut ,updateProfile} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD66DPq6PFu5mooccGIbghZiflGC_0QFsg",
  authDomain: "olx-clone-8d827.firebaseapp.com",
  projectId: "olx-clone-8d827",
  storageBucket: "olx-clone-8d827.firebasestorage.app",
  messagingSenderId: "585262910093",
  appId: "1:585262910093:web:67b88d973a078b0d6a30c4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
      name,
    });
    await updateProfile(user, {
      displayName: name
    });
    return res
  } catch (error) {
    throw error
  }
};

const login = async (email, password) => {
  try {
   const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user
  } catch (error) {
    console.log(error);
   throw error
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success('LogOut')
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

export { auth, db, login, signup, logout };
