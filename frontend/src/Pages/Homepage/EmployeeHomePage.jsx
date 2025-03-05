import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import ServiceCard from "../../components/ServiceCards/ServiceCard.jsx";
import axios from "axios";
import { config } from "../../App.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { Box } from "@mui/material";

const EmployeeHomePage = () => {
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resignationDescription =
    "Start a new resignation process. Step by step guide to draft and submit your resgination.";
  const statusDescription =
    "Check the status of previously submitted resignation.";

  useEffect(() => {
    //make a get request to get resignations by userid
    //if result returned is not null, set isSubmitted as true
    async function getUserResignation() {
      const URL = `${config.endpoint}/user/resignation`;
      try {
        setIsLoading(true);
        const res = await axios.get(URL, { withCredentials: true });
        console.log(res.data);
        if (res.data.length > 0) setIsAlreadySubmitted(true);
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
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(243,244,244,1) 0%, rgba(25,118,210,1) 100%)",
        padding: "24px",
        position: "relative",
        zIndex: 10,
      }}
    >
      {isLoading ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          height="70vh"
        >
          <Loader />
        </Stack>
      ) : (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          height="70vh"
        >
          {isAlreadySubmitted ? (
            <ServiceCard
              label="Submit Resignation"
              description={resignationDescription}
              isForSubmit
              isAlreadySubmitted
            />
          ) : (
            <ServiceCard
              label="Submit Resignation"
              description={resignationDescription}
              isForSubmit
              link="/resignation-page"
            />
          )}

          <ServiceCard
            label="Check Status"
            description={statusDescription}
            link="/check-status"
          />
        </Stack>
      )}
    </Box>
  );
};
export default EmployeeHomePage;
