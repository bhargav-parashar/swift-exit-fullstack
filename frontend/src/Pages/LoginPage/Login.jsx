import { Box, Typography, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import LoginInputBox from "../../components/LoginInputBox/LoginInputBox";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { config } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import IsLoggedInContext from "../../components/Context/IsLoggedInContext.js";
import img from "../../assets/login.svg";

const Login = () => {
  const navigate = useNavigate();

  const { setIsLoggedIn, isLogoutClicked, setIsLogoutClicked } =
    useContext(IsLoggedInContext);

  useEffect(() => {
    //make a request to server, with credentials. If token is verified, navigate to employee page
    //if token is not verified,do nothing

    const checkStatus = async () => {
      const URL = `${config.endpoint}/auth/loginstatus`;
      try {
        const res = await axios.post(URL, {}, { withCredentials: true });

        if (res.status === 200) {
          localStorage.setItem("userName", JSON.stringify(res.data.userName));

          if (res.data.role === "admin") {
            navigate("/hr-home-page");
          } else {
            navigate("/employee-home-page");
          }
        } else {
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
          setIsLoggedIn(false);
          localStorage.removeItem("userName");
        }
      } catch (err) {
        if (err.status === 403) {
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
          setIsLoggedIn(false);
          localStorage.removeItem("userName");
        }
        console.log(err);
      }
    };

    if (
      (JSON.parse(localStorage.getItem("isLoggedIn")) || false) &&
      !isLogoutClicked
    )
      checkStatus();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "90vh",
          background:
            "linear-gradient(0deg, rgba(243,244,244,1) 0%, rgba(25,118,210,1) 100%)",
          padding: "24px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Grid container spacing={2} sx={{ mt: 3 }}>
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

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              direction="row"
              sx={{ justifyContent: { xs: "center", md: "flex-end" } }}
            >
              <LoginInputBox isRegister={false} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Login;
