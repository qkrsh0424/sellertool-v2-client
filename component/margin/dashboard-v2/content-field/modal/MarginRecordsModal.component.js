import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useDisabledBtn from '../../../../../hooks/button/useDisabledBtn';
import SingleBlockButton from '../../../../modules/button/SingleBlockButton';
import useMarginRecordsHook from '../../hooks/useMarginRecordsHook';
import { Container, ContentWrapper, DeleteBtnBox, FlexWrapper, ItemBox, Title, TitleWrapper } from '../styles/MarginRecordsModal.styled';

const MarginRecordsModalComponent = ({
    onClose
}) => {
    const {
        marginRecords,
        reqDeleteMarginRecord
    } = useMarginRecordsHook();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            delete: async (e, marginRecordId) => {
                e.stopPropagation();
                setDisabledBtn(true);
                let body = {
                    marginRecordId: marginRecordId
                }

                await reqDeleteMarginRecord({
                    body: body,
                    successCallback: () => {

                    }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={() => onClose()}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='http://localhost:3000/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <div
                    className='title-box'
                >
                    <div className='title'>
                        저장된 기록들을 불러옵니다.
                    </div>
                </div>
                {marginRecords &&
                    (
                        <div className='content-group'>
                            {marginRecords?.length <= 0 &&
                                <div style={{ textAlign: 'center', padding: '30px 0', color: '#444', fontSize: '14px' }}>저장된 기록이 없습니다.</div>
                            }
                            {marginRecords?.map(marginRecord => {
                                return (
                                    <Link
                                        key={marginRecord.id}
                                        href={`/margin/dashboard/?marginRecordId=${marginRecord.id}`}
                                        passHref
                                        replace={true}
                                    >
                                        <div
                                            className='content-box mgl-flex mgl-flex-justifyContent-spaceBetween mgl-flex-alignItems-center'
                                            onClick={() => onClose()}
                                        >
                                            <div className='info-group'>
                                                <div className='title'>
                                                    {marginRecord.name}
                                                </div>
                                                <div className='value-group mgl-flex mgl-flex-justifyContent-spaceBetween'>
                                                    <div className='value'>
                                                        매출합계: {marginRecord.totalExpense} 원
                                                    </div>
                                                    <div className='value'>
                                                        마진율: {marginRecord.marginRate} %
                                                    </div>
                                                </div>
                                                <div className='value-group mgl-flex mgl-flex-justifyContent-spaceBetween'>
                                                    <div className='value'>
                                                        매입합계: {marginRecord.totalIncome} 원
                                                    </div>
                                                    <div className='value'>
                                                        마진액: {marginRecord.margin} 원
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='delete-button-box'>
                                                <SingleBlockButton
                                                    type='button'
                                                    className='delete-button-el'
                                                    onClick={(e) => __handle.submit.delete(e, marginRecord.id)}
                                                    disabled={disabledBtn}
                                                >
                                                    <div className='icon-figure'>
                                                        <Image
                                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                            src='http://localhost:3000/images/icon/delete_default_e56767.svg'
                                                            layout='responsive'
                                                            width={1}
                                                            height={1}
                                                            alt="close icon"
                                                            loading="lazy"
                                                        ></Image>
                                                    </div>
                                                </SingleBlockButton>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )
                }
                {!marginRecords &&
                    <ContentWrapper>
                        <div style={{ textAlign: 'center', padding: '30px 0', color: '#444', fontSize: '14px' }}>저장된 기록이 없습니다.</div>
                    </ContentWrapper>
                }
            </Container>
        </>
    );
}
export default MarginRecordsModalComponent;