import Image from 'next/image';
import CustomImage from '../../../../components/image/CustomImage';
import * as St from './FdProductInfo.styled';
import { CustomAuthHeightImage } from '../../../../components/image/CustomAutoHeightImage';
import CustomBlockButton from '../../../../components/buttons/block-button/v1/CustomBlockButton';
import { useState } from 'react';

export function FdProductInfo({
    item
}) {
    const [wholeInfoViewOpen, setWholeInfoViewOpen] = useState(false);

    const toggleWholeInfoViewOpen = (bool) => {
        setWholeInfoViewOpen(bool);
    }

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.TitleContainer>
                        제품 정보
                    </St.TitleContainer>
                    <St.ProudctInfoContainer>
                        <div className='informationTableWrapper'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='left'>상품명</td>
                                        <td className='right'>{item?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className='left'>공급가</td>
                                        <td className='right'>
                                            {item?.priceInequality === 'le' && '~'} {item?.representPrice}원(VAT 포함) {item?.priceInequality === 'ge' && '~'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='left'>선정인원</td>
                                        <td className='right'>5명</td>
                                    </tr>
                                    <tr>
                                        <td className='left'>기간</td>
                                        <td className='right'>24.02.21 ~ 24.03.21 (7일간)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='noticeWrapper'>
                            <ul>
                                <li>선정된 분께는 캠페인 기간 또는 이후 3영업일 이내 별도로 연락을 드립니다.</li>
                                <li>위 기간 내 별도의 연락을 받지 못하신 분은 아쉽게도 다음 캠페인을 기약해주세요.</li>
                            </ul>
                        </div>
                        <div>
                            <div className={`imageListWrapper ${wholeInfoViewOpen ? 'spread' : 'fold'}`}>
                                {CAMPAIGN_LIST[0].imageList?.map(r => {
                                    return (
                                        <CustomAuthHeightImage
                                            key={r.id}
                                            src={r.src}
                                        />
                                    )
                                })}
                            </div>
                            {!wholeInfoViewOpen && <div className='informationBlur'></div>}
                            <CustomBlockButton
                                type='button'
                                className='spreadButton'
                                onClick={() => toggleWholeInfoViewOpen(!wholeInfoViewOpen)}
                            >
                                {wholeInfoViewOpen ? '설명 접기' : '설명 펼치기'}
                            </CustomBlockButton>
                        </div>
                    </St.ProudctInfoContainer>
                </St.Wrapper>
            </St.Container>
        </>
    );
}

const CAMPAIGN_LIST = [
    {
        id: 1,
        imageList: [
            {
                id: '1-1',
                src: 'https://assets.sellertool.io/popup/1-1.png',
            },
            {
                id: '1-2',
                src: 'https://assets.sellertool.io/popup/1-2.png',
            }
        ],
        href: '/excel-editor/translator'
    },
]