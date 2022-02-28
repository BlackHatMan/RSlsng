import React, { useState } from 'react';
import { SprintNew } from './SprintNew';
import { SelectLevel } from './SelectLevel';

import { IPage } from '../../utils/alias';
import './Sprint.css';
/* eslint-disable */
export const SprintContainer = () => {
    const [dataPage, setDataPage] = useState<IPage[]>([]);
    const [isClose, setClose] = useState(false);
    const [ruList, setRuList] = React.useState<string[]>([]);

    const handlerClose = () => {
        setClose(false);
    };

    const dataHandler = (data: IPage[]) => {
        const ruList = data.map((el) => el.wordTranslate);
        setRuList(ruList);
        setDataPage(data);
        setClose(true);
    };

    return (
        <div className="sprint">
            {isClose ? (
                <SprintNew dataPage={dataPage} ruList={ruList} handlerClose={handlerClose} />
            ) : (
                <SelectLevel dataHandler={dataHandler} />
            )}
        </div>
    );
};
