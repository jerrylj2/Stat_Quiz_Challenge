import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

interface PopupType {
    handleClose(): void;
    open: boolean;
    answer: string;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    setFailedCount: React.Dispatch<React.SetStateAction<number>>;
    addCount(): void;
    tally(): void;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    field: string;
}

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

const Popup = (props: PopupType) => {
    const navigate = useNavigate();

    if (props.answer === "correct" && props.count !== 10) {
        return (
            <div>
                <Modal open={props.open}>
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
                                    props.addCount();
                                    props.handleClose();
                                }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    } else if (props.answer === "correct" && props.count === 10) {
        return (
            <div>
                <Modal open={props.open}>
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
    if (props.answer === "incorrect") {
        return (
            <div>
                <Modal open={props.open}>
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
                                    props.handleClose();
                                    props.setScore(0);
                                    props.count === 1
                                        ? props.setFailedCount(
                                              (prev) => prev + 1,
                                          )
                                        : props.setCount(1);
                                }}
                            >
                                Try Again!
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    } else {
        return null;
    }
};

export default Popup;
