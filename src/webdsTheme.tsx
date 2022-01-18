import {
  createTheme,
} from "@mui/material/styles";


const webdsTheme = createTheme({
  palette: {
    primary: {
      main: "#007DC3"
    },
    secondary: {
      main: "#A33E7F"
    },
  },
  //spacing: 8,
  components: {
        MuiButton: {
          styleOverrides: {
            root: { padding: 5 },
          },
        },
		MuiAvatar: {
          defaultProps: {
            sx: {
              bgcolor: "#007DC3"
            },
        }
      }
    },
    //typography: 8,
    typography: {
        h1: {
            fontSize: 30,
            fontWeight: 300,
            color: "#FFFFFF",
            letterSpacing: "0.0075em",
            verticalAlign: "middle",
            alignItems: "center",
            textAlign: "center"
        },
        h3: {
            fontSize: 30,
            fontWeight: 600,
            color: "#000000",
            letterSpacing: "0.0075em",
            verticalAlign: "middle",
            alignItems: "center",
            textAlign: "center"
        }
    }    
});


export default webdsTheme