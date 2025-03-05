import React, { useEffect, useState } from "react";
import { Stack, Container, Box, Typography } from "@mui/material";
import axios from "axios";
import { config } from "../../App.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Grid from "../../components/Grid/Grid.jsx";

const CheckStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "Resignation ID", width: 210 },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
    },
    {
      field: "lastWorkingDay",
      headerName: "Last Working Day",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  useEffect(() => {
    //make a get request to get resignations by userid
    //if result returned is not null, set isSubmitted as true
    async function getUserResignation() {
      const URL = `${config.endpoint}/user/resignation`;
      try {
        setIsLoading(true);
        const res = await axios.get(URL, { withCredentials: true });
        const rowItems = [
          {
            id: res.data[0]._id,
            lastName: res.data[0].userDetails.split(" ")[1],
            firstName: res.data[0].userDetails.split(" ")[0],
            lastWorkingDay: res.data[0].lwd,
            status: res.data[0].status,
          },
        ];
        setRows(rowItems);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getUserResignation();
  }, []);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(0deg, rgba(243,244,244,1) 0%, rgba(25,118,210,1) 100%)",
        position: "relative",
        zIndex: 10,
        height: "90vh",
      }}
    >
      <Container
        sx={{
          px: 5,
          pt: 2,
          height: "70vh",
          background: "white",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" sx={{ mb: 5 }}>
          Resignation Processing Status
        </Typography>
        {isLoading && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mt='20vh'
          >
            <Loader />
          </Stack>
        )}
        {!isLoading && (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              maxHeight: "50px",
            }}
          >
            <Grid columns={columns} rows={rows} />
          </Box>
        )}
      </Container>
    </Box>
  );
};
export default CheckStatus;
