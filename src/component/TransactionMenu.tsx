import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Grid2,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
//アイコン
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DailySummary from "./DailySummary";
import { Transaction } from "../types";
import { formatCurrency } from "../utils/formatting";

interface TransactionMenuProp {
  dailyTran: Transaction[];
  currentDay: string;
}
const TransactionMenu = ({ dailyTran, currentDay }: TransactionMenuProp) => {
  const menuDrawerWidth = 320;
  return (
    // Drawer : 메뉴 전체를 감쌈
    <Drawer
      sx={{
        width: menuDrawerWidth,
        "& .MuiDrawer-paper": {
          width: menuDrawerWidth,
          boxSizing: "border-box",
          p: 2,
          top: 64,
          height: `calc(100% - 64px)`, // AppBarの高さを引いたビューポートの高さ
        },
      }}
      // variant={"permanent"} : 고정 Drawer
      variant={"permanent"}
      anchor={"right"}
    >
      {/* Stack : 안의 요소들이 균등하게 정렬이 된다. */}
      <Stack sx={{ height: "100%" }} spacing={2}>
        {/* 날짜표시 */}
        <Typography fontWeight={"fontWeightBold"}>
          日時： {currentDay}
        </Typography>
        {/* 지출을 표시 */}
        <DailySummary dailyTran={dailyTran} />
        {/* 内訳タイトル&内訳追加ボタン */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          {/* 左側のメモアイコンとテキスト */}
          <Box display="flex" alignItems="center">
            <NotesIcon sx={{ mr: 1 }} />
            <Typography variant="body1">内訳</Typography>
          </Box>
          {/* 右側の追加ボタン */}
          <Button startIcon={<AddCircleIcon />} color="primary">
            内訳を追加
          </Button>
        </Box>
        {/* 거래리스트 */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List aria-label="取引履歴">
            <Stack spacing={2}>
              {/* ListItem : 하나의 거래내역 */}
              {dailyTran.map((el) => (
                <ListItem disablePadding>
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor: (theme) =>
                        theme.palette.expenseColor.light,
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Grid2
                          container
                          spacing={1}
                          alignItems="center"
                          wrap="wrap"
                        >
                          <Grid2 size={{ xs: 1 }}>
                            {/* icon */}
                            <FastfoodIcon />
                          </Grid2>
                          <Grid2 size={{ xs: 2.5 }}>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {el.category}
                            </Typography>
                          </Grid2>
                          <Grid2 size={{ xs: 4 }}>
                            <Typography variant="body2" gutterBottom>
                              {el.content}
                            </Typography>
                          </Grid2>
                          <Grid2 size={{ xs: 4.5 }}>
                            <Typography
                              gutterBottom
                              textAlign={"right"}
                              color="text.secondary"
                              sx={{
                                wordBreak: "break-all",
                              }}
                            >
                              {formatCurrency(el.amount)}
                            </Typography>
                          </Grid2>
                        </Grid2>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItem>
              ))}
            </Stack>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
};
export default TransactionMenu;
