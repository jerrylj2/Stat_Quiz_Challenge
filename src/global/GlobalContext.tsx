import React, { createContext, useState } from "react";
import { cardColor } from "./consts/globalConst";

type GlobalContextType = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    field: string;
    setField: React.Dispatch<React.SetStateAction<string>>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    cardColors: string[];
    setCardColors: React.Dispatch<React.SetStateAction<string[]>>;
    submission: number;
    setSubmission: React.Dispatch<React.SetStateAction<number>>;
    selectedPlayer: number;
    setSelectedPlayer: React.Dispatch<React.SetStateAction<number>>;
};

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string>("");
    const [field, setField] = useState<string>("NBA");
    const [score, setScore] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cardColors, setCardColors] = useState<string[]>([
        cardColor.default,
        cardColor.default,
        cardColor.default,
        cardColor.default,
    ]);
    const [submission, setSubmission] = useState<number>(0);
    const [selectedPlayer, setSelectedPlayer] = useState<number>(0);

    return (
        <GlobalContext.Provider
            value={{
                username,
                setUsername,
                field,
                setField,
                score,
                setScore,
                isLoading,
                setIsLoading,
                cardColors,
                setCardColors,
                submission,
                setSubmission,
                selectedPlayer,
                setSelectedPlayer,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
