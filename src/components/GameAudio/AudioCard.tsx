import React from 'react';
import { Box, Typography } from '@mui/material';
import { BASE_URL } from '../../core/api';
import VolumeUpIcon from './VolumeUpIcon';
import { IPage } from '../../utils/alias';

const AudioCard: React.FC<{ page: IPage }> = ({ page }) => {
    const pathImg = `${BASE_URL}/${page.image}`;
    const pathAudio = `${BASE_URL}/${page.audio}`;
    const audioExample = `${BASE_URL}/${page.audioExample}`;

    return (
        <Box className="audiogame__card">
            <img className="audiogame_image" src={pathImg} alt="" />
            <Box className="audiogame_text">
                <div>
                    <VolumeUpIcon path={pathAudio} width="35px" />
                    <Typography variant="body1" component="span">
                        {page.word}
                    </Typography>
                    <em className="audiogame_transcription">{page.transcription}</em>
                </div>
                <div>
                    <VolumeUpIcon width="35px" path={audioExample} />
                    <span dangerouslySetInnerHTML={{ __html: page.textExample }} />
                </div>
            </Box>
        </Box>
    );
};
export default React.memo(AudioCard);
