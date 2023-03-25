import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import StatReveal from './StatReveal';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { UserContext } from '../pages/Quiz';

interface PlayerDetails {
    default_color: string,
    active_color: string,
    updateImageColor(color1: string, color2: string, color3: string, color4: string): void,
    updateSubmission(stat: number): void,
    updateSelectedPlayer(player: number): void,
};



const PlayerCard = (props: PlayerDetails) => {
    const player = useContext(UserContext)
    let colors: string[] = [props.default_color, props.default_color, props.default_color, props.default_color];
    let shadow: string = "";
    switch (player.player_num) {
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
    };

    return (
        <Card
            sx={{
                maxWidth: 260,
                backgroundColor: player.players.color,
                ':hover': {
                    boxShadow: shadow
                },
            }}
            onClick={() => {
                colors.splice(player.player_num - 1, 1, props.active_color);
                props.updateImageColor(colors[0], colors[1], colors[2], colors[3]);
                props.updateSubmission(player.players.stat);
                props.updateSelectedPlayer(player.player_num);
            }}
        >
            <CardActionArea>
                <Box
                    sx={{
                        position: "relative"
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
                        onClick={() => {
                            colors.splice(player.player_num - 1, 1, props.active_color);
                            props.updateImageColor(colors[0], colors[1], colors[2], colors[3]);
                            props.updateSubmission(player.players.stat);
                            props.updateSelectedPlayer(player.player_num);
                        }}
                    ></Button>
                    <StatReveal/>
                </Box>
                <CardContent sx={{ backgroundColor: "#ffad33", alignItems: "center", justifyContent: "center" }}>
                    <Typography gutterBottom variant="subtitle1" component="div" marginY={-2} align="center">
                        {player.players.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PlayerCard;