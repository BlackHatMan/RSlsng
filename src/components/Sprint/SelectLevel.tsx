import React, { useState } from 'react';
import {
    Typography, FormControl, InputLabel, Select, MenuItem, Button, Box,
} from '@mui/material';
import { IPage } from '../../utils/alias';
import { myGetWords } from '../../core/api';

export const SelectLevel: React.FC<{ dataHandler: (data: IPage[]) => void }> = ({ dataHandler }) => {
    const [level, setLevel] = useState('');

    const handlerStart = async () => {
        const data = await myGetWords(level);
        const data2 = await myGetWords(level);
        dataHandler([...data, ...data2]);
    };

    return (
        <>
            <Typography variant="h5" mt={8}>
                «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
            </Typography>
            <Typography variant="subtitle1" mb={2}>
                Выберите уровень сложности
            </Typography>
            <FormControl fullWidth sx={{ maxWidth: '300px' }}>
                <InputLabel id="sprint-level-select-label">Уровень</InputLabel>
                <Select
                    labelId="sprint-level-select-label"
                    value={level}
                    label="Уровень"
                    onChange={(event) => setLevel(event.target.value)}
                >
                    <MenuItem value={0}>1</MenuItem>
                    <MenuItem value={1}>2</MenuItem>
                    <MenuItem value={2}>3</MenuItem>
                    <MenuItem value={3}>4</MenuItem>
                    <MenuItem value={4}>5</MenuItem>
                    <MenuItem value={5}>6</MenuItem>
                </Select>
            </FormControl>
            <Box mt={4}>
                <Button variant="contained" disabled={level === ''} onClick={handlerStart}>
                    НАЧАТЬ
                </Button>
            </Box>
        </>
    );
};
