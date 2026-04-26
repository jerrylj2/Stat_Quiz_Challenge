import GlobalContext from "../global/GlobalContext";
import { useContext, useEffect } from "react";

const useGetRanking = (
    rank: string,
    setRankingMessage: (message: string) => void,
) => {
    const { score } = useContext(GlobalContext);

    useEffect(() => {
        if (rank === "") return;
        let ordinal_rank: string = "";
        let rank_message: string = "";

        if (score > 0) {
            if (["11", "12", "13"].includes(rank.substring(rank.length - 2))) {
                ordinal_rank = rank + "th";
            } else {
                switch (rank.charAt(rank.length - 1)) {
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
                }
            }
            rank_message =
                "You ranked " +
                ordinal_rank +
                " with a score of " +
                score +
                "!";
        } else {
            rank_message = "";
        }

        setRankingMessage(rank_message);
    }, [rank]);
};

export default useGetRanking;
