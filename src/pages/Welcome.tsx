import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { GitHub } from "@mui/icons-material";
import { Link } from "@mui/material";
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

const Welcome = () => {
    const [usernameError, setUsernameError] = useState<string>("");
    const { username, setUsername } = useContext(GlobalContext);

    let disabledWelcomeButton: boolean;
    if (username.length < 2) {
        disabledWelcomeButton = true;
    } else {
        disabledWelcomeButton = false;
    }
    const navigate = useNavigate();
    const usernameCheck = (value: string): void => {
        if (!value.match(/[%.*:;+=#{}/,|()&`~?<>\\$'"]/)) {
            setUsernameError("");
            setUsername(value);
        } else {
            setUsernameError("Invalid Character: " + value[value.length - 1]);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Typography variant="h5" component="h1" align="center">
                        Welcome to the Stat Quiz Challenge!
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            value={username}
                            color="success"
                            onChange={(e) => usernameCheck(e.target.value)}
                            helperText={usernameError}
                            error={!!usernameError}
                            inputProps={{ maxLength: 13 }}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="neutral"
                            sx={{ mt: 3 }}
                            onClick={() => {
                                navigate("/selection");
                            }}
                            disabled={disabledWelcomeButton}
                        >
                            Next
                        </Button>
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        sx={{ mt: 8 }}
                    >
                        Designed & coded by Jerry Jackson
                        <Link
                            href="https://github.com/jerrylj2"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                        >
                            <IconButton>
                                <GitHub />
                            </IconButton>
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Welcome;
