import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function convert(str) {
  let mnths = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  let date = str.split(" ");

  return [date[3], mnths[date[1]], date[2]].join("-");
}

export default function BasicDatePicker({ lwd, setLwd, disabled }) {
  const handleDateChange = (e) => {
    setLwd( convert(e.$d.toString()) );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker  disabled={disabled}  value={dayjs(lwd)} onChange={handleDateChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
