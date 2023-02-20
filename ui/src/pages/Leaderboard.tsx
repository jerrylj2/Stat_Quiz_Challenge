import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TopAppBar from '../components/TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#ffad33',
            contrastText: '#000000',
        },
    },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:first-child': {
        backgroundColor: theme.palette.neutral.main,
    },
}));

const Leaderboard = () => {
    interface leaderboard {
        Username: string,
        Score: number
    };
    
    const [testRows, setTestRows] = useState<leaderboard[]>([]);
    const [searchparams] = useSearchParams();
    const username: string = searchparams.get("username") as string;
    const score: number = (searchparams.get("score") as unknown) as number;
    const field: string = searchparams.get("field") as string;
    let rank: string = "23";
    let rank_length: number = rank.length;
    let ordinal_rank: string = "";
    let rank_message: string = "";
    const navigate = useNavigate();
    const toQuiz = (name: string) => {
        navigate({
            pathname: "/quiz",
            search: createSearchParams({
                username: name,
                field: field
            }).toString()
        });
    };
    
    if (rank_length > 0) {
        switch (rank.charAt(rank_length - 1)) {
            case "1":
                ordinal_rank = rank + "st";
                break;
            case "2":
                ordinal_rank = rank + "nd";
                break;
            case "3":
                ordinal_rank = rank + "rd";
                break;
            default:
                ordinal_rank = rank + "th";
        };

        rank_message = "You ranked " + ordinal_rank + " with a score of " + score + "!";
    };

    useEffect(() => {
        // Gets leaderboard data stored in DB
        fetch("/leaderboard")
            .then((res) => res.json())
            .then((data) => {
                setTestRows(data.leaderboard)
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <TopAppBar 
                username={username} 
                count={""} 
                score={score}
                showCount={false}
                showScore={true}
            ></TopAppBar>
            <Container maxWidth="lg" component="main" >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: "88vh",
                    }}
                >
                    <Box>
                        <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: "green" }}>
                            {rank_message}
                        </Typography>
                    </Box>
                    <TableContainer sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Table sx={{ maxWidth: 300 }} aria-label="customized table" component={Paper}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Rank</StyledTableCell>
                                    <StyledTableCell align="center">Username</StyledTableCell>
                                    <StyledTableCell align="center">Score</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {testRows.map((row, index) => (
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row" align="center" sx={{fontWeight:900}}>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center" sx={{fontWeight:900}}>{row.Username}</StyledTableCell>
                                        <StyledTableCell align="center" sx={{fontWeight:900}}>{row.Score}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="neutral"
                        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: 0 }}
                        size="large"
                        onClick={() => {
                            toQuiz(username)
                        }}
                    >
                        Try Again!
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Leaderboard;