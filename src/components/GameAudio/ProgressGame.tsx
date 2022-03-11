/* eslint-disable react/no-array-index-key */
import { Stack } from '@mui/material';
import React from 'react';

const ProgressGame: React.FC<{ isColorProgress: string[] }> = ({ isColorProgress }) => (
    <Stack direction="row" justifyContent="center">
        {isColorProgress.map((el: string, idx) => (
            <svg
                key={`${el} ${idx}`}
                className="progress-item"
                width="20px"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill={el}
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
        ))}
    </Stack>
);
export default ProgressGame;
