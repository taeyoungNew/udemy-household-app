import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import SavinsIcon from "@mui/icons-material/Savings";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Controller, useForm } from "react-hook-form";
import { ExpenseCategory, IncomeCategory } from "../types";

interface TransactionFormProp {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
}
interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element; // Mui는 React의 컴포넌트이므로 해당 타입으로 지정
}
type IncomeExpense = "income" | "expense";

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
}: TransactionFormProp) => {
  const formWidth = 320;
  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
    { label: "住居費", icon: <AddHomeIcon fontSize="small" /> },
    { label: "交際費", icon: <Diversity3Icon fontSize="small" /> },
    { label: "娯楽", icon: <SportsTennisIcon fontSize="small" /> },
    { label: "共通費", icon: <TrainIcon fontSize="small" /> },
  ];

  const IncomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" /> },
    { label: "副収入", icon: <SavinsIcon fontSize="small" /> },
    { label: "お小遣い", icon: <AddBusinessIcon fontSize="small" /> },
  ];

  const [categories, setCategories] = useState(expenseCategories);
  const { control, setValue, watch } = useForm({
    // 리액트훅폼의 각 네임마다 디폴트값을 할당할수 있다.
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
  });

  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
  };

  // 감시할 form의 이름을 인수로 넣는다.
  const currentType = watch("type");

  // useEffect로 currentType의 값이 바뀌면 setCategories에 새로운 categories의 값을 대입
  useEffect(() => {
    const newCategories =
      currentType === "expense" ? expenseCategories : IncomeCategories;
    setCategories(newCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  // useEffect를 활용해서 달력상의 날짜를 클릭했을때
  // form의 날짜도 바뀐다.
  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay, setValue]); // currentDay의 값이 변경되었을떄 useEffect가 실행

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"}>
        {/* Stack안의 요소들이 균등하게 배치 */}
        <Stack spacing={2}>
          {/* 収支切り替えボタンをリアクトフックボタンで管理する */}
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => {
              return (
                // 지출 수입 버튼ㄴ
                <ButtonGroup fullWidth>
                  <Button
                    variant={
                      field.value === "expense" ? "contained" : "outlined"
                    }
                    color="error"
                    onClick={() => incomeExpenseToggle("expense")}
                  >
                    支出
                  </Button>
                  <Button
                    variant={
                      field.value === "income" ? "contained" : "outlined"
                    }
                    color="primary"
                    onClick={() => incomeExpenseToggle("income")}
                  >
                    収入
                  </Button>
                </ButtonGroup>
              );
            }}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="日付"
                  type="date"
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              );
            }}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField {...field} id="カテゴリ" label="カテゴリ" select>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={`${category.label}`}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                // 값을 입력하면 문자열로 받아지기때문에 숫자타입으로 변경
                onChange={(e) => {
                  // 10은 10진법
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                // 실제 보일때는 value가 0일떄 빈문자열을 반환
                value={field.value === 0 ? "" : field.value}
                label="金額"
                type="number"
              />
            )}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="内容" type="text" />
            )}
          />

          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            // currentType은 react-hook-form의 watch가 감시하고 있어 값이바뀌면
            // 바뀐값을 대입한다.
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
// function userForm() {
//   throw new Error("Function not implemented.");
// }
