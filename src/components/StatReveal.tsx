import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import QuizContext from "../global/QuizContext";

interface StatRevealProps {
    playerStat: number;
    playerNum: number;
}

const revealStyle = {
    position: "absolute",
    bottom: 100,
    width: "100%",
    bgcolor: "rgba(0, 0, 0, 0.54)",
};

const StatReveal = ({ playerStat, playerNum }: StatRevealProps) => {
    const { openAnswerPopup, quizData, selectedPlayer } =
        useContext(QuizContext);

    if (!openAnswerPopup) return null;

    if (playerStat === quizData.correctAnswer) {
        return (
            <Box sx={revealStyle} style={{ color: "#73e673" }}>
                <Typography
                    align="center"
                    variant="h5"
                    sx={{ fontWeight: 600 }}
                >
                    {playerStat}
                </Typography>
            </Box>
        );
    }

    if (playerStat !== quizData.correctAnswer && playerNum === selectedPlayer) {
        return (
            <Box sx={revealStyle} style={{ color: "#f15757" }}>
                <Typography
                    align="center"
                    variant="h5"
                    sx={{ fontWeight: 600 }}
                >
                    {playerStat}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={revealStyle} style={{ color: "white" }}>
            <Typography align="center" variant="h5" sx={{ fontWeight: 600 }}>
                {playerStat}
            </Typography>
        </Box>
    );
};

export default StatReveal;
