import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card } from './Card';
import { style } from './style';
import { CountDown } from './CountDown';
import { IPage } from '../../utils/alias';
/* eslint-disable */

export const SprintNew: React.FC<{ dataPage: IPage[]; ruList: string[]; handlerClose: () => void }> = ({
    dataPage,
    ruList,
    handlerClose,
}) => {
    const [offerWord, setOfferWord] = React.useState(dataPage[0].wordTranslate);
    const [modalView, setModalView] = useState(false);
    const [current, setCurrent] = useState(0);
    const [color, setColor] = useState('white');

    useEffect(() => {
        const rndRuWord = ruList[Math.floor(Math.random() * 20)];
        const result = Math.floor(Math.random() * 100) % 2 ? dataPage[current].wordTranslate : rndRuWord;
        setOfferWord(result);
    }, [current]);

    const next = () => {
        if (current < 19) setCurrent((prev) => (prev += 1));
    };

    const handleClose = () => {
        setModalView(true);
    };

    const handlerCorrect = () => {
        if (offerWord === dataPage[current].wordTranslate) {
            setColor('green');
        } else {
            setColor('red');
        }
        next();
    };
    const handlerWrong = () => {
        if (offerWord !== dataPage[current].wordTranslate) {
            setColor('green');
        } else {
            setColor('red');
        }
        next();
    };
    console.log(dataPage[current].word, dataPage[current].wordTranslate, offerWord);
    return (
        <>
            <CountDown countdownFinished={handlerClose} />
            <Card
                word={dataPage[current].word}
                translateWord={offerWord}
                colorCircle={color}
                changeCardTrue={handlerCorrect}
                changeCardFalse={handlerWrong}
            />
            <Modal
                open={modalView}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.modal}>
                    <div className="wrapper__close_btn">
                        <Button onClick={handleClose}>Закрыть</Button>
                    </div>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Поздравляем, отличный результат!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ЗНАЮ:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        НЕ ЗНАЮ:
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};
