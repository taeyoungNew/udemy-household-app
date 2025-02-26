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
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const dailyTran = monthlyTransactions.filter((tran) => {
    return tran.date === currentDay;
  });

  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };

  // ファームの開閉処理
  const handleAddTranForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* 왼쪽 컨텐츠 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          today={today}
          currentDay={currentDay}
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
        />
      </Box>
      {/* 오른쪽 컨텐츠 */}
      <Box>
        <TransactionMenu
          dailyTran={dailyTran}
          currentDay={currentDay}
          onAddTranForm={handleAddTranForm}
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
        />
      </Box>
    </Box>
  );
};

export default Home;
