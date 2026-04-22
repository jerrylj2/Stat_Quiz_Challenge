import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import GlobalContext from "../global/GlobalContext";

interface StatRevealProps {
    playerStat: number;
    playerNum: number;
}

const StatReveal = ({ playerStat, playerNum }: StatRevealProps) => {
    const { openAnswerPopup, correctAnswer, selectedPlayer } =
        useContext(GlobalContext);
    const revealStyle = {
        position: "absolute",
        bottom: 100,
        width: "100%",
        bgcolor: "rgba(0, 0, 0, 0.54)",
    };

    if (openAnswerPopup) {
        if (playerStat === correctAnswer) {
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
        } else if (
            playerStat !== correctAnswer &&
            playerNum === selectedPlayer
        ) {
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
        } else {
            return (
                <Box sx={revealStyle} style={{ color: "white" }}>
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
    } else {
        return null;
    }
};

export default StatReveal;
