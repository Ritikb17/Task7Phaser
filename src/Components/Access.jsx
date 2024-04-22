import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "../css/LoginSignin.css";
import NewTodo from "./NewTodo";
import Lists from "./Lists";
import NewList from "./NewList";
import isEqual from "lodash/isEqual";
// import { db } from "./fb";
// import SaveDataToFirestore from "./SaveDataToFirestore";
import GetArrayFromFirestore from "./GetArrayFromFirestore";
import { useGlobalState } from "./GlobalState";
import { getFirestore } from "firebase/firestore";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
// import { doc, set } from "firebase/firestore";// From firebase/firestore
// From firebase/auth
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { getDatabase, ref, set, onValue } from "firebase/database";
const Access = () => {
  const msg = ["Create New List ", "Cancel"];
  // const db = getFirestore();
  const [name, changename] = useState("");
  const [email, changeEmail] = useState("");
  const [todo, changetodo] = useState("");
  const [todoButtonmsg, changetodoButtonmsg] = useState(msg[0]);
  const [isDisable, changeIsDisable] = useState(false);
  const [isVisiable, changeisVisiable] = useState(false);
  const { globalVariable } = useGlobalState();
  const navigate = useNavigate();

  const auth = getAuth();

  async function saveArrayToFirestore() {
    // try {
    //   console.log("this is sending data to firestone ");
    //   const userRef = doc(db, "users", auth.currentUser.uid);
    //   await userRef.setDoc({ localArray: globalArray }, { merge: true }); // Update only 'localArray' field
    //   console.log("Array saved successfully to Firestore!");
    // } catch (error) {
    //   console.error("Error saving array to Firestore:", error);
    // }
    // const docRef = doc(db, "user", "L1");
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    // const usersRef = collection(db, "user");
    // getDocs(usersRef)
    //   .then((querySnapshot) => {
    //     const allUserData = [];
    //     querySnapshot.forEach((doc) => {
    //       allUserData.push(doc.data());
    //     });
    //     console.log("All user data:", allUserData); // This will be an array of user objects
    //   })
    //   .catch((error) => {
    //     console.error("Error getting documents:", error);
    //   });

    let db = getDatabase();
    // set(ref(db, "users" + "uid1100"), {
    //   username: "second name",
    //   email: "access@gmail.com",
    //   profile_picture: "pp",
    // });

    let lstnme;
    const reff = [...globalVariable];
    console.log(
      "updated",
      (reff[0][0][0].updateTime = new Date().toLocaleTimeString())
    );
    console.log("value of reff is ", reff);
    set(ref(db, `${name}`), {
      reff,
    }).then(() => {
      console.log("data is being send to the cloud ");
      const starCountRef = ref(db, `${name}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // console.log(" the data that being from the cloud is ", data.reff);
        // if (globalVariable == data.reff) {
        //   console.log("true");
        // }
      });
    });

    // const starCountRef = ref(db, `${name}`);
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data.reff);
    //   if (isEqual(data.reff === reff)) {
    //     console.log("same");
    //   } else {
    //     console.log("not same  reff is ", reff, " cloud is ", data.reff);
    //   }
    // });

    // for (let a = 0; a < reff.length; a++) {
    //   for (let k = 0; k < reff[a].length; k++) {
    //     for (let p = 0; p < reff[a][k].length; p++) {
    //       let dta = reff[a][k][p];

    //       if (p == 0) {
    //         lstnme = reff[a][k][p].Name;
    //         continue;
    //       } else {
    //         dta = reff[a][k][p];
    //       }

    //       // set(ref(db, `${name}${a}${k}${p}/`, `${lstnme}${a}${k}${p}`), {
    //       //   dta,
    //       // });
    //       console.log("set db");

    //       // await deleteDoc(doc(db, "New", `${name}`));
    //       // const docRef = await setDoc(doc(db, `${name}`, `${lstnme}`), {
    //       //   dta,
    //       // });

    //       // console.log("list name", lstnme);
    //       // console.log("Data is ", dta);
    //       // await addDoc(doc(db, "NewUser", `${lstnme}`), {
    //       //   dta,
    //       // });
    //     }
    //   }
    // }

    // db = getDatabase();
    // const starCountRef = ref(db, "users" + "uid1101");
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    // });
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
    // saveArrayToFirestore();
  }
  // saveArrayToFirestore(gl);
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
        changeEmail(user.email);
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
