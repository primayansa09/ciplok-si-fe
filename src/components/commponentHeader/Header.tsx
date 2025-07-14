import React from "react";
import { Grid, InputLabel, Divider } from "@mui/material";
import logo from "../../assets/logo.png";
import { layoutPrivateStyle } from "../../style/layout/private-route";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const HeaderSection: React.FC = () => {
  // Pindahkan useSelector ke dalam komponen
  const roleName = useSelector((state: RootState) => state.auth.roleName);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Grid size={1.5} marginTop={8}>
          <InputLabel
            sx={{ ...layoutPrivateStyle.manageTitleHeader, fontSize: "32px" }}
          >
            {roleName}
          </InputLabel>
        </Grid>
        <Grid size={2}>
          <img src={logo} alt="Logo" style={{ width: "100px" }} />
        </Grid>
      </Grid>
      <Divider
        sx={{
          borderBottomWidth: 1,
          borderColor: "black",
        }}
      />
    </>
  );
};

export default HeaderSection;
