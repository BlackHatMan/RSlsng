/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
    Button, Stack, Card, Box, Container, CardContent,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CountDown } from './CountDown';
import { style } from './style';
import { IPage, IResult } from '../../utils/alias';
import { BASE_URL } from '../../core/api';

export const SprintGame: React.FC<{
    dataPage: IPage[];
    translateWords: string[];
    handlerClose: () => void;
    handlerResultData: (res: IResult[]) => void;
}> = ({
    handlerClose, translateWords, dataPage, handlerResultData,
}) => {
    const [countLive, setCountLive] = useState(5);
    const [current, setCurrent] = useState(0);
    const [word, setWord] = useState<string>('');
    const [offerWord, setOfferWord] = React.useState('');
    const [result] = useState<IResult[]>([]);

    const res: IResult = {
        word,
        wordTranslate: dataPage[current].wordTranslate,
        audio: `${BASE_URL}/${dataPage[current].audio}`,
        transcription: dataPage[current].transcription,
    };

    useEffect(() => {
        if (countLive === 0) handlerClose();
        const rndRuWord = translateWords[Math.floor(Math.random() * dataPage.length)];
        const offer = Math.floor(Math.random() * 100) % 2 ? dataPage[current].wordTranslate : rndRuWord;
        setWord(dataPage[current].word);
        setOfferWord(offer);
    }, [current]);

    useEffect(
        () => () => {
            handlerResultData(result);
        },
        [],
    );

    const handlerCorrect = () => {
        if (offerWord !== dataPage[current].wordTranslate) {
            setCountLive((prev) => (prev -= 1));
            res.correct = false;
            result.push(res);
        } else {
            res.correct = true;
            result.push(res);
        }
        if (current < 39) setCurrent((prev) => (prev += 1));
    };

    const handlerWrong = () => {
        if (offerWord === dataPage[current].wordTranslate) {
            setCountLive((prev) => (prev -= 1));
            res.correct = false;
            result.push(res);
        } else {
            res.correct = true;
            result.push(res);
        }
        if (current < 39) setCurrent((prev) => (prev += 1));
    };

    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent>
                    <Box style={style.countDownContainer}>
                        <CountDown countdownFinished={handlerClose} />
                        <span>
                            <FavoriteIcon sx={countLive < 1 ? style.black : style.red} />
                            <FavoriteIcon sx={countLive < 2 ? style.black : style.red} />
                            <FavoriteIcon sx={countLive < 3 ? style.black : style.red} />
                            <FavoriteIcon sx={countLive < 4 ? style.black : style.red} />
                            <FavoriteIcon sx={countLive < 5 ? style.black : style.red} />
                        </span>
                    </Box>
                    <div className="sprint__card_img" />
                    <div className="sprint_words">
                        <span className="sprint_word">{word}</span>
                        <span className="sprint_translate">{offerWord}</span>
                    </div>
                    <Stack direction="row" spacing={6} justifyContent="center">
                        <Button variant="contained" color="success" onClick={handlerCorrect}>
                            Верно
                        </Button>
                        <Button variant="contained" color="error" onClick={handlerWrong}>
                            Неверно
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};
