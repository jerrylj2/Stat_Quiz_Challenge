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
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    openAnswerPopup: boolean;
    setOpenAnswerPopup: React.Dispatch<React.SetStateAction<boolean>>;
    submissionCheck: string;
    setSubmissionCheck: React.Dispatch<React.SetStateAction<string>>;
    failedCount: number;
    setFailedCount: React.Dispatch<React.SetStateAction<number>>;
    quizData: {
        names: string[];
        stats: number[];
        startTime: number;
        correctAnswer: number;
    };
    setQuizData: React.Dispatch<
        React.SetStateAction<{
            names: string[];
            stats: number[];
            startTime: number;
            correctAnswer: number;
        }>
    >;
    statDetails: {
        statlink: string;
        statabbrv: string;
        statname: string;
    };
    setStatDetails: React.Dispatch<
        React.SetStateAction<{
            statlink: string;
            statabbrv: string;
            statname: string;
        }>
    >;
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
    const [count, setCount] = useState<number>(1);
    const [openAnswerPopup, setOpenAnswerPopup] = useState<boolean>(false);
    const [submissionCheck, setSubmissionCheck] = useState<string>("");
    const [failedCount, setFailedCount] = useState<number>(0);
    const [quizData, setQuizData] = useState({
        names: ["", "", "", ""],
        stats: [0, 0, 0, 0],
        startTime: 0,
        correctAnswer: 0,
    });
    const [statDetails, setStatDetails] = useState({
        statlink: "",
        statabbrv: "",
        statname: "",
    });

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
                count,
                setCount,
                openAnswerPopup,
                setOpenAnswerPopup,
                submissionCheck,
                setSubmissionCheck,
                failedCount,
                setFailedCount,
                quizData,
                setQuizData,
                statDetails,
                setStatDetails,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
