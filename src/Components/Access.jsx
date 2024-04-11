import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "../css/LoginSignin.css";
import NewTodo from "./NewTodo";
import Lists from "./Lists";
import NewList from "./NewList";
import { useGlobalState } from "./GlobalState";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
const Access = () => {
  const msg = ["Create New List ", "Cancel"];
  const [name, changename] = useState("");
  const [todo, changetodo] = useState("");
  const [todoButtonmsg, changetodoButtonmsg] = useState(msg[0]);
  const [isDisable, changeIsDisable] = useState(false);
  const [isVisiable, changeisVisiable] = useState(false);
  const { globalVariable } = useGlobalState();
  const auth = getAuth();
  function logout() {
    signOut(auth)
      .then(() => {
        console.log("Logging out");
      })
      .catch((error) => {
        alert(error);
      });
  }
  function enableTodo() {
    changeIsDisable(!isDisable);
    if (isDisable) {
      changetodoButtonmsg(msg[0]);
    } else {
      changetodoButtonmsg(msg[1]);
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        changename(user.displayName);
      } else {
        changename("");
      }
    });

    // Cleanup function: Unsubscribe from listener on component unmount
    return unsubscribe;
  }, [auth]);
  function handleListChange(event) {
    changetodo(event.target.value);
  }
  const handleCancelRendering = () => {
    changeIsDisable(false);
    enableTodo();
  };

  return (
    <div className="accessDiv">
      <Nav />

      <h1 style={{ textAlign: "center", color: "grey" }}>WELCOME {name}</h1>
      {isDisable && <NewList CancelIt={handleCancelRendering} />}

      <Lists />

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={enableTodo}
      >
        {todoButtonmsg}
      </button>
      <br />
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={logout}
      >
        Log out
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => {
          console.log(globalVariable);
        }}
      >
        show
      </button>
    </div>
  );
};
export default Access;
