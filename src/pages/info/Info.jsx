import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, ListItem, Typography } from "@mui/material";
import {
  faHouse,
  faBook,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header/Header";
import PageWrapper from "../../components/header/PageWrapper";

const info = [
  {
    icon: faHouse,
    text: "Adresa: Aleksandra Medvedeva 20, 18000 Niš, Srbija",
  },
  { icon: faBook, text: "Informacije o upisu: 060 3677400" },
  { icon: faPhone, text: "Telefon: Centrala +381 18 588 211" },
  { icon: faPhone, text: "Telefon: Studentska služba +381 18 588 039" },
  { icon: faEnvelope, text: "Imejl: info@akademijanis.edu.rs" },
  { icon: faClock, text: "Ponedeljak-Petak: 08h - 20h" },
];

const Info = () => {
  return (
    <PageWrapper>
      <Header title="Информације" />
      <List>
        {info.map(({ text, icon }, index) => (
          <ListItem key={index}>
            <FontAwesomeIcon icon={icon} style={{ marginRight: "24px" }} />
            <Typography variant="h5"> {text}</Typography>
          </ListItem>
        ))}
      </List>
    </PageWrapper>
  );
};

export default Info;
