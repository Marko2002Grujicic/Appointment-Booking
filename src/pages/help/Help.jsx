import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTimeFilled";

const Help = () => {
  return (
    <Box>
      <List>
        <ListItem>
          <HomeIcon sx={{ mr: 3 }} />
          <Typography variant="h5">
            Adresa: Aleksandra Medvedeva 20, 18000 Niš, Srbija
          </Typography>
        </ListItem>
        <ListItem>
          <InfoIcon sx={{ mr: 3 }} />
          <Typography variant="h5">Informacije o upisu: 060 3677400</Typography>
        </ListItem>
        <ListItem>
          <CallIcon sx={{ mr: 3 }} />
          <Typography variant="h5">
            Telefon: Centrala +381 18 588 211
          </Typography>
        </ListItem>
        <ListItem>
          <CallIcon sx={{ mr: 3 }} />
          <Typography variant="h5">
            Telefon: Studentska služba +381 18 588 039
          </Typography>
        </ListItem>
        <ListItem>
          <EmailIcon sx={{ mr: 3 }} />
          <Typography variant="h5">Imejl: info@akademijanis.edu.rs</Typography>
        </ListItem>
        <ListItem>
          <AccessTimeIcon sx={{ mr: 3 }} />
          <Typography variant="h5">Ponedeljak-Petak: 08h - 20h</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default Help;
