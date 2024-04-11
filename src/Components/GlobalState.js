// GlobalState.js
import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState([]);

  const addToGlobalArray = (item) => {
    setGlobalVariable((prevGlobalVariable) => [...prevGlobalVariable, item]);
  };

  const removeFromGlobalArray = (index) => {
    setGlobalVariable((prevGlobalVariable) =>
      prevGlobalVariable.filter((_, i) => i !== index)
    );
  };

  return (
    <GlobalStateContext.Provider
      value={{ globalVariable, addToGlobalArray, removeFromGlobalArray }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
