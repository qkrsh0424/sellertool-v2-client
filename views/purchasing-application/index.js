import { useState } from 'react';
import { FdForm } from './components/FdForm/FdForm';
import { FdProductInfo } from './components/FdProductInfo/FdProductInfo';
import * as St from './index.styled';
import { CustomDateUtils } from '../../utils/CustomDateUtils';

const customDateUtils = CustomDateUtils();

export default function MainComponent(props) {
    const [item, setItem] = useState({
        id: 1,
        name: '에어목베개',
        representPrice: '1399',
        priceInequality: 'eq', // le eq ge
        maxSelectedCount: '5',
        startDate: '2024-02-21',
        endDate: '2024-02-28',
        productDetailImageList: [
            {
                id: '1-1',
                src: 'https://assets.sellertool.io/popup/1-1.png',
            },
            {
                id: '1-2',
                src: 'https://assets.sellertool.io/popup/1-2.png',
            }
        ],
        optionList: [
            {
                id: 1,
                name: '색상: 민트',
            },
            {
                id: 2,
                name: '색상: 그레이',
            },
            {
                id: 3,
                name: '색상: 네이비',
            },
            {
                id: 4,
                name: '색상: 핑크',
            },
        ]
    });

    return (
        <>
            <St.Container>
                <FdProductInfo
                    item={item}
                />
                <FdForm />
            </St.Container>
        </>
    );
}