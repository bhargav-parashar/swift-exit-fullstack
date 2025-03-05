import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Pick Last Working Day",
    description: `Please add a preferrance for last working day. Last working day date is subject to modification by HR.`,
  },
  {
    label: "Fill Questionnaire",
    description:
      "Please fill out the exit questionnaire. Your responses would help us improve.",
  },
  {
    label: "Review & Submit",
    description: `Please review and submit resignation. To edit, you may go to the previous steps and update your responses.`,
  },
];

export default function VerticalLinearStepper({ activeStep, setActiveStep }) {
 
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography sx={{ fontSize: "1.2vw" }}>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography sx={{ fontSize: "1vw" }}>
                {step.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
