import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TopAppBar from "../components/TopAppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../global/GlobalContext";
import useGetLeaderboard from "../hooks/useGetLeaderboard";
import useGetRanking from "../hooks/useGetRanking";

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
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    "&:first-child": {
        backgroundColor: theme.palette.neutral.main,
    },
}));

const StyledTableHeader = styled(TableHead)(() => ({
    "th: nth-child(1)": {
        borderRadius: "50px 0 0 0",
    },

    "th: nth-child(3)": {
        borderRadius: "0 50px 0 0",
    },
}));

interface leaderboard {
    username: string;
    score: number;
}

const Leaderboard = () => {
    const [rowData, setRowData] = useState<leaderboard[]>([
        { username: "", score: 0 },
    ]);
    const [rank, setRank] = useState<string>("");
    const [rankingMessage, setRankingMessage] = useState<string>("");

    const { username, setScore } = useContext(GlobalContext);

    const navigate = useNavigate();

    useGetLeaderboard(setRowData, setRank);

    useGetRanking(rank, setRankingMessage);

    if (username === "") {
        navigate("/", { replace: true });
        return <></>;
    }

    return (
        <>
            <TopAppBar showCount={false} showScore={true}></TopAppBar>
            <Container maxWidth="lg" component="main">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "88vh",
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            align="center"
                            sx={{ fontWeight: 600, color: "green" }}
                        >
                            {rankingMessage}
                        </Typography>
                    </Box>
                    <TableContainer
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Table
                            sx={{ maxWidth: 300, borderRadius: "50px" }}
                            aria-label="customized table"
                            component={Paper}
                        >
                            <StyledTableHeader>
                                <StyledTableCell align="center">
                                    Rank
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Username
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Score
                                </StyledTableCell>
                            </StyledTableHeader>
                            <TableBody>
                                {rowData.map((row, index) => (
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                            sx={{ fontWeight: 900 }}
                                        >
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            sx={{ fontWeight: 900 }}
                                        >
                                            {row.username}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            sx={{ fontWeight: 900 }}
                                        >
                                            {row.score}
                                        </StyledTableCell>
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
                        sx={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                        }}
                        size="large"
                        onClick={() => {
                            setScore(0);
                            navigate("/quiz");
                        }}
                    >
                        Try Again!
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default Leaderboard;
