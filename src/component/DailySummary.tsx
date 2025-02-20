import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import React from "react";

const DailySummary = () => {
  return (
    <Box>
      <Grid2 container spacing={2}>
        {/* 収入 */}
        <Grid2 size={{ xs: 6 }} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                収入
              </Typography>
              <Typography
                // color={(theme) => theme.palette.incomeColor.main}
                // color='primary'
                // color=""
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  color: (theme) => theme.palette.incomeColor.main,
                  wordBreak: "break-all",
                }}
              >
                ¥500
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        {/* 支出 */}
        <Grid2 size={{ xs: 6 }} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                支出
              </Typography>
              <Typography
                // color={(theme) => theme.palette.expenseColor.main}
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  color: (theme) => theme.palette.expenseColor.main,
                  wordBreak: "break-all",
                }}
              >
                ¥300
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        {/* 残高 */}
        <Grid2 size={{ xs: 12 }} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                残高
              </Typography>
              <Typography
                // color={(theme) => theme.palette.balanceColor.main}
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  color: (theme) => theme.palette.balanceColor.main,
                  wordBreak: "break-all",
                }}
              >
                ¥200
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default DailySummary;
