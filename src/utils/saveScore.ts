import axios from "axios";

export const saveScore = (username: string, score: number) => {
    axios.post(process.env.REACT_APP_API_URL + "/leaderboardparameters", {
        username: username,
        score: score,
    });
};