import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { style } from './style';

export const CountDown: React.FC<{ countdownFinished: () => void }> = ({ countdownFinished }) => {
    const [progress, setProgress] = React.useState(60);
    const normalise = (value: number) => (value * 100) / 60;

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 1) {
                    countdownFinished();
                }
                return prevProgress - 1;
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={normalise(progress)} />
            <Typography sx={style.countDown}>{Math.floor(progress)}</Typography>
        </Box>
    );
};
