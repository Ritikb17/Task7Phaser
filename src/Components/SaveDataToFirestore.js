import React, { useState, useEffect } from "react";
import { db } from "./fb"; // Assuming `db` is imported from your Firebase configuration file
import { useGlobalState } from "./GlobalState";
const SaveDataToFirestore = async () => {
  console.log("in the firestone");
  const { globalVariable, setGlobalVariable } = useGlobalState();
  const { id, mainLists } = globalVariable;

  const dataRef = id
    ? db.collection("todoData").doc(id)
    : db.collection("todoData").doc();
  await dataRef.set(globalVariable);

  console.log("Data saved to Firestore!");
  useEffect(() => {
    SaveDataToFirestore();
  }, []);
};
export default SaveDataToFirestore;
