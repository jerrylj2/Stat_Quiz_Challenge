import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface StatRevealType {
    open: boolean,
    player_num: number,
    selectedPlayer: number,
    player_stat: number,
    correctAnswer: number | undefined
}

const StatReveal = (props: StatRevealType) => {
    const revealStyle = {
        position: "absolute",
        bottom: 100,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.54)',
    };

    if(props.open){
        if(props.player_stat === props.correctAnswer){
            return (
                <Box
                    sx={revealStyle}
                    style={{ color: "#73e673" }}
                >
                    <Typography align='center' variant='h5' sx={{ fontWeight: 600 }}>
                        {props.player_stat}
                    </Typography>
                </Box>
            )
        } else if((props.player_stat !== props.correctAnswer) && (props.player_num === props.selectedPlayer)){
            return (
                <Box
                    sx={revealStyle}
                    style={{ color: "#f15757" }}
                >
                    <Typography align='center' variant='h5' sx={{ fontWeight: 600 }}>
                        {props.player_stat}
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
                        {props.player_stat}
                    </Typography>
                </Box>
            )
        };        
    } else {
        return null;
    };
};

export default StatReveal;