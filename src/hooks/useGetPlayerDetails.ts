import axios from "axios";
import GlobalContext from "../global/GlobalContext";
import { useContext, useEffect } from "react";
import { cardColor } from "../global/consts/globalConst";

const useGetPlayerDetails = () => {
    const {
        statDetails,
        setQuizData,
        setCardColors,
        setSubmissionCheck,
        setSelectedPlayer,
        setIsLoading,
        failedCount,
    } = useContext(GlobalContext);

    const handleGetPlayerDetails = async () => {
        try {
            const response = await axios.get(statDetails.statlink);
            const resultSet = response.data.resultSet;
            const stat_index: number = resultSet.headers.indexOf(
                statDetails.statabbrv,
            );
            const name_index: number = resultSet.headers.indexOf("PLAYER_NAME");
            const rank: number = Math.floor(Math.random() * 97);
            const rank_arr: number[] = [rank, rank + 1, rank + 2, rank + 3];
            const random_rank_arr: number[] = [];

            while (random_rank_arr.length <= 3) {
                const random_number: number = Math.floor(
                    Math.random() * rank_arr.length,
                );
                const removed_element: number = rank_arr.splice(
                    random_number,
                    1,
                )[0];
                random_rank_arr.push(removed_element);
            }

            const resultingNames = [];
            const resultingStats = [];
            for (let i = 0; i < 4; i++) {
                resultingNames.push(
                    resultSet.rowSet[random_rank_arr[i]][name_index],
                );
                resultingStats.push(
                    resultSet.rowSet[random_rank_arr[i]][
                        stat_index
                    ].toLocaleString("en-US"),
                );
            }

            setQuizData({
                names: resultingNames,
                stats: resultingStats,
                startTime: performance.now(),
                correctAnswer:
                    resultSet.rowSet[
                        random_rank_arr[random_rank_arr.indexOf(rank)]
                    ][stat_index].toLocaleString("en-US"),
            });
            setCardColors([
                cardColor.default,
                cardColor.default,
                cardColor.default,
                cardColor.default,
            ]);
            setSubmissionCheck("");
            setSelectedPlayer(0);
        } catch (error) {
            console.error("Error fetching player details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetPlayerDetails();
    }, [statDetails.statabbrv, failedCount]);
};

export default useGetPlayerDetails;
