import { useState, useEffect, useContext } from "react";
import Popup from "../components/Popup";
import TopAppBar from "../components/TopAppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PlayerCard from "../components/PlayerCard";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import axios from "axios";
import GlobalContext from "../global/GlobalContext";
import { useNavigate } from "react-router-dom";
import { cardColor } from "../global/consts/globalConst";
import { tally } from "../utils/tally";
import { saveScore } from "../utils/saveScore";

interface statDetailsType {
    statlink: string;
    statabbrv: string;
    statname: string;
}

const Quiz = () => {
    const [startTime, setStartTime] = useState<number | undefined>();
    const [quizData, setQuizData] = useState({
        names: ["", "", "", ""],
        stats: [0, 0, 0, 0],
    });
    const [statDetails, setStatDetails] = useState<statDetailsType>({
        statlink: "",
        statabbrv: "",
        statname: "",
    });

    const {
        username,
        field,
        score,
        setScore,
        isLoading,
        setIsLoading,
        submission,
        selectedPlayer,
        setSelectedPlayer,
        setCardColors,
        count,
        setOpenAnswerPopup,
        correctAnswer,
        setCorrectAnswer,
        setSubmissionCheck,
        failedCount,
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
                setScore(tally(score, startTime));
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

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(process.env.REACT_APP_API_URL + "/statdetails", {
                params: {
                    count: count,
                    field: field,
                },
            })
            .then((result) => {
                setStatDetails({
                    statlink: result.data.statlink,
                    statabbrv: result.data.statabbrv,
                    statname: result.data.statname,
                });
            });
    }, [count, field]);

    useEffect(() => {
        const controller = new AbortController();
        fetch(statDetails.statlink, { signal: controller.signal })
            .then((res) => res.json())
            .then((json) => {
                let stat_index: number = json.resultSet.headers.indexOf(
                    statDetails.statabbrv,
                );
                let name_index: number =
                    json.resultSet.headers.indexOf("PLAYER_NAME");
                let rank: number = Math.floor(Math.random() * 97);
                let rank_arr: number[] = [rank, rank + 1, rank + 2, rank + 3];
                let random_rank_arr: number[] = [];

                while (random_rank_arr.length <= 3) {
                    let random_number: number = Math.floor(
                        Math.random() * rank_arr.length,
                    );
                    let removed_element: number = rank_arr.splice(
                        random_number,
                        1,
                    )[0];
                    random_rank_arr.push(removed_element);
                }

                const resultingNames = [];
                const resultingStats = [];
                for (let i = 0; i < 4; i++) {
                    resultingNames.push(
                        json.resultSet.rowSet[random_rank_arr[i]][name_index],
                    );
                    resultingStats.push(
                        json.resultSet.rowSet[random_rank_arr[i]][
                            stat_index
                        ].toLocaleString("en-US"),
                    );
                }

                setQuizData({
                    names: resultingNames,
                    stats: resultingStats,
                });

                setCardColors([
                    cardColor.default,
                    cardColor.default,
                    cardColor.default,
                    cardColor.default,
                ]);
                setCorrectAnswer(
                    json.resultSet.rowSet[
                        random_rank_arr[random_rank_arr.indexOf(rank)]
                    ][stat_index].toLocaleString("en-US"),
                );
                setSubmissionCheck("");
                setSelectedPlayer(0);

                setStartTime(performance.now());
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log(error.message);
                }
            });

        return () => {
            controller.abort();
        };
    }, [statDetails.statabbrv, failedCount]);

    if (username === "") {
        navigate("/", { replace: true });
        return <></>;
    }

    return (
        <>
            <TopAppBar
                username={username}
                count={count + "/10"}
                score={score}
                showCount={true}
                showScore={true}
            ></TopAppBar>
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
                    <Popup />
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
                        check(submission, correctAnswer, selectedPlayer);
                        setOpenAnswerPopup(true);
                    }}
                    disabled={selectedPlayer === 0}
                >
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default Quiz;
