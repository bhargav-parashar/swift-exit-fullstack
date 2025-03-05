import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export default function AccordionUsage() {
  return (
    <div style={{ position: "absolute", top: 30, right: 0, width: "65%", zIndex:2}}>
      <Accordion sx={{boxShadow:'none', background:"#e5ecff"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Sample Credentials</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>HR</Typography>
          <Typography>username : admin</Typography>
          <Typography>password : admin</Typography>
          <Typography mt={2}>Employee 1</Typography>
          <Typography>username : John Doe</Typography>
          <Typography>password : password</Typography>
          <Typography mt={2}>Employee 2</Typography>
          <Typography>username : Marco Reus</Typography>
          <Typography>password : password</Typography>
          <Typography mt={2}>Employee 3</Typography>
          <Typography>username : George Clooney</Typography>
          <Typography>password : password</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
