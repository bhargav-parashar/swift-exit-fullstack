import { Box, TextField, Typography, Stack, Button } from "@mui/material";
import React,{ useEffect, useState } from "react";
import { config } from "../../App.jsx";
import axios from "axios";
import QuestionItem from "../../components/QuestionItem/QuestionItem.jsx";
import DateCard from "../../components/DateCard/DateCard.jsx";
import Stepper from "../../components/Stepper/Stepper.jsx";
import isPastDate from "../../utility/isPastDate.js";
import Loader from "../../components/Loader/Loader.jsx";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const EmployeeHomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [questionResponseMapping, setQuestionResponseMapping] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [lwd, setLwd] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const URL = `${config.endpoint}/user/questionnaire`;
    const callApi = async () => {
      try {
        const { data } = await axios.get(URL);
        setQuestions(data);

        const initialResponses = {};

        setQuestionResponseMapping(
          data.map((item) => ({
            questionId: item._id,
            questionText: item.question,
            response: "",
          }))
        );

        data.forEach((item) => {
          initialResponses[item._id] = "";
        });
        setResponses(initialResponses);
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  const handleInputChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    const update = JSON.parse(JSON.stringify(questionResponseMapping));
    const idx = update.indexOf(
      update.find((item) => item.questionId === questionId)
    );
    update[idx]["response"] = value;
    setQuestionResponseMapping(update);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSubmit = async () => {
    const URL = `${config.endpoint}/user/resign`;
    const body = {
      lwd: lwd
    };
    try {
      setIsLoading(true);
      const res = await axios.post(URL, body, { withCredentials: true });
      if (res.status === 200) {
        const URL = `${config.endpoint}/user/responses`;
        const body = {
          responses: questionResponseMapping,
        };
        await axios.post(URL, body, { withCredentials: true });
      }
      enqueueSnackbar("Resignation submitted", { variant: "success" });
      navigate("/employee-home-page");
      console.log(res);
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
    <>
      <Stack direction="row" justifyContent="center">
        <Box
          sx={{
            p: 5,
            m: 0,
            width: "25%",
            background: "#e5ecff",
            display: { xs: "none", md: "block" },
          }}
        >
          <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
        </Box>

        <Box
          sx={{
            
            p: 5,
          }}
        >
          {isLoading && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "75vh", width: "50vw" }}
            >
              <Loader />
            </Stack>
          )}

          {currentStep === 1 && !isLoading && (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Hi {JSON.parse(localStorage.getItem("userName")).split(" ")[0]},
              </Typography>
              <Typography variant="caption" sx={{ mb: 2 }}>
                Welcome to SwiftExit. Follow these steps to swiftly drop your
                papers. The first step would require you to select a tentative
                last working day.
              </Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "75vh", width: "50vw" }}
              >
                <DateCard lwd={lwd} setLwd={setLwd} />
              </Stack>
            </>
          )}

          {currentStep === 2 && !isLoading && (
            <Box sx={{ minHeight: "75vh", minWidth: "50vw" }}>
              <Typography variant="caption">
                The next step would require you to fill out this exit
                questionnaire. Your feedback would help us understand what went
                well and where we can improve.
              </Typography>
              <Box mt={4}>
                {questionResponseMapping.map((item, idx) => (
                  <QuestionItem
                    key={item.questionId}
                    questionitem={item}
                    idx={idx}
                    handleInputChange={handleInputChange}
                    isReview={false}
                  />
                ))}
              </Box>
            </Box>
          )}

          {currentStep === 3 && !isLoading && (
            <Box sx={{ minHeight: "75vh", minWidth: "50vw" }}>
              <Typography variant="caption">
                This is the final step. Review your choices here and then
                proceed to submit. You can also go to the previous step and edit
                your response if desired.
              </Typography>

              <Box mt={4}>
                <Typography mb={2}>
                  Selected last working day : {lwd}{" "}
                </Typography>
                {questionResponseMapping.map((item, idx) => (
                  <QuestionItem
                    key={item.questionId}
                    questionitem={item}
                    idx={idx}
                    isReview={true}
                  />
                ))}
              </Box>
            </Box>
          )}

          {!isLoading && (
            <Stack direction="row" justifyContent="space-between">
              {currentStep > 1 ? (
                <Button variant="outlined" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <Box></Box>
              )}
              <Typography>{`${currentStep} of 3`}</Typography>

              {currentStep < 3 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    currentStep === 1 &&
                    (lwd === "--" ||
                      lwd.length === 0 ||
                      !isPastDate(new Date(lwd)))
                      ? true
                      : currentStep === 2 &&
                        questionResponseMapping.find(
                          (item) => item.response.length === 0
                        )
                      ? true
                      : false
                  }
                >
                  Next
                </Button>
              ) : currentStep === 3 ? (
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              ) : (
                {}
              )}
            </Stack>
          )}
        </Box>

        <Box
          sx={{
            p: 5,
            m: 0,
            width: "25%",
            display: { xs: "none", md: "block" },
            background: "#e5ecff",
          }}
        ></Box>
      </Stack>
    </>
  );
};
export default EmployeeHomePage;
