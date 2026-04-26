import { useContext } from "react";
import Popup from "../components/Popup";
import TopAppBar from "../components/TopAppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PlayerCard from "../components/PlayerCard";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import GlobalContext from "../global/GlobalContext";
import { useNavigate } from "react-router-dom";
import { cardColor } from "../global/consts/globalConst";
import { tally } from "../utils/tally";
import { saveScore } from "../utils/saveScore";
import useGetStatDetails from "../hooks/useGetStatDetails";
import useGetPlayerDetails from "../hooks/useGetPlayerDetails";

const Quiz = () => {
    const {
        username,
        score,
        setScore,
        isLoading,
        submission,
        selectedPlayer,
        setCardColors,
        count,
        setOpenAnswerPopup,
        setSubmissionCheck,
        quizData,
        statDetails,
    } = useContext(GlobalContext);

    const navigate = useNavigate();

    const check = (
        selection: number | undefined,
        answer: number | undefined,
        player_num: number,
    ): void => {
        let colors: string[] = [];

        for (let i = 0; i < 4; i++) {
            if (i === player_num - 1 && selection === answer) {
                setSubmissionCheck("correct");
                setScore(tally(score, quizData.startTime));
                colors.push(cardColor.correct);
                if (count === 10) saveScore(username, score);
            } else if (i === player_num - 1 && selection !== answer) {
                setSubmissionCheck("incorrect");
                colors.push(cardColor.wrong);
                if (score !== 0) saveScore(username, score);
            } else if (quizData.stats[i] === answer) {
                colors.push(cardColor.correct);
            } else {
                colors.push(cardColor.default);
            }
        }

        setCardColors([colors[0], colors[1], colors[2], colors[3]]);
    };

    useGetStatDetails();

    useGetPlayerDetails();

    if (username === "") {
        navigate("/", { replace: true });
        return <></>;
    }

    return (
        <>
            <TopAppBar showCount={true} showScore={true}></TopAppBar>
            <Container maxWidth="sm" component="main">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "88vh",
                    }}
                    mt={3}
                >
                    <Box>
                        <Typography variant="h6" component="h2" align="center">
                            {isLoading
                                ? "Loading..."
                                : "Which NBA player has the most " +
                                  statDetails.statname +
                                  " in their career?"}
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4].map((playerNum) => (
                            <Grid xs={6}>
                                <PlayerCard
                                    playerNum={playerNum}
                                    playerName=""
                                    playerStat={0}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        mt={2}
                        mb={5}
                    >
                        * Names and data are from NBA.com
                    </Typography>
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
                        check(
                            submission,
                            quizData.correctAnswer,
                            selectedPlayer,
                        );
                        setOpenAnswerPopup(true);
                    }}
                    disabled={selectedPlayer === 0}
                >
                    Submit
                </Button>
            </Box>
            <Popup />
        </>
    );
};

export default Quiz;
