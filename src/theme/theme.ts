import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";
import { blue, red, green } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
  }

  interface PaletteOptions {
    incomeColor: PaletteColorOptions;
    expenseColor: PaletteColorOptions;
    balanceColor: PaletteColorOptions;
  }
}

/**
 * 프로젝트 전체에 적용하는 테마
 */
export const theme = createTheme({
  /**
   * 폰트스타일
   */
  typography: {
    // 맨 앞에 정의한 "Noto Sans JP"가
    // 적용이 안될시 뒤에 있는 폰트들을 적용시킨다.
    fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
    // 폰트의 각각의 굵기
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  /**
   * 색을 적용
   *
   */
  palette: {
    incomeColor: {
      // MUI는 3개의 프로퍼티가 정해져있다.
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },
    expenseColor: {
      // MUI는 3개의 프로퍼티가 정해져있다.
      main: red[500],
      light: red[100],
      dark: red[700],
    },
    balanceColor: {
      // MUI는 3개의 프로퍼티가 정해져있다.
      main: green[500],
      light: green[100],
      dark: green[700],
    },
  },
});
