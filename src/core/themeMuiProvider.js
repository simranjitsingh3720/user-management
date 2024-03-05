import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#185EC4",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif", // Set your desired font family here
    // You can also customize other typography styles like fontSize, fontWeight, etc.
  },
});

export default theme;
