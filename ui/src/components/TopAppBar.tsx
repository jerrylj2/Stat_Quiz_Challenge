import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface AppBarUsername {
  username: string,
  count: string
};

const TopAppBar = (props: AppBarUsername) => {
  let username: string;
  if (props.username.length > 8) {
    username = props.username.substring(0, 8) + "...";
  } else {
    username = props.username;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ color: "black", backgroundColor: "#ffad33" }} variant="dense">
          <Typography variant="h6" >
            {props.count}
          </Typography>
          <Typography variant="h6" component="h5" align="center" sx={{ margin: "auto", fontWeight: "600" }}>
            Stat Quiz Challenge
          </Typography>
          <Typography variant="h6" >
            {username}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopAppBar;