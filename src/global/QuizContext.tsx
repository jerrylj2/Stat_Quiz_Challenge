import React, { createContext, useMemo, useState } from "react";
import { cardColor } from "./consts/globalConst";

type QuizContextType = {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
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
};

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [score, setScore] = useState<number>(0);
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
    const [failedCount, setFailedCount] = useState<number>(0);
    const [quizData, setQuizData] = useState({
        names: ["", "", "", ""],
        stats: [0, 0, 0, 0],
        startTime: 0,
        correctAnswer: 0,
    });

    const value = useMemo(
        () => ({
            score,
            setScore,
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
            failedCount,
            setFailedCount,
            quizData,
            setQuizData,
        }),
        [
            score,
            cardColors,
            submission,
            selectedPlayer,
            count,
            openAnswerPopup,
            failedCount,
            quizData,
        ],
    );

    return (
        <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
    );
}

export default QuizContext;
