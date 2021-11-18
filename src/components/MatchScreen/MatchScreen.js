import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constants/Url";
import {
  Card,
  CardImage,
  MainCard,
  ButtonChoose,
  DivImage,
} from "./MatchStyled";

const MatchScreen = (props) => {
  const [listMatch, setListMatch] = useState([]);

  const getMatch = () => {
    axios
      .get(`${BASE_URL}/matches`)
      .then((response) => {
        setListMatch(response.data.matches);
      })
      .catch((erro) => {
        alert(erro);
      });
  };

  useEffect(() => {
    getMatch();
  }, []);

  return (
    <MainCard>
      <Card>
        <h2>Lista De Match</h2>
        {listMatch.map((match) => {
          return (
            <DivImage>
              <CardImage src={match.photo}></CardImage>
              <p> {match.name}</p>
            </DivImage>
          );
        })}
        <div>
          <button onClick={props.onChangeMainScreen}>
            Ir para Tela Inicial{" "}
          </button>
        </div>
      </Card>
    </MainCard>
  );
};

export default MatchScreen;
