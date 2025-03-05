import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import { config } from "../../App";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { format } from "date-fns";
import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const [resignationDetails, setResignationDetails] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [lastWorkDay, setLastWorkDay] = useState("");
  const resignId = searchParams.get("id");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  //GET RESIGNATION DETAILS FOR REVIEW
  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoading(true);
        const URL = `${config.endpoint}/admin/exit_responses?id=${resignId}`;
        const res = await axios.get(URL, { withCredentials: true });
        setResignationDetails(res.data[0]);
        setLastWorkDay(res.data[0].lwd);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, []);

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      const URL = `${config.endpoint}/admin/conclude_resignation`;
      const body = {
        resignationId: resignationDetails._id,
        approved: e.target.id === "approve" ? true : false,
        lwd: e.target.id === "approve" ? lastWorkDay : resignationDetails.lwd,
      };
      await axios.put(URL, body, { withCredentials: true });
      navigate("/hr-home-page");
      enqueueSnackbar("Review submitted!", { variant: "success" });
    } catch (err) {
      if(err.status === 400){
        enqueueSnackbar(`${err.response.data.message} - ${err.response.data.holiday }  `, { variant: "warning" });
    }
    console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(0deg, rgba(243,244,244,1) 0%, rgba(25,118,210,1) 100%)",
        position: "relative",
        zIndex: 10
      }}
    >
      <Container sx={{ background: "transparent" }}>
        <Box
          pt={4}
          px={{ xs: 2, sm: 10, md: 14 }}
          sx={{ background: "transparent" }}
        >
          <Box p={2} sx={{ background: "#e3e7f1", borderRadius: "0.5rem" }}>
            {isLoading && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={2}
                height="70vh"
              >
                <Loader />
              </Stack>
            )}
            {!isLoading && resignationDetails.userDetails && (
              <>
                {/* EMPLOYEE DETAILS */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "space-between" }}
                  sx={{
                    borderRadius: "0.5rem",
                    background: "snow",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    // border: "2px solid gray",
                  }}
                  p={2}
                  mb={2}
                >
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems="center"
                    // sx={{ border: "2px solid gray" }}
                  >
                    <AccountCircleIcon
                      sx={{
                        borderRadius: "50%",
                        height: { xs: 50, md: 90 },
                        width: { xs: 50, md: 90 },
                        background:
                          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,0.8519782913165266) 100%)",
                        color: "white",
                        mb: 1,
                      }}
                    />

                    <Stack
                      direction="column"
                      alignItems={{ xs: "center", md: "flex-start" }}
                      p={{ xs: 0, md: 1 }}
                      gap={1}
                      // sx={{ border: "2px solid gray" }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {resignationDetails.userDetails.username}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          margin: "none",
                          padding: "none",
                          lineHeight: "1px",
                          color: "gray",
                        }}
                      >{`Submitted on ${format(
                        resignationDetails.createdAt,
                        "dd MMM, yyyy"
                      )}`}</Typography>
                    </Stack>
                  </Stack>

                  <Stack
                    direction="row"
                    gap={2}
                    // sx={{ border: "2px solid purple" }}
                  >
                    <Stack
                      direction="column"
                      justifyContent={"flex-end"}
                      p={1}
                      // sx={{ border: "2px solid green" }}
                    >
                      <Stack
                        // sx={{ border: "2px solid red" }}
                        direction="row"
                        alignItems="center"
                        justifyContent={{ xs: "center", md: "flex-start" }}
                        mt={{ xs: 1, md: "none" }}
                      >
                        <EditCalendarIcon
                          sx={{ height: "1rem", width: "1.5rem" }}
                        />
                        <Typography variant="body1" fontWeight="bold">
                          Last Working Day
                        </Typography>
                      </Stack>
                      <Stack
                        // sx={{ border: "2px solid red" }}
                        direction="row"
                        alignItems="flex-start"
                      >
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          <DatePicker
                            lwd={lastWorkDay}
                            setLwd={setLastWorkDay}
                          />
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>

                {/* QUESTIONNAIRE */}
                <Box
                  sx={{
                    background: "snow",
                    borderRadius: "0.5rem",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                  mb={2}
                  p={3}
                >
                  {resignationDetails.userDetails.userresponses.responses.map(
                    (item, idx) => (
                      <QuestionItem
                        key={item.questionId}
                        questionitem={item}
                        idx={idx}
                        isReview
                      />
                    )
                  )}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    pt={2}
                    gap={2}
                    mt={3}
                  >
                    <Button
                      id="reject"
                      startIcon={<ClearIcon />}
                      sx={{ width: "50%" }}
                      variant="outlined"
                      color="error"
                      onClick={handleSubmit}
                    >
                      Reject
                    </Button>
                    <Button
                      id="approve"
                      startIcon={<CheckIcon />}
                      sx={{ width: "50%" }}
                      variant="outlined"
                      color="success"
                      onClick={handleSubmit}
                    >
                      Approve
                    </Button>
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Review;
