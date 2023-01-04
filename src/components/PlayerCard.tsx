import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import StatReveal from './StatReveal';
import Button from '@mui/material/Button';

interface PlayerDetails {
    players: {
        name: string,
        stat: number,
        id: number,
        color: string
    },
    player_num: number,
    default_color: string,
    active_color: string,
    updateImageColor(color1: string, color2: string, color3: string, color4: string): void,
    updateSubmission(stat: number): void,
    updateSelectedPlayer(player: number): void,
    selectedPlayer: number,
    open: boolean,
    correctAnswer: number | undefined
};

const PlayerCard = (props: PlayerDetails) => {
    let colors: string[] = [props.default_color, props.default_color, props.default_color, props.default_color];
    
    return (
        <Card
            sx={{ maxWidth: 260, backgroundColor: props.players.color }}
            onClick={() => {
                colors.splice(props.player_num - 1, 1, props.active_color);
                props.updateImageColor(colors[0], colors[1], colors[2], colors[3]);
                props.updateSubmission(props.players.stat);
                props.updateSelectedPlayer(props.player_num);
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
                        image={"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + props.players.id + ".png"}
                        sx={{ width: 260 }}
                        alt={props.players.name}
                    /> */}
                    <Button
                        sx={{ height: 230 }}
                        color="success"
                        fullWidth
                        onClick={() => {
                            colors.splice(props.player_num - 1, 1, props.active_color);
                            props.updateImageColor(colors[0], colors[1], colors[2], colors[3]);
                            props.updateSubmission(props.players.stat);
                            props.updateSelectedPlayer(props.player_num);
                        }}
                    ></Button>
                    <StatReveal 
                        open={props.open} 
                        player_num={props.player_num} 
                        selectedPlayer={props.selectedPlayer}
                        player_stat={props.players.stat}
                        correctAnswer={props.correctAnswer}
                    ></StatReveal>
                </Box>
                <CardContent sx={{ backgroundColor: "#ffad33", alignItems: "center", justifyContent: "center" }}>
                    <Typography gutterBottom variant="subtitle1" component="div" marginY={-2} align="center">
                        {props.players.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PlayerCard;