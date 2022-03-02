/* eslint-disable react/no-array-index-key */
import {
    Container, List, ListItem, ListItemText,
} from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';

export const SprintResult: React.FC = () => {
    const resultData = {
        audio: '//localstorage/gde',
        englishWord: 'English',
        transcription: 'hoqdsq',
        translate: 'на руссом',
        correct: true,
    };
    const result = Array(15).fill(resultData);
    return (
        <Container
            maxWidth="sm"
            sx={{
                marginTop: '50px',
                background: 'linear-gradient(#e39b7e,#dd6e42)',
                borderRadius: '30px',
            }}
        >
            <Typography variant="subtitle2" sx={{ padding: '10px 0px', fontSize: 26 }}>
                Результаты:
            </Typography>
            <Box
                sx={{
                    height: '450px',
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': {
                        width: '0.5em',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'linear-gradient(transparent 15%,hsla(0,0%,100%,.75) 50%,transparent 85%)',
                        borderRadius: 3,
                    },
                }}
            >
                <List
                    sx={{
                        border: '3px solid white',
                        borderRadius: '10px',
                        marginBottom: '20px',
                    }}
                >
                    {result.map((el, index) => (
                        <ListItem key={`${index}11`}>
                            <VolumeUpTwoToneIcon sx={{ paddingRight: '10px', cursor: 'pointer' }} />
                            <ListItemText primary={el.englishWord} />
                            <ListItemText primary={el.transcription} />
                            <ListItemText primary={el.translate} />
                            {el.correct ? <CheckIcon color="success" /> : <CancelIcon color="error" />}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};
