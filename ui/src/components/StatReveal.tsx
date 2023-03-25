import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { UserContext } from '../pages/Quiz';

const StatReveal = () => {
    const player = useContext(UserContext)
    const revealStyle = {
        position: "absolute",
        bottom: 100,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.54)',
    };

    if(player.open){
        if(player.players.stat === player.correctAnswer){
            return (
                <Box
                    sx={revealStyle}
                    style={{ color: "#73e673" }}
                >
                    <Typography align='center' variant='h5' sx={{ fontWeight: 600 }}>
                        {player.players.stat}
                    </Typography>
                </Box>
            )
        } else if((player.players.stat !== player.correctAnswer) && (player.player_num === player.selectedPlayer)){
            return (
                <Box
                    sx={revealStyle}
                    style={{ color: "#f15757" }}
                >
                    <Typography align='center' variant='h5' sx={{ fontWeight: 600 }}>
                        {player.players.stat}
                    </Typography>
                </Box>
            )
        } else {
            return (
                <Box
                    sx={revealStyle}
                    style={{ color: "white" }}
                >
                    <Typography align='center' variant='h5' sx={{ fontWeight: 600 }}>
                        {player.players.stat}
                    </Typography>
                </Box>
            )
        };        
    } else {
        return null;
    };
};

export default StatReveal;