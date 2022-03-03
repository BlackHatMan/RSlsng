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
import { IResult } from '../utils/alias';

export const GameResult: React.FC<{ result: IResult[] }> = ({ result }) => (
    <Container maxWidth="sm" sx={{ background: 'linear-gradient(#e39b7e69,#dd6e42b0)', borderRadius: '30px' }}>
        <Typography variant="subtitle2" sx={{ padding: '10px 0px', fontSize: 26 }}>
            Результаты:
        </Typography>
        <Box
            sx={{
                maxHeight: '450px',
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
            <List sx={{ border: '3px solid white', borderRadius: '10px', marginBottom: '20px' }}>
                {result.map((el) => (
                    <ListItem key={el.word}>
                        <VolumeUpTwoToneIcon sx={{ paddingRight: '10px', cursor: 'pointer' }} />
                        <ListItemText primary={el.word} sx={{ width: '40px' }} />
                        <ListItemText primary={el.transcription} sx={{ width: '40px' }} />
                        <ListItemText primary={el.wordTranslate} sx={{ width: '40px' }} />
                        {el.correct ? <CheckIcon color="success" /> : <CancelIcon color="error" />}
                    </ListItem>
                ))}
            </List>
        </Box>
    </Container>
);
