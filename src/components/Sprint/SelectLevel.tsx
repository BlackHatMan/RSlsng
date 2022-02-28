import React, { useState } from 'react';
import {
    Typography, FormControl, InputLabel, Select, MenuItem, Button,
} from '@mui/material';
import { IPage } from '../../utils/alias';
import { myGetWords } from '../../core/api';

export const SelectLevel: React.FC<{ dataHandler: (data: IPage[]) => void }> = ({ dataHandler }) => {
    const [level, setLevel] = useState('');

    const handlerStart = async () => {
        const data = await myGetWords(level);
        dataHandler(data);
    };

    return (
        <>
            <Typography variant="h5" mt={8}>
                «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
            </Typography>
            <Typography variant="subtitle1">Выберите уровень сложности</Typography>
            <FormControl fullWidth sx={{ maxWidth: '300px' }}>
                <InputLabel id="sprint-level-select-label">Уровень</InputLabel>
                <Select
                    labelId="sprint-level-select-label"
                    id="sprint-level-select"
                    value={level}
                    label="Level"
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
            <div className="sprint_btn-container">
                <Button variant="contained" color="primary" onClick={handlerStart}>
                    НАЧАТЬ
                </Button>
            </div>
        </>
    );
};
