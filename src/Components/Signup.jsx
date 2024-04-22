import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import Nav from "./Nav";
import app from "./fb";
import Access from "./Access";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useGlobalState } from "./GlobalState";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
// import app from "./firebase";
export let Guid = "";
const auth = getAuth();
const Signup = () => {
  const navigate = useNavigate();
  const [val, changeVal] = useState("");
  const [Pass, changePass] = useState("");
  const [name, changeName] = useState("");
  const [guid, ChangeGuid] = useState("");
  const { globalVariable, addToGlobalArray, removeFromGlobalArray } =
    useGlobalState();

  function handleChangeName(event) {
    changeName(event.target.value);
  }
  function handleChange(event) {
    changeVal(event.target.value);
  }
  function handleChangePassword(event) {
    changePass(event.target.value);
  }
  function reset() {
    changeName("");
    changeVal("");
    changePass("");
  }
  function setuid(uid) {
    ChangeGuid(uid);
    console.log("new guid is set", uid);
    // addToGlobalArray([{ id: Guid }, []]);
  }
  function setdata() {
    // console.log(val, Pass);
    if (val && Pass) {
      ////CREATING A NEW USER IN FIREBASE ///
      createUserWithEmailAndPassword(auth, val, Pass)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          const uid = userCredential.user.uid;
          setuid(uid);

          console.log(globalVariable);
          updateProfile(user, {
            displayName: name,
          });
          reset();
          // let db = getDatabase();
          // set(ref(db, `${name}`), {
          //   globalVariable,
          // })
          navigate("/");
          // <Link to="/access" />;
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
      <Nav />
      <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded" id="one">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Name
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Username"
            value={name}
            onChange={handleChangeName}
          />
          <span className="input-group-text">@</span>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="Server"
            value={val}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">
            Enter Password
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
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={setdata}
        >
          Sign in
        </button>
        {/* <button type="button" className="btn btn-outline-secondary">
          login
        </button>{" "} */}
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={reset}
        >
          Reset
        </button>{" "}
        <Link to="/">
          <button type="button" className="btn btn-outline-secondary">
            Goto Home
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};
export default Signup;
