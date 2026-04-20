import {
    useState,
    useEffect,
    useReducer,
    createContext,
    useContext,
} from "react";
import "../StatApp.css";
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

interface Actions {
    playerDetails: string;
    color: string;
}

const ACTIONS: Actions = {
    playerDetails: "playerDetails",
    color: "color",
};

interface Player {
    stat: {
        name: string;
        full_name: string;
    };
    player1: {
        name: string;
        stat: number;
        id: number;
        color: string;
    };
    player2: {
        name: string;
        stat: number;
        id: number;
        color: string;
    };
    player3: {
        name: string;
        stat: number;
        id: number;
        color: string;
    };
    player4: {
        name: string;
        stat: number;
        id: number;
        color: string;
    };
}

interface PlayerSpecific {
    name: string;
    stat: number;
    id: number;
    color: string;
}

interface ReducerAction extends Player {
    type: string;
    color: {
        player1: string;
        player2: string;
        player3: string;
        player4: string;
    };
}

const reducer = (player: Player, action: ReducerAction) => {
    switch (action.type) {
        case ACTIONS.playerDetails:
            return {
                stat: action.stat,
                player1: action.player1,
                player2: action.player2,
                player3: action.player3,
                player4: action.player4,
            };

        case ACTIONS.color:
            return {
                ...player,
                player1: {
                    ...player.player1,
                    color: action.color.player1,
                },
                player2: {
                    ...player.player2,
                    color: action.color.player2,
                },
                player3: {
                    ...player.player3,
                    color: action.color.player3,
                },
                player4: {
                    ...player.player4,
                    color: action.color.player4,
                },
            };

        default:
            return player;
    }
};

interface UserContextType {
    open: boolean;
    player_num: number;
    selectedPlayer: number;
    players: PlayerSpecific;
    correctAnswer: number | undefined;
}

const iUserContextState = {
    open: false,
    player_num: 0,
    selectedPlayer: 0,
    players: {
        name: "",
        stat: 0,
        id: 0,
        color: "",
    },
    correctAnswer: undefined,
};

export const UserContext = createContext<UserContextType>(iUserContextState);

const Quiz = () => {
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
    } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [player, dispatch] = useReducer(reducer, {
        stat: {
            name: "",
            full_name: "",
        },
        player1: {
            name: "",
            stat: 0,
            id: 0,
            color: cardColor.default,
        },
        player2: {
            name: "",
            stat: 0,
            id: 0,
            color: cardColor.default,
        },
        player3: {
            name: "",
            stat: 0,
            id: 0,
            color: cardColor.default,
        },
        player4: {
            name: "",
            stat: 0,
            id: 0,
            color: cardColor.default,
        },
    });
    const [count, setCount] = useState<number>(1);
    const [correctAnswer, setCorrectAnswer] = useState<number>();
    const [submissionCheck, setSubmissionCheck] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | undefined>();
    const [failedCount, setFailedCount] = useState<number>(0);

    interface statDetailsType {
        statlink: string;
        statabbrv: string;
        statname: string;
    }

    const [statDetails, setStatDetails] = useState<statDetailsType>({
        statlink: "",
        statabbrv: "",
        statname: "",
    });

    const addCount = (): void =>
        setCount((prevCount) => {
            return prevCount + 1;
        });
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);
    let disabledQuizButton: boolean;
    if (selectedPlayer === 0) {
        disabledQuizButton = true;
    } else {
        disabledQuizButton = false;
    }

    const tally = () => {
        if (startTime !== undefined) {
            let timeSpent: number = (performance.now() - startTime) / 1000;
            if (timeSpent < 10) {
                setScore((prevScore) => {
                    return prevScore + 100;
                });
            } else if (timeSpent < 20) {
                setScore((prevScore) => {
                    return prevScore + 75;
                });
            } else if (timeSpent < 30) {
                setScore((prevScore) => {
                    return prevScore + 50;
                });
            } else {
                setScore((prevScore) => {
                    return prevScore + 25;
                });
            }
        }
    };

    const check = (
        selection: number | undefined,
        answer: number | undefined,
        player_num: number,
    ): void => {
        let colors: string[] = [];
        let stats: number[] = [
            player.player1.stat,
            player.player2.stat,
            player.player3.stat,
            player.player4.stat,
        ];

        for (let i = 0; i < 4; i++) {
            if (i === player_num - 1 && selection === answer) {
                setSubmissionCheck("correct");
                tally();
                colors.push(cardColor.correct);
                if (count === 10) saveScore();
            } else if (i === player_num - 1 && selection !== answer) {
                setSubmissionCheck("incorrect");
                colors.push(cardColor.wrong);
                if (score !== 0) saveScore();
            } else if (stats[i] === answer) {
                colors.push(cardColor.correct);
            } else {
                colors.push(cardColor.default);
            }
        }

        setCardColors([colors[0], colors[1], colors[2], colors[3]]);
    };

    const saveScore = () => {
        axios.post(process.env.REACT_APP_API_URL + "/leaderboardparameters", {
            username: username,
            score: score,
        });
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
                let id_index: number =
                    json.resultSet.headers.indexOf("PLAYER_ID");
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
                dispatch({
                    type: ACTIONS.playerDetails,
                    stat: {
                        name: statDetails.statabbrv,
                        full_name: statDetails.statname,
                    },
                    player1: {
                        name: json.resultSet.rowSet[random_rank_arr[0]][
                            name_index
                        ],
                        stat: json.resultSet.rowSet[random_rank_arr[0]][
                            stat_index
                        ].toLocaleString("en-US"),
                        id: json.resultSet.rowSet[random_rank_arr[0]][id_index],
                        color: cardColor.default,
                    },
                    player2: {
                        name: json.resultSet.rowSet[random_rank_arr[1]][
                            name_index
                        ],
                        stat: json.resultSet.rowSet[random_rank_arr[1]][
                            stat_index
                        ].toLocaleString("en-US"),
                        id: json.resultSet.rowSet[random_rank_arr[1]][id_index],
                        color: cardColor.default,
                    },
                    player3: {
                        name: json.resultSet.rowSet[random_rank_arr[2]][
                            name_index
                        ],
                        stat: json.resultSet.rowSet[random_rank_arr[2]][
                            stat_index
                        ].toLocaleString("en-US"),
                        id: json.resultSet.rowSet[random_rank_arr[2]][id_index],
                        color: cardColor.default,
                    },
                    player4: {
                        name: json.resultSet.rowSet[random_rank_arr[3]][
                            name_index
                        ],
                        stat: json.resultSet.rowSet[random_rank_arr[3]][
                            stat_index
                        ].toLocaleString("en-US"),
                        id: json.resultSet.rowSet[random_rank_arr[3]][id_index],
                        color: cardColor.default,
                    },
                    color: {
                        player1: player.player1.color,
                        player2: player.player2.color,
                        player3: player.player3.color,
                        player4: player.player4.color,
                    },
                });
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
                                  player.stat.full_name +
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
                    <Popup
                        handleClose={handleClose}
                        open={open}
                        answer={submissionCheck}
                        count={count}
                        setCount={setCount}
                        setFailedCount={setFailedCount}
                        addCount={addCount}
                        tally={tally}
                        score={score}
                        setScore={setScore}
                        field={field}
                    ></Popup>
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
                        handleOpen();
                    }}
                    disabled={disabledQuizButton}
                >
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default Quiz;
