import React, { useState, useContext } from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../App.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { useSnackbar } from "notistack";
import IsLoggedInContext from "../Context/IsLoggedInContext.js";
import Credentials from "../../components/Credentials/credentials.jsx";

const LoginInputBox = ({ isRegister = false }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const registerValidateInput = (formData) => {
    if (formData.username.length === 0) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    } else if (formData.username.length < 5) {
      enqueueSnackbar("Username must be at least 5 characters", {
        variant: "warning",
      });
      return false;
    } else if (formData.password.length === 0) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    } else if (formData.password.length < 5) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    } else {
      return true;
    }
  };

  const loginValidateInput = (formData) => {
    if (formData.username.length === 0) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    } else if (formData.username.length < 5) {
      enqueueSnackbar("Username must be at least 5 characters", {
        variant: "warning",
      });
      return false;
    } else if (formData.password.length === 0) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async (formData) => {
    if (!registerValidateInput(formData)) return;
    const URL = `${config.endpoint}/auth/register`;
    const body = {
      username: formData.username,
      password: formData.password,
    };
    const headers = {
      headers: {
        Authorization: config.authorization,
      },
    };

    try {
      setLoading(true);
      const res = await axios.post(URL, body, headers);
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
      });
      console.log(res);
      enqueueSnackbar("Registered successfully", { variant: "success" });
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formData) => {
    if (!loginValidateInput(formData)) return;
    try {
      setLoading(true);
      const URL = `${config.endpoint}/auth/login`;
      const body = {
        username: formData.username,
        password: formData.password,
      };
      const res = await axios.post(URL, body, { withCredentials: true });
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userName", JSON.stringify(formData.username));
      setIsLoggedIn(true);
      enqueueSnackbar(`Logged in as ${formData.username}`, {
        variant: "success",
      });

      if (res.data.role === "admin") {
        navigate("/hr-home-page");
      } else {
        navigate("/employee-home-page");
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.response.data.message, { variant: "warning" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        px: 5,
        pt: 5,
        pb: 10,
        background: "#f3f4f4",
        maxWidth: { xs: 320, md: 450 },
        minWidth: { xs: 320, md: 450 },
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "relative",
      }}
    >
      {isRegister ? (
        <Typography sx={{ mb: 3 }} variant="h5">
          Register
        </Typography>
      ) : (
        <Stack>
          <Typography sx={{ mb: 3 }} variant="h5">
            Login
          </Typography>
          <Credentials />
        </Stack>
      )}
      <Stack spacing={2}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
        {isRegister && (
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        )}
        {isLoading ? (
          <Loader />
        ) : isRegister ? (
          <Button variant="contained" onClick={() => handleRegister(formData)}>
            Register
          </Button>
        ) : (
          <Button variant="contained" onClick={() => handleLogin(formData)}>
            Login
          </Button>
        )}
      </Stack>

      {isRegister ? (
        <Typography sx={{ mt: 2 }}>
          Have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
            Login
          </Link>
        </Typography>
      ) : (
        <Typography sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Register now
          </Link>
        </Typography>
      )}
    </Box>
  );
};

export default LoginInputBox;
