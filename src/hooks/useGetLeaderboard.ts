import { useEffect } from "react";
import axios from "axios";

const useGetLeaderboard = (
    setRowData: React.Dispatch<React.SetStateAction<any[]>>,
    setRank: React.Dispatch<React.SetStateAction<string>>,
) => {
    const handleGetLeaderboard = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API_URL + "/leaderboard",
            );
            if (response.data.leaderboard !== undefined) {
                setRowData(response.data.leaderboard);
            }
            if (response.data.rank?.place !== undefined) {
                setRank(response.data.rank.place + "");
            }
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        }
    };

    useEffect(() => {
        handleGetLeaderboard();
    }, []);
};

export default useGetLeaderboard;
