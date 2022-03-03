import React, { useState } from 'react';
import { SelectLevel } from './SelectLevel';
import { IPage, IResult } from '../../utils/alias';
import { SprintGame } from './SprintGame';
import { GameResult } from '../GameResult';

require('./sprint.css');

export const SprintContainer = () => {
    const [isClose, setClose] = useState(false);
    const [isEnd, setEnd] = useState(false);
    const [dataPage, setDataPage] = useState<IPage[]>([]);
    const [translateWords, setTranslateWords] = React.useState<string[]>([]);
    const [result, setResult] = useState<IResult[]>([]);

    const handlerClose = () => {
        setClose(false);
    };
    const handlerResultData = (res: IResult[]) => {
        setResult(res);
        setEnd(true);
    };
    const dataHandler = (data: IPage[]) => {
        const ru = data.map((el) => el.wordTranslate);
        setTranslateWords(ru);
        setDataPage(data);
        setClose(true);
    };

    return (
        <div className="sprint">
            {!isClose && !isEnd && <SelectLevel dataHandler={dataHandler} />}
            {isClose && (
                <SprintGame
                    dataPage={dataPage}
                    translateWords={translateWords}
                    handlerClose={handlerClose}
                    handlerResultData={handlerResultData}
                />
            )}
            {!isClose && isEnd && <GameResult result={result} />}
        </div>
    );
};
