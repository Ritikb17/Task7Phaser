import React, { useState } from "react";
import Nav from "./Nav";
import "../css/LoginSignin.css";
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
  function setdata() {
    if (val && Pass) {
      /// LOGGING THE USER ///

      const auth = getAuth();
      signInWithEmailAndPassword(auth, val, Pass)
        .then((userCredential) => {
          const user = userCredential.user;

          reset();
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert("fill all the input ");
    }
  }

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
