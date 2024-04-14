import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "../css/LoginSignin.css";
import NewTodo from "./NewTodo";
import Lists from "./Lists";
import NewList from "./NewList";
// import SaveDataToFirestore from "./SaveDataToFirestore";
import GetArrayFromFirestore from "./GetArrayFromFirestore";
import { useGlobalState } from "./GlobalState";
import { getFirestore } from "firebase/firestore";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import { doc, set } from "firebase/firestore"; // From firebase/firestore
// From firebase/auth

const Access = () => {
  const msg = ["Create New List ", "Cancel"];
  const db = getFirestore();
  const [name, changename] = useState("");
  const [todo, changetodo] = useState("");
  const [todoButtonmsg, changetodoButtonmsg] = useState(msg[0]);
  const [isDisable, changeIsDisable] = useState(false);
  const [isVisiable, changeisVisiable] = useState(false);
  const { globalVariable } = useGlobalState();
  const auth = getAuth();

  async function saveArrayToFirestore(globalArray) {
    try {
      console.log("this is sending data to firestone ");
      const userRef = doc(db, "users", auth.currentUser.uid);
      await userRef.setDoc({ localArray: globalArray }, { merge: true }); // Update only 'localArray' field
      console.log("Array saved successfully to Firestore!");
    } catch (error) {
      console.error("Error saving array to Firestore:", error);
    }
  }

  function logout() {
    saveArrayToFirestore(globalVariable);
    signOut(auth)
      .then(() => {
        console.log("Logging out");
      })
      .catch((error) => {
        alert(error);
      });
  }
  function save() {
    console.log("asdf");
    // <SaveDataToFirestore />;
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
    </div>
  );
};
export default Access;
