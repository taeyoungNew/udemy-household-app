import React from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SavingsIcon from "@mui/icons-material/Savings";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AddHomeIcon from "@mui/icons-material/AddHome";
import TrainIcon from "@mui/icons-material/Train";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import AlarmIcon from "@mui/icons-material/Alarm";
import WorkIcon from "@mui/icons-material/Work";

import { IncomeCategory, ExpenseCategory } from "../../types";

const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
  食費: <FastfoodIcon />,
  お小遣い: <SavingsIcon />,
  交際費: <Diversity3Icon />,
  住居費: <AddHomeIcon />,
  共通費: <TrainIcon />,
  副収入: <AddBusinessIcon />,
  娯楽: <SportsTennisIcon />,
  日用品: <AlarmIcon />,
  給与: <WorkIcon />,
};

export default IconComponents;
