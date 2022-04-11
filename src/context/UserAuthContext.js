import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [authURL, setAuthURL] = useState("")
  const [user, setUser] = useState({});
  const url_string = window.location
  useEffect(() => {
    if (user) {
      var url = new URL(url_string);
      const params = url.searchParams.get("redirect");
      setAuthURL(params)
      if (authURL) {
        navigate(`/${authURL}`)
      }
      else if (!url_string.href.includes("quiz")) {
        navigate("/")
      }
    }
  }, [user]);

  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      console.log(user)
      if (!currentuser) {
        navigate(`/auth/?redirect=${authURL}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logOut, googleSignIn, setAuthURL }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
