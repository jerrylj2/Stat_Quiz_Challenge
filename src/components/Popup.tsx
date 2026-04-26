import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../global/GlobalContext";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const Popup = () => {
    const {
        count,
        setCount,
        setScore,
        openAnswerPopup,
        setOpenAnswerPopup,
        submissionCheck,
        setFailedCount,
    } = useContext(GlobalContext);

    const navigate = useNavigate();

    if (submissionCheck === "correct" && count !== 10) {
        return (
            <div>
                <Modal open={openAnswerPopup}>
                    <Box sx={style} style={{ backgroundColor: "#73e673" }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            align="center"
                            sx={{ fontWeight: 500 }}
                        >
                            Correct!
                        </Typography>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="neutral"
                                size="small"
                                fullWidth
                                onClick={() => {
                                    setCount((prev: number) => prev + 1);
                                    setOpenAnswerPopup(false);
                                }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    }

    if (submissionCheck === "incorrect") {
        return (
            <div>
                <Modal open={openAnswerPopup}>
                    <Box sx={style} style={{ backgroundColor: "#f15757" }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            align="center"
                            sx={{ fontWeight: 500 }}
                        >
                            Incorrect!
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="neutral"
                                size="small"
                                onClick={() => {
                                    navigate("/leaderboard");
                                }}
                            >
                                View Leaderboard
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="neutral"
                                size="small"
                                onClick={() => {
                                    setOpenAnswerPopup(false);
                                    setScore(0);
                                    count === 1
                                        ? setFailedCount((prev) => prev + 1)
                                        : setCount(1);
                                }}
                            >
                                Try Again!
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    }

    if (submissionCheck === "correct" && count === 10) {
        return (
            <div>
                <Modal open={openAnswerPopup}>
                    <Box sx={style} style={{ backgroundColor: "#73e673" }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            align="center"
                            sx={{ fontWeight: 500 }}
                        >
                            Congratulations!
                        </Typography>
                        <Typography
                            variant="h4"
                            component="h2"
                            align="center"
                            sx={{ fontWeight: 500 }}
                        >
                            You beat the Quiz!
                        </Typography>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="neutral"
                                size="small"
                                fullWidth
                                onClick={() => {
                                    navigate("/leaderboard");
                                }}
                            >
                                View Leaderboard
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    }

    return null;
};

export default Popup;
