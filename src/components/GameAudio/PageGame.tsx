import React from 'react';
import { Box } from '@mui/material';
import { BASE_URL } from '../../core/api';
import VolumeUpIcon from './VolumeUpIcon';
import { IPage } from '../../utils/alias';

const PageGame: React.FC<{ page: IPage }> = ({ page }) => {
    const pathImg = `${BASE_URL}/${page.image}`;
    const pathAudio = `${BASE_URL}/${page.audio}`;
    const audioExample = `${BASE_URL}/${page.audioExample}`;

    return (
        <Box pt={5} display="flex">
            <img className="page--audiogame-image" src={pathImg} alt="" />
            <Box className="page--audiogame-text">
                <div>
                    <VolumeUpIcon path={pathAudio} width="35px" />
                    <span>{page.word}</span>
                    <em className="page--audiogame-transcription">{page.transcription}</em>
                </div>
                <div>
                    <VolumeUpIcon width="35px" path={audioExample} />
                    <span dangerouslySetInnerHTML={{ __html: page.textExample }} />
                </div>
            </Box>
        </Box>
    );
};
export default PageGame;
