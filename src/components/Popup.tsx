import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface PopupType {
    handleClose(): void,
    open: boolean,
    answer: string,
    count: number,
    addCount(): void,
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4
};

const Popup = (props: PopupType) => {
    if(props.answer === "correct" && props.count !== 10){
        return (
            <div>
                <Modal
                    open={props.open}
                >
                    <Box sx={style} style={{ backgroundColor: "#73e673" }}>
                        <Typography variant="h2" component="h2" align="center" sx={{ fontWeight: 500 }}>
                            Correct!
                        </Typography>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="neutral"
                                size="small"
                                fullWidth
                                onClick={() => {
                                    props.addCount()
                                    props.handleClose()
                                }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    } else if(props.answer === "correct" && props.count === 10){
        return (
            <div>
                <Modal
                    open={props.open}
                >
                    <Box sx={style} style={{ backgroundColor: "#73e673" }}>
                        <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 500 }}>
                            Congratulations!
                        </Typography>
                        <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 500 }}>
                            You beat the Quiz!
                        </Typography>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="neutral"
                                size="small"
                                fullWidth
                                onClick={() => {
                                    props.handleClose()
                                    window.location.reload()
                                }}
                            >
                                Try Again!
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    } if(props.answer === "incorrect"){
        return (
            <div>
                <Modal
                    open={props.open}
                >
                    <Box sx={style} style={{ backgroundColor: "#f15757" }}>
                        <Typography variant="h2" component="h2" align="center" sx={{ fontWeight: 500 }}>
                            Incorrect!
                        </Typography>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="neutral"
                                size="small"
                                fullWidth
                                onClick={() => {
                                    props.handleClose()
                                    window.location.reload()
                                }}
                            >
                                Try Again!
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    } else {
        return null;
    };
};

export default Popup;