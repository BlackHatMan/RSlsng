import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';
import AudioGame from './AudioGame';
import AudioLevel from './AudioLevel';
import './audioGame.css';
import { IPage, IResult } from '../../utils/alias';
import { getWords } from '../../core/api';
import { GameResult } from '../GameResult';

export const AudioContainer = () => {
    const [data, setData] = useState<IPage[]>([]);
    const [wordsRu, setWordsRu] = useState<string[]>([]);
    const [isChoice, setChoice] = useState<boolean>(true);
    const [result, setResult] = useState<IResult[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [showGame, setShowGame] = useState<boolean>(false);

    const levelHandler = (level: number) => {
        const page = Math.floor(Math.random() * 30);

        setChoice(false);
        getWords({ group: level, page }).then((resp) => {
            const words: string[] = resp.map((el: { wordTranslate: string }) => el.wordTranslate);
            setWordsRu(words);
            setData(resp);
            setShowGame(true);
        });
    };

    const resultCallBack = (resultData: IResult[]) => {
        setResult(resultData);
        setShowResult(true);
        setShowGame(false);
    };

    return (
        <Container sx={{ marginTop: '50px' }}>
            {showResult && <GameResult result={result} />}
            {isChoice && <AudioLevel levelHandler={levelHandler} />}
            {!isChoice && !showGame && !showResult && (
                <CircularProgress sx={{ position: 'fixed', top: '45%', left: '50%' }} />
            )}
            {showGame && <AudioGame data={data} wordsRu={wordsRu} resultCallBack={resultCallBack} />}
        </Container>
    );
};
