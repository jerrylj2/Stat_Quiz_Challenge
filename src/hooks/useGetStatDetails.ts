import { useContext, useEffect } from "react";
import GlobalContext from "../global/GlobalContext";
import { getStatDetails } from "../utils/getStatDetails";
import QuizContext from "../global/QuizContext";

const useGetStatDetails = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setStatDetails: React.Dispatch<
        React.SetStateAction<{
            statlink: string;
            statabbrv: string;
            statname: string;
        }>
    >,
) => {
    const { field } = useContext(GlobalContext);
    const { count, setCount } = useContext(QuizContext);
    const handleGetStatDetails = async () => {
        if (count === 0) {
            setCount(1);
            return;
        }

        setIsLoading(true);

        try {
            const response = await getStatDetails(count, field);
            setStatDetails({
                statlink: response?.data.statlink,
                statabbrv: response?.data.statabbrv,
                statname: response?.data.statname,
            });
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetStatDetails();
    }, [count, field]);
};

export default useGetStatDetails;
