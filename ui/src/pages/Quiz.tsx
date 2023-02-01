import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import "../StatApp.css";
import Popup from "../components/Popup";
import TopAppBar from "../components/TopAppBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PlayerCard from "../components/PlayerCard";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import axios from 'axios';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#ffad33',
            contrastText: '#000000',
        },
    },
});

const Quiz = () => {
    const [searchparams] = useSearchParams();
    const username: string = searchparams.get("username") as string;
    const field: string = searchparams.get("field") as string;
    const default_color: string = "black";
    const active_color: string = "#8ccae4";
    const correct_color: string = "#73e673";
    const wrong_color: string = "#f15757";

    interface Player {
        stat: {
            name: string,
            full_name: string,
        },
        player1: {
            name: string,
            stat: number,
            id: number,
            color: string
        },
        player2: {
            name: string,
            stat: number,
            id: number,
            color: string
        },
        player3: {
            name: string,
            stat: number,
            id: number,
            color: string
        },
        player4: {
            name: string,
            stat: number,
            id: number,
            color: string
        }
    };

    const [player, setPlayer] = useState<Player>({
        stat: {
            name: "",
            full_name: "",
        },
        player1: {
            name: "",
            stat: 0,
            id: 0,
            color: default_color
        },
        player2: {
            name: "",
            stat: 0,
            id: 0,
            color: default_color
        },
        player3: {
            name: "",
            stat: 0,
            id: 0,
            color: default_color
        },
        player4: {
            name: "",
            stat: 0,
            id: 0,
            color: default_color
        }
    });
    const [count, setCount] = useState<number>(1);
    const [submission, setSubmission] = useState<number>();
    const [correctAnswer, setCorrectAnswer] = useState<number>();
    const [submissionCheck, setSubmissionCheck] = useState<string>("");
    const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [statLink, setStatLink] = useState<string>("");
    const [statAbbrv, setStatAbbrv] = useState<string>("");
    const [statName, setStatName] = useState<string>("");
    
    const updateImageColor = (color1: string, color2: string, color3: string, color4: string): void => {
        setPlayer(previousState => {
            return {
                ...previousState,
                player1: {
                    ...previousState.player1,
                    color: color1
                },
                player2: {
                    ...previousState.player2,
                    color: color2
                },
                player3: {
                    ...previousState.player3,
                    color: color3
                },
                player4: {
                    ...previousState.player4,
                    color: color4
                }
            };
        });
    };

    const addCount = (): void => setCount(count + 1);
    const updateSubmission = (stat: number): void => setSubmission(stat);
    const updateSelectedPlayer = (player: number): void => setSelectedPlayer(player);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);
    let disabledQuizButton: boolean;
    if(selectedPlayer === 0){
        disabledQuizButton = true;
    } else {
        disabledQuizButton = false;
    };

    const check = (selection: number | undefined, answer: number | undefined, player_num: number): void => {
        let colors: string[] = [];
        let stats: number[] = [player.player1.stat, player.player2.stat, player.player3.stat, player.player4.stat];

        for (let i = 0; i < 4; i++) {
            if ((i === player_num - 1) && (selection === answer)) {
                setSubmissionCheck("correct");
                colors.push(correct_color);
            } else if ((i === player_num - 1) && (selection !== answer)) {
                setSubmissionCheck("incorrect");
                colors.push(wrong_color);
            } else if (stats[i] === answer) {
                colors.push(correct_color);
            } else {
                colors.push(default_color);
            };
        };

        updateImageColor(colors[0], colors[1], colors[2], colors[3]);
    };

    useEffect(() => {
        let settings = { method: "Get" };

        // Post count and field to the server
        axios.post("http://localhost:3001/parameters", {
            count: count,
            field: field
        });

        // Gets stat details stored in DB
        fetch("/api")
            .then((res) => res.json())
            .then((data) => {
                setStatLink(data.statDetails.StatLink)
                setStatAbbrv(data.statDetails.StatAbbrv)
                setStatName(data.statDetails.StatName)
            });

        fetch(statLink, settings)
            .then(res => res.json())
            .then((json) => {
                let stat_index: number = json.resultSet.headers.indexOf(statAbbrv);
                let name_index: number = json.resultSet.headers.indexOf('PLAYER_NAME');
                let id_index: number = json.resultSet.headers.indexOf('PLAYER_ID');
                let rank: number = Math.floor(Math.random() * 97);
                let rank_arr: number[] = [rank, rank + 1, rank + 2, rank + 3];
                let random_rank_arr: number[] = [];

                while (random_rank_arr.length <= 3) {
                    let random_number: number = Math.floor(Math.random() * rank_arr.length);
                    let removed_element: number = rank_arr.splice(random_number, 1)[0];
                    random_rank_arr.push(removed_element);
                };

                updateImageColor(default_color, default_color, default_color, default_color);
                setCorrectAnswer(json.resultSet.rowSet[random_rank_arr[random_rank_arr.indexOf(rank)]][stat_index].toLocaleString('en-US'));
                setSubmissionCheck("");
                setSelectedPlayer(0);
                setPlayer({
                    stat: {
                        name: statAbbrv,
                        full_name: statName,
                    },
                    player1: {
                        name: json.resultSet.rowSet[random_rank_arr[0]][name_index],
                        stat: json.resultSet.rowSet[random_rank_arr[0]][stat_index].toLocaleString('en-US'),
                        id: json.resultSet.rowSet[random_rank_arr[0]][id_index],
                        color: default_color
                    },
                    player2: {
                        name: json.resultSet.rowSet[random_rank_arr[1]][name_index],
                        stat: json.resultSet.rowSet[random_rank_arr[1]][stat_index].toLocaleString('en-US'),
                        id: json.resultSet.rowSet[random_rank_arr[1]][id_index],
                        color: default_color
                    },
                    player3: {
                        name: json.resultSet.rowSet[random_rank_arr[2]][name_index],
                        stat: json.resultSet.rowSet[random_rank_arr[2]][stat_index].toLocaleString('en-US'),
                        id: json.resultSet.rowSet[random_rank_arr[2]][id_index],
                        color: default_color
                    },
                    player4: {
                        name: json.resultSet.rowSet[random_rank_arr[3]][name_index],
                        stat: json.resultSet.rowSet[random_rank_arr[3]][stat_index].toLocaleString('en-US'),
                        id: json.resultSet.rowSet[random_rank_arr[3]][id_index],
                        color: default_color
                    }
                });
            });
    }, [count, statAbbrv, statLink, statName]);

    return (
        <ThemeProvider theme={theme}>
            <TopAppBar username={username} count={count + "/10"}></TopAppBar>
            <Container maxWidth="sm" component="main" >
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: "88vh", 
                    }}
                    mt={3}
                >
                    <Box>
                        <Typography variant="h6" component="h2" align="center">
                            {"Which NBA player has the most " + player.stat.full_name + " in their career?"}
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <PlayerCard 
                                players={player.player1} 
                                player_num={1}
                                default_color={default_color}
                                active_color={active_color}
                                updateImageColor={updateImageColor} 
                                updateSubmission={updateSubmission} 
                                updateSelectedPlayer={updateSelectedPlayer}
                                selectedPlayer={selectedPlayer}
                                open={open}
                                correctAnswer={correctAnswer}
                            ></PlayerCard>
                        </Grid>
                        <Grid xs={6}>
                            <PlayerCard 
                                players={player.player2} 
                                player_num={2}
                                default_color={default_color}
                                active_color={active_color}
                                updateImageColor={updateImageColor} 
                                updateSubmission={updateSubmission} 
                                updateSelectedPlayer={updateSelectedPlayer}
                                selectedPlayer={selectedPlayer}
                                open={open}
                                correctAnswer={correctAnswer}
                            ></PlayerCard>
                        </Grid>
                        <Grid xs={6}>
                            <PlayerCard 
                                players={player.player3} 
                                player_num={3}
                                default_color={default_color}
                                active_color={active_color}
                                updateImageColor={updateImageColor} 
                                updateSubmission={updateSubmission} 
                                updateSelectedPlayer={updateSelectedPlayer}
                                selectedPlayer={selectedPlayer}
                                open={open}
                                correctAnswer={correctAnswer}
                            ></PlayerCard>
                        </Grid>
                        <Grid xs={6}>
                            <PlayerCard 
                                players={player.player4} 
                                player_num={4}
                                default_color={default_color}
                                active_color={active_color}
                                updateImageColor={updateImageColor} 
                                updateSubmission={updateSubmission} 
                                updateSelectedPlayer={updateSelectedPlayer}
                                selectedPlayer={selectedPlayer}
                                open={open}
                                correctAnswer={correctAnswer}
                            ></PlayerCard>
                        </Grid>
                    </Grid>
                    <Popup 
                        handleClose={handleClose} 
                        open={open} 
                        answer={submissionCheck} 
                        count={count} 
                        addCount={addCount}
                    ></Popup>
                    <Typography variant="body2" color="text.secondary" align="center" mt={2} mb={5}>
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
                    sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: 0 }}
                    size="large"
                    onClick={() => {
                        check(submission, correctAnswer, selectedPlayer)
                        handleOpen()
                    }}
                    disabled={disabledQuizButton}
                >
                    Submit
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default Quiz;