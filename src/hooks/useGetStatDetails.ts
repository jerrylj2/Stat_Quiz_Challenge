import { useContext, useEffect } from "react";
import GlobalContext from "../global/GlobalContext";
import { getStatDetails } from "../utils/getStatDetails";

const useGetStatDetails = () => {
    const { count, field, setIsLoading, setStatDetails } =
        useContext(GlobalContext);
    const handleGetStatDetails = async () => {
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
