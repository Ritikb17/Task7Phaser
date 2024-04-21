import React, { useState } from "react";
import Nav from "./Nav";
import { useGlobalState } from "./GlobalState";
import "../css/LoginSignin.css";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Access from "./Access";
// import { CreateUserWithEmailAndPassword } from "./firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [val, changeVal] = useState("");
  const [Pass, changePass] = useState("");
  const { globalVariable, addToGlobalArray, editGlobalArray } =
    useGlobalState();
  function submitClicked() {
    console.log(val);
    console.log(Pass);
  }
  function handleChange(event) {
    changeVal(event.target.value);
  }
  function handleChangePassword(event) {
    changePass(event.target.value);
  }
  function reset() {
    changeVal("");
    changePass("");
  }
  const setdata = async () => {
    let copy = [...globalVariable];
    if (val && Pass) {
      // Getting Firebase Database and Authentication instances
      const db = getDatabase();
      const auth = getAuth();

      // Sign in the user with email and password
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          val,
          Pass
        );
        const user = userCredential.user;
        console.log("Logging in", user);

        // Reference to the user's data in the database
        const userRef = ref(db, `${user.displayName}`);
        // Use `await` in `onValue` listener to handle data
        try {
          await onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data.reff);
            console.log("Current globalVariable:", globalVariable);
            // console.log("Adding to globalVariable:", data.reff);

            editGlobalArray(data.reff);
            console.log("global value is ", globalVariable);
          });
        } catch (err) {
          console.log("leave ");
        }

        // Resetting input values and navigating
        reset();
        navigate("/");
      } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    } else {
      alert("Please fill in all the input fields");
    }
  };

  return (
    <div>
      <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded" id="one">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
            autoComplete="off"
            value={val}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">
            Password
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Recipient's password"
            aria-label="Recipient's password"
            aria-describedby="basic-addon2"
            autoComplete="off"
            value={Pass}
            onChange={handleChangePassword}
          />

          <br></br>
        </div>
        {/* <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={submitClicked}
        >
          Sign in
        </button> */}
        Don't Have Account <Link to="/signup">Signup</Link>
        <br></br>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={setdata}
        >
          login
        </button>{" "}
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={reset}
        >
          Reset
        </button>{" "}
        <Link to="/">
          <button type="button" className="btn btn-outline-secondary">
            Home
          </button>{" "}
        </Link>
        <br></br>
      </div>
    </div>
  );
};
export default Login;
