/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import AudioCard from './AudioCard';
import shuffle from './shuffle';
import VolumeUpIcon from './VolumeUpIcon';
import ProgressGame from './ProgressGame';
import { BASE_URL } from '../../core/api';
import Arrow from './Arrow';
import { IPage, IResult } from '../../utils/alias';

export interface resultGame {
    word: string;
    answer: boolean;
    audio: string;
}
const AudioGame: React.FC<{
    data: IPage[];
    wordsRu: string[];
    resultCallBack: (result: IResult[]) => void;
}> = ({ data, wordsRu, resultCallBack }) => {
    const progressColor = new Array(data.length).fill('grey');
    const [isError, setError] = useState(false);
    // eslint-disable-next-line prefer-const
    let [isAnswer, setAnswer] = useState(false);
    const [position, setPosition] = useState(0);
    const [choiceWord, setChoiceWord] = useState('');
    const [rndAnswer, setRndAnswer] = useState<(string | undefined)[]>([]);
    const [isColorProgress] = useState(progressColor);
    const currentPage: IPage = data[position];
    const [result] = useState<IResult[]>([]);
    const res: IResult = {
        word: currentPage.word,
        wordTranslate: currentPage.wordTranslate,
        transcription: currentPage.transcription,
        correct: false,
        audio: `${BASE_URL}/${currentPage.audio}`,
    };

    useMemo(() => {
        const rnd = shuffle(position, wordsRu);
        setRndAnswer(rnd);
        const audio = new Audio(`${BASE_URL}/${currentPage.audio}`);
        audio.play();
    }, [position]);

    const handlerAnswer = (el = '') => {
        if (!isAnswer) {
            if (el === currentPage.wordTranslate) {
                isColorProgress[position] = 'green';
                res.correct = true;
                result.push(res);
                setError(false);
            } else {
                isColorProgress[position] = 'red';
                setError(true);
                result.push(res);
            }
            setChoiceWord(el);
            setAnswer(true);
        }
    };

    const skip = () => {
        setChoiceWord('skipped');
        setError(true);
        setAnswer(true);
        isColorProgress[position] = 'yellow';
        result.push(res);
    };

    const next = () => {
        setAnswer(false);
        if (position === data.length - 1) {
            resultCallBack(result);
        }
        setError(false);
        setChoiceWord('');
        // eslint-disable-next-line no-return-assign
        setPosition((prev) => (prev += 1));
    };

    useEffect(() => {
        const handlerKeyboard = (e: KeyboardEvent) => {
            if (!isAnswer) {
                switch (e.key) {
                case '1': {
                    handlerAnswer(rndAnswer[0]);
                    break;
                }
                case '2': {
                    handlerAnswer(rndAnswer[1]);
                    break;
                }
                case '3': {
                    handlerAnswer(rndAnswer[2]);
                    break;
                }
                case '4': {
                    handlerAnswer(rndAnswer[3]);
                    break;
                }
                default:
                    break;
                }
            }
        };
        window.document.addEventListener('keydown', handlerKeyboard);
        return () => window.document.removeEventListener('keydown', handlerKeyboard);
    }, [rndAnswer]);
    return (
        <div className="wrapper_audio">
            <ProgressGame isColorProgress={isColorProgress} />
            <Box display="flex" justifyContent="center" mt={4}>
                {choiceWord ? (
                    <AudioCard page={currentPage} />
                ) : (
                    <VolumeUpIcon path={`${BASE_URL}/${currentPage.audio}`} width="200px" />
                )}
            </Box>
            <div className="audio__answer">
                {rndAnswer.map((el, idx) => {
                    if (el === choiceWord) {
                        return (
                            <Button
                                key={`${idx} ${el}`}
                                variant="contained"
                                color={isError ? 'error' : 'success'}
                                onClick={() => handlerAnswer(el)}
                            >
                                {el}
                            </Button>
                        );
                    }
                    if (el === currentPage.wordTranslate) {
                        return (
                            <Button
                                key={`${idx} ${el}`}
                                variant="contained"
                                color={isError ? 'success' : 'info'}
                                onClick={() => handlerAnswer(el)}
                            >
                                {el}
                            </Button>
                        );
                    }
                    return (
                        <Button
                            key={`${idx} ${el}`}
                            color="info"
                            variant="contained"
                            disabled={isError || isAnswer}
                            onClick={() => handlerAnswer(el)}
                        >
                            {el}
                        </Button>
                    );
                })}
            </div>
            <div className="game__answer_accept">
                <Button sx={{ width: '150px' }} variant="outlined" onClick={isAnswer ? next : skip}>
                    {isAnswer ? <Arrow /> : 'НЕ  ЗНАЮ'}
                </Button>
            </div>
        </div>
    );
};
export default AudioGame;
