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
let GlobalPass = "";
const Signup = () => {
  const navigate = useNavigate();
  const [val, changeVal] = useState("");
  const [Pass, changePass] = useState("");
  const [name, changeName] = useState("");
  const [guid, ChangeGuid] = useState("");
  const [userIP, setUserIP] = useState("");
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
    GlobalPass = Pass;
  }
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

    let db = getDatabase();
    // set(ref(db, "users" + "uid1100"), {
    //   username: "second name",
    //   email: "access@gmail.com",
    //   profile_picture: "pp",
    // });

    let lstnme;
    const reff = [...globalVariable];
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
  const fetchUserIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const ip = data.ip;
      return ip;
    } catch (error) {
      console.error("Error fetching client IP:", error.message);
      return null;
    }
  };
  function setDataToGlobal() {
    let ip = userIP;
    console.log("your ip is ", typeof ip);
    addToGlobalArray([
      [
        {
          Email: val,
          Password: GlobalPass,
          SignupTime: new Date().toLocaleTimeString(),
          CreatorName: name,
          IP: ip,
          TaskList: [],
          creatinonTime: new Date().toLocaleTimeString(),
          LastUpdate: new Date().toLocaleTimeString(),
        },
        [],
      ],
    ]);
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
          updateProfile(user, {
            displayName: name,
          });
          setDataToGlobal();
          reset();
          // let db = getDatabase();
          // set(ref(db, `${name}`), {
          //   globalVariable,
          // })
          saveArrayToFirestore();
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
export { GlobalPass };
