import React, { createContext, useState } from "react";

type GlobalContextType = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    field: string;
    setField: React.Dispatch<React.SetStateAction<string>>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
};

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string>("");
    const [field, setField] = useState<string>("NBA");
    const [score, setScore] = useState<number>(0);

    return (
        <GlobalContext.Provider
            value={{ username, setUsername, field, setField, score, setScore }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
