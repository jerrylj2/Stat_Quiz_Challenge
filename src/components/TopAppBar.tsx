import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface AppBarUsername {
  username: string,
  count: string
}

const TopAppBar = (props: AppBarUsername) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ color: "black", backgroundColor: "#ffad33"}} variant="dense">
          <Typography variant="h6" >
            {props.username}
          </Typography>
          <Typography variant="h6" component="h5" sx={{margin: "auto", fontWeight: "600"}}>
            Stat Quiz Challenge
          </Typography>
          <Typography variant="h6" >
            {props.count}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopAppBar;