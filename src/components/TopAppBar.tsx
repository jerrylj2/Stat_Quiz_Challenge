import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { memo, useContext } from "react";
import GlobalContext from "../global/GlobalContext";

interface AppBarUsername {
    username: string;
    count: string;
    score: number;
    showCount: boolean;
    showScore: boolean;
}

const TopAppBar = (props: AppBarUsername) => {
    const { username } = useContext(GlobalContext);
    let usernameFormatted: string;
    if (username.length > 9) {
        usernameFormatted = username.substring(0, 7) + "...";
    } else {
        usernameFormatted = username;
    }

    let countColor: string = props.showCount ? "black" : "#ffad33";

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    sx={{ color: "black", backgroundColor: "#ffad33" }}
                    variant="dense"
                >
                    <Avatar sx={{ width: 80, height: 40, bgcolor: countColor }}>
                        <Typography variant="h6">{props.count}</Typography>
                    </Avatar>
                    <Typography
                        variant="h6"
                        component="h5"
                        align="center"
                        sx={{ margin: "auto", fontWeight: "600" }}
                    >
                        Stat Quiz Challenge
                    </Typography>
                    <Badge
                        badgeContent={props.score}
                        color="success"
                        max={1000000}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        invisible={!props.showScore}
                        showZero
                    >
                        <Avatar
                            sx={{ width: 80, height: 40, bgcolor: "black" }}
                        >
                            <Typography variant="h6">
                                {usernameFormatted}
                            </Typography>
                        </Avatar>
                    </Badge>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default memo(TopAppBar);
