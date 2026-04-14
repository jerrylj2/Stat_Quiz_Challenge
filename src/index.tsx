import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StatApp from "./StatApp";
import { GlobalProvider } from "./global/GlobalContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <GlobalProvider>
            <StatApp />
        </GlobalProvider>
    </React.StrictMode>,
);
