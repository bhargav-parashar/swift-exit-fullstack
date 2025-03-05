import React, { useEffect, useState } from "react";
import { Button, Container, Box, Typography, Stack } from "@mui/material";
import axios from "axios";
import { config } from "../../App.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Grid from "../../components/Grid/Grid.jsx";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HRHomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const handleReview = (id) => {
    navigate(`/review?id=${id}`);
  };
  const columns = [
    {
      field: "id",
      headerName: "Resignation ID",
      width: 210,
    },
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
    {
      field: "review",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const resignId = params.row.id;
        return (
          params.row.status  === 'Pending' ? (
          <Button variant="contained" onClick={() => handleReview(resignId)}>
            Review
          </Button>
          ) : (
            <CheckCircleIcon sx={{color:'green'}}/>
          )
        );
      },
    },
  ];

  useEffect(() => {
    //make a get request to get resignations by userid
    //if result returned is not null, set isSubmitted as true
    async function getUserResignation() {
      const URL = `${config.endpoint}/admin/resignations`;
      try {
        setIsLoading(true);
        const res = await axios.get(URL, { withCredentials: true });
        console.log(res.data);
        const rowItems = res.data.map((item) => ({
          id: item._id,
          firstName: item.userDetails.split(" ")[0],
          lastName: item.userDetails.split(" ")[1],
          lastWorkingDay: item.lwd,
          status: item.status,
        }));
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
        background:"linear-gradient(0deg, rgba(243,244,244,1) 0%, rgba(25,118,210,1) 100%)",
        position: "relative",
        zIndex: 10,
        height:'90vh'
      }}
    >
      <Container sx={{ px: 5, pt: 2, height: "70vh",  borderRadius:'10px' }}>
        
          <Typography variant='h5' sx={{ mb: 5, color:'white' }}>
            ALL RESIGNATIONS
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              maxHeight: "50px",
              background:'white'
            }}
          >
            {
              !isLoading && (<Grid columns={columns} rows={rows} />)
            }
            {
              isLoading && (
                <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={10}
              >
                <Loader />
              </Stack>
              )
            }
          
          </Box>
       
      </Container>
    </Box>
  );
};
export default HRHomePage;
