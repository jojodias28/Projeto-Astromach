import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constants/Url";
import Swal from "sweetalert2";
import {
  Card,
  CardImage,
  MainCard,
  ButtonChoose,
  ButtonLikeDeslike,
  Text,
} from "./MainStyled";

const MainScreen = (props) => {
  const [profile, setProfile] = useState([]);

  const getProfile = () => {
    axios
      .get(`${BASE_URL}/person`)
      .then((response) => {
        setProfile(response.data.profile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const likePerson = () => {
    const body = {
      id: profile.id,
      choice: true,
    };
    axios
      .post(`${BASE_URL}/choose-person`, body)
      .then((response) => {
        if (response.data.isMatch) {
          Swal.fire(`${profile.name}`, "ebaa deu match :)", "success");
        }
        getProfile();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deslikePerson = () => {
    const body = {
      id: profile.id,
      choice: false,
    };
    axios
      .post(`${BASE_URL}/choose-person`, body)
      .then((response) => {
        getProfile();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainCard>
      <Card>
        <h2>AstroMatch</h2>

        <CardImage src={profile.photo} alt={profile.name} />
        <div>
          <span> {profile.name} </span>
          <span> {profile.age} anos </span>
        </div>
        <span> {profile.bio} </span>

        <ButtonLikeDeslike>
          <button onClick={likePerson}>Like</button>
          <button onClick={deslikePerson}>Deslike</button>
        </ButtonLikeDeslike>
        <ButtonChoose>
          <button onClick={props.onChangeMatchScreen}>
            Ir para Tela Match
          </button>
        </ButtonChoose>
      </Card>
    </MainCard>
  );
};

export default MainScreen;
