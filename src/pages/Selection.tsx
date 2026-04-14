import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Checkbox } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopAppBar from "../components/TopAppBar";
import "../StatApp.css";
import GlobalContext from "../global/GlobalContext";

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

const Selection = () => {
    const { username } = useContext(GlobalContext);
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <TopAppBar
                username={username}
                count={""}
                score={0}
                showCount={false}
                showScore={false}
            ></TopAppBar>
            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "88vh",
                    }}
                >
                    <Typography variant="h5" component="h1" align="center">
                        Select the field(s) that you want to quiz on!
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={true}
                                    style={{ color: "#ffad33" }}
                                    required
                                />
                            }
                            label="NBA"
                        />
                    </FormGroup>
                </Box>
            </Container>
            <Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="neutral"
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 0,
                    }}
                    size="large"
                    onClick={() => {
                        navigate("/quiz");
                    }}
                >
                    Start Quiz!
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default Selection;
