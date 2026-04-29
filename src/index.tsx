import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StatApp from "./StatApp";
import { GlobalProvider } from "./global/GlobalContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const theme = createTheme({
    palette: {
        neutral: {
            main: "#ffad33",
            contrastText: "#000000",
        },
    },
});

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
    }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

root.render(
    <React.StrictMode>
        <GlobalProvider>
            <ThemeProvider theme={theme}>
                <StatApp />
            </ThemeProvider>
        </GlobalProvider>
    </React.StrictMode>,
);
