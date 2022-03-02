import React, { useState } from 'react';
import { SelectLevel } from './SelectLevel';
import { IPage } from '../../utils/alias';
import { SprintGame } from './SprintGame';
import './sprint.css';

export const SprintContainer = () => {
    const [dataPage, setDataPage] = useState<IPage[]>([]);
    const [isClose, setClose] = useState(false);
    const [translateWord, setTranslateWord] = React.useState<string[]>([]);

    const handlerClose = () => {
        setClose(false);
    };

    const dataHandler = (data: IPage[]) => {
        const ru = data.map((el) => el.wordTranslate);
        setTranslateWord(ru);
        setDataPage(data);
        setClose(true);
    };

    return (
        <div className="sprint">
            {isClose ? (
                <SprintGame dataPage={dataPage} translateWord={translateWord} handlerClose={handlerClose} />
            ) : (
                <SelectLevel dataHandler={dataHandler} />
            )}
        </div>
    );
};
