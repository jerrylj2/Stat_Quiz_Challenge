import axios from "axios";

export const getStatDetails = async (count, field) => {
    try {
        return await axios
        .get(process.env.REACT_APP_API_URL + "/statdetails", {
            params: {
                count: count,
                field: field,
            },
        })
    } catch (error) {       
        console.error("Error fetching stat details: ", error);
    } 
}