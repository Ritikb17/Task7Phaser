import { React, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Nav from "./Nav";
import Login from "./Login";

import { getAuth, onAuthStateChanged, useNaviaget } from "firebase/auth";
import { app } from "./fb.js";
import "../css/LoginSignin.css";

const Home = () => {
  const Navigate = useNavigate();
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("going to  access");
        Navigate("/access"); // Redirect to /access if authenticated
      } else {
        Navigate("/"); // Redirect to home if not authenticated
      }
    });

    return unsubscribe;
  }, []);
  return (
    <div>
      <Nav />
      {/* <Login /> */}
      <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded" id="one">
        <Link to="/login">
          <button type="button" className="btn btn-outline-secondary">
            login
          </button>
        </Link>
        <Link to="/signup">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {}}
          >
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
