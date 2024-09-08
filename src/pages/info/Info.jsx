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
import Header from "../../components/common/Header";
import PageWrapper from "../../components/common/PageWrapper";

const info = [
  {
    icon: faHouse,
    text: "Адреса: Александра Медведева 20, 18000 Ниш, Србија",
  },
  { icon: faBook, text: "Информације о упису: 060 3677400" },
  { icon: faPhone, text: "Телефон: Централа +381 18 588 211" },
  { icon: faPhone, text: "Телефон: Студенска служба +381 18 588 039" },
  { icon: faEnvelope, text: "Имејл: info@akademijanis.edu.rs" },
  { icon: faClock, text: "Понедељак-Петак: 08h - 20h" },
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
