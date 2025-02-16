import FullCalendar from "@fullcalendar/react";
// import {
//   // Grid2,
//   // Card,
//   // CardContent,
//   // Stack,
//   // Typography,
//   Box,
// } from "@mui/material";
// import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "../calendar.css";
import { EventContentArg } from "@fullcalendar/core";
const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <div>
      <div className="money" id="event-income">
        {eventInfo.event.extendedProps.income}
      </div>
      <div className="money" id="event-expense">
        {eventInfo.event.extendedProps.expense}
      </div>
      <div className="money" id="event-balance">
        {eventInfo.event.extendedProps.balance}
      </div>
    </div>
  );
};
const Calendar = () => {
  const events = [
    {
      title: "Meeting",
      start: new Date(),
      income: 400,
      expense: 100,
      balance: 300,
    },
  ];
  // 1일 이벤트

  return (
    <FullCalendar
      locale={jaLocale} // 일본어
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
