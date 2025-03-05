import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import LoginInputBox from "../../components/LoginInputBox/LoginInputBox";
import img from "../../assets/register.svg";

const Register = () => {
  

  return (
    <>
      <Box
        sx={{
          height: "90vh",
          background:
            "linear-gradient(0deg, rgba(243,244,244,1) 0%, rgba(25,118,210,1) 100%)",
          padding: "24px",
          position:"relative",
          zIndex:10
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
          <Box
              component="img"
              sx={{
                height: '90%',
                width: '90%'
              }}
              alt="login"
              src={img}
              display={{xs:'none',md:'block'}}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} >
            <Stack
              direction="row"
              sx={{ justifyContent: { xs: "center", md: "flex-end" } }}
            >
              <LoginInputBox isRegister />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Register;
