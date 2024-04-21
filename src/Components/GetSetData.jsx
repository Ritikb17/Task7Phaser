import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { app } from "./fb";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);
const GetSetData = async () => {
  console.log("getting ddddd");
  function pt(params) {
    console.log("pptt");
  }
  const [users, setUsers] = useState([]); // State to store fetched user data
  const [error, setError] = useState(null);
  try {
    const collectionRef = collection(db, ""); // Reference to "user" collection
    const querySnapshot = await getDocs(collectionRef); // Fetch documents
    const fetchedUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(fetchedUsers);
    setError(null); // Clear any previous errors
    console.log("users is ", users);
  } catch (err) {
    console.error("Error fetching data:", err);
    setError(err.message || "An error occurred while fetching data.");
  }
  useEffect(() => {
    pt(); // Call getData on component mount
  }, []);

  return <></>;
};
export default GetSetData;
