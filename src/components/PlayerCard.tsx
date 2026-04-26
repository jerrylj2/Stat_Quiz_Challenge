import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { CardActionArea, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import StatReveal from "./StatReveal";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { cardColor } from "../global/consts/globalConst";
import QuizContext from "../global/QuizContext";

interface PlayerDetails {
    playerNum: number;
    playerName: string;
    playerStat: number;
    isLoading: boolean;
}

const PlayerCard = ({
    playerNum,
    playerName,
    playerStat,
    isLoading,
}: PlayerDetails) => {
    const { cardColors, setCardColors, setSubmission, setSelectedPlayer } =
        useContext(QuizContext);

    let shadow: string = "";
    switch (playerNum) {
        case 1:
            shadow = "-10px 10px 5px grey";
            break;
        case 2:
            shadow = "10px 10px 5px grey";
            break;
        case 3:
            shadow = "-10px 10px 5px grey";
            break;
        case 4:
            shadow = "10px 10px 5px grey";
            break;
    }

    const updateColors = (color: string) => {
        const newColors: string[] = [];
        cardColors.forEach((card, index: number) => {
            if (index === playerNum - 1) {
                newColors.push(color);
            } else {
                newColors.push(cardColor.default);
            }
        });
        setCardColors(newColors);
    };

    return (
        <Card
            sx={{
                maxWidth: 260,
                backgroundColor: isLoading ? "none" : cardColors[playerNum - 1],
                ":hover": {
                    boxShadow: isLoading ? "none" : shadow,
                },
            }}
            onClick={() => {
                if (isLoading) return;
                updateColors(cardColor.active);
                setSubmission(playerStat);
                setSelectedPlayer(playerNum);
            }}
        >
            {isLoading ? (
                <Skeleton
                    variant="rectangular"
                    width={260}
                    height={230}
                    sx={{ bgcolor: "#ffad33" }}
                />
            ) : (
                <>
                    <CardActionArea>
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            {/* <CardMedia
                                        component="img"
                                        height="230"
                                        image={"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + player.players.id + ".png"}
                                        sx={{ width: 260 }}
                                        alt={player.players.name}
                                    /> */}
                            <Button
                                sx={{ height: 230 }}
                                color="success"
                                fullWidth
                            ></Button>
                            <StatReveal
                                playerNum={playerNum}
                                playerStat={playerStat}
                            />
                        </Box>
                        <CardContent
                            sx={{
                                backgroundColor: "#ffad33",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                                marginY={-2}
                                align="center"
                            >
                                {playerName}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </>
            )}
        </Card>
    );
};

export default PlayerCard;
