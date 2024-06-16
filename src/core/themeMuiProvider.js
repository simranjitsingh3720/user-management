import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: '#F7FAFF',
    },
    color: {
      default: '#465465',
    },
    primary: {
      main: "#185EC4",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 14, // Default font size for small screens
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const updatedTheme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: theme.typography.fontSize, // Default font size
          [theme.breakpoints.up('lg')]: {
            fontSize: '16px', // Font size for large screens
          },
        },
      },
    },
  },
});

export default updatedTheme;
