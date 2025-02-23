import React, { useState } from "react";
import Box from "@mui/material/Box";

import Calendar from "../component/Calendar";
import TransactionForm from "../component/TransactionForm";
import TransactionMenu from "../component/TransactionMenu";
import MonthlySummary from "../component/MonthlySummary";
import { Transaction } from "../types";
import { format } from "date-fns";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);

  const dailyTran = monthlyTransactions.filter((tran) => {
    return tran.date === currentDay;
  });
  return (
    <Box sx={{ display: "flex" }}>
      {/* 왼쪽 컨텐츠 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
        />
      </Box>
      {/* 오른쪽 컨텐츠 */}
      <Box>
        <TransactionMenu dailyTran={dailyTran} currentDay={currentDay} />
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;
