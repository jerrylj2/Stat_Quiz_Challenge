import React, { createContext, useMemo, useState } from "react";

type GlobalContextType = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    field: string;
    setField: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string>("");
    const [field, setField] = useState<string>("NBA");

    const value = useMemo(
        () => ({
            username,
            setUsername,
            field,
            setField,
        }),
        [username, field],
    );

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
