import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Calendar from "../../assets/calendar.jpg";
import CheckStatus from "../../assets/check-status.png";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

export default function ActionAreaCard({
  label,
  description,
  isForSubmit,
  isAlreadySubmitted,
  link
}) {
  const navigate = useNavigate();
  
  return (
    <>
      {!isAlreadySubmitted ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={() => navigate(link)}>
            <CardMedia
              component="img"
              height="140"
              image={isForSubmit ? Calendar : CheckStatus}
              alt="resign timeline image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {label}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 345, position: "relative" }}>
          <CardMedia
            component="img"
            height="140"
            image={isForSubmit ? Calendar : CheckStatus}
            alt="resign timeline image"
          />

         
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(204, 196, 196, 0.5)", 
              color: "#fff", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            <Box sx={{background:'green', width:"100%", textAlign:"center", display:'flex', alignItems:'center', justifyContent:'center'}}>
             <DoneIcon/>
             Submitted
            </Box>
            
          </Box>

          <CardContent >
            <Typography gutterBottom variant="h5" component="div">
              {label}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
