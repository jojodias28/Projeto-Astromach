import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../src/Constants/Url";
import MainScreen from "./components/MainScreen/MainScreen";
import MatchScreen from "./components/MatchScreen/MatchScreen";
import Swal from "sweetalert2";

const App = () => {
  const [mainScreen, setMainScreen] = useState("profile");

  const chooseScreen = () => {
    switch (mainScreen) {
      case "profile":
        return <MainScreen onChangeMatchScreen={onChangeMatchScreen} />;
      case "match":
        return <MatchScreen onChangeMainScreen={onChangeMainScreen} />;
      default:
        return <div>Erro! Página não encontrada :(</div>;
    }
  };

  const onChangeMainScreen = () => {
    setMainScreen("profile");
  };

  const onChangeMatchScreen = () => {
    setMainScreen("match");
  };

  const deleteMatch = () => {
    axios
      .put(`${BASE_URL}/clear`)
      .then((response) => {
        Swal.fire("", "A Lista foi apagada com sucesso!", "success");
        setMainScreen("profile");
      })
      .catch((error) => {
        Swal.fire("", "Ops! Algo deu Errado :(", "error");
      });
  };

  return (
    <div>
      {chooseScreen()}
      <button onClick={deleteMatch}>Delete All</button>
    </div>
  );
};

export default App;
