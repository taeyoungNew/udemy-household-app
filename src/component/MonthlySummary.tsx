import React from "react";
import { Grid2, Card, CardContent, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

/**
 * 한달간의 수입, 지출, 잔액을 표시하는 컴포넌트
 */
const MonthlySummary = () => {
  return (
    // flex적용
    <Grid2 container spacing={{ xs: 1, sm: 2 }} mb={2}>
      {/* 
        Grid2태그안에 있는 자식 Grid요소안에 display flex를 
        각각 주면 하나의 flex display가 늘어났을 때 
        나머지 자식 display도 같이 늘어난다. 
        다만 width가 좁아지는 현상을 막기위해선 flexDirection column과 
        각각 하위 card태그에 flexGrow를 부여해야 넓이를 유지하면서 동일하게 
        늘어난다.
      */}
      {/* 収入 */}
      <Grid2 size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            // theme에서 지정한 커스텀 pallete사용
            bgcolor: (theme) => theme.palette.incomeColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowUpwardIcon sx={{ fontsize: "2rem" }} />
              <Typography>収入</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              // 가격의 값을 줄바꿈
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              300円
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      {/* 支出 */}
      <Grid2 size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.expenseColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          {/* 1 = 8px padding */}
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowDownwardIcon sx={{ fontsize: "2rem" }} />
              <Typography>支出</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              // 가격의 값을 줄바꿈
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              300円
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      {/* 残高 */}
      <Grid2 size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.balanceColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <AccountBalanceIcon sx={{ fontsize: "2rem" }} />
              <Typography>残高</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              // 가격의 값을 줄바꿈
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              300円
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default MonthlySummary;
