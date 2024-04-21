import { React, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Access from "./Components/Access";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import { app } from "./Components/fb.js";
import firebase from "firebase/app";
import "firebase/firestore";

import { getAuth, onAuthStateChanged, useNaviaget } from "firebase/auth";
const App = () => {
  const Navigate = useNavigate();
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        Navigate("/access"); // Redirect to /access if authenticated
      } else {
        Navigate("/"); // Redirect to home if not authenticated
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/access" element={<Access />} />
      </Routes>
    </>
  );
};
export default App;
