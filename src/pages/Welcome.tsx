import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { GitHub } from "@mui/icons-material";
import { Link } from "@mui/material";
import GlobalContext from "../global/GlobalContext";

const Welcome = () => {
    const [usernameError, setUsernameError] = useState<string>("");
    const { username, setUsername } = useContext(GlobalContext);

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
        <>
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
                            id="username"
                            label="Username"
                            name="username"
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
                            disabled={username.length < 2}
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
        </>
    );
};

export default Welcome;
