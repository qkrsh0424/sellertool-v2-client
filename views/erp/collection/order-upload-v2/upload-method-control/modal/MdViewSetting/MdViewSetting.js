import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import * as St from './MdViewSetting.styled';
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../components/image/CustomImage";
import valueUtils from "../../../../../../../utils/valueUtils";
import Link from "next/link";

export function MdViewSetting({
    open,
    onClose,
    excelTranslatorList,
    bookmarkExcelTranslatorIdList,
    onConfirm
}) {
    const [currentBookmarkExcelTranslatorIdList, setCurrentBookmarkExcelTranslatorIdList] = useState([]);
    const [selectedExcelTranslator, setSelectedExcelTranslator] = useState(null);

    useEffect(() => {
        if (!bookmarkExcelTranslatorIdList) {
            return;
        }

        setCurrentBookmarkExcelTranslatorIdList(bookmarkExcelTranslatorIdList);
    }, [bookmarkExcelTranslatorIdList]);

    const handleSelectExcelTranslator = (excelTranslator) => {
        setSelectedExcelTranslator(excelTranslator);
    }

    const handleExchange = () => {
        if (currentBookmarkExcelTranslatorIdList?.includes(selectedExcelTranslator?.id)) {
            setCurrentBookmarkExcelTranslatorIdList(prev => prev?.filter(r => r !== selectedExcelTranslator?.id));
            return;
        }

        setCurrentBookmarkExcelTranslatorIdList(prev => prev?.concat(selectedExcelTranslator?.id))
    }

    const handleReorderArrowUp = () => {
        if (currentBookmarkExcelTranslatorIdList?.find(r => r === selectedExcelTranslator?.id)) {
            let currentIndex = currentBookmarkExcelTranslatorIdList.indexOf(selectedExcelTranslator?.id);

            if (currentIndex <= 0) {
                return;
            }

            let newBookmarkExcelTranslatorIdList = valueUtils.reorder(currentBookmarkExcelTranslatorIdList, currentIndex, currentIndex - 1);
            setCurrentBookmarkExcelTranslatorIdList(newBookmarkExcelTranslatorIdList);
        }
    }

    const handleReorderArrowDown = () => {
        if (currentBookmarkExcelTranslatorIdList?.find(r => r === selectedExcelTranslator?.id)) {
            let currentIndex = currentBookmarkExcelTranslatorIdList.indexOf(selectedExcelTranslator?.id);

            if (currentIndex < 0 || currentIndex >= currentBookmarkExcelTranslatorIdList?.length - 1) {
                return;
            }

            let newBookmarkExcelTranslatorIdList = valueUtils.reorder(currentBookmarkExcelTranslatorIdList, currentIndex, currentIndex + 1);
            setCurrentBookmarkExcelTranslatorIdList(newBookmarkExcelTranslatorIdList);
        }
    }

    const handleSubmit = () => {
        let newList = [...new Set(currentBookmarkExcelTranslatorIdList?.filter(r => excelTranslatorList?.some(r2 => r2.id === r)))];
        onConfirm(newList);
        onClose();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="md"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>변환기 즐겨찾기 설정</CustomDialog.Title>
                <St.Container>
                    <Link
                        href='/excel-editor/translator'
                        passHref
                    >
                        <St.LinkItem>엑셀변환기 생성 바로가기</St.LinkItem>
                    </Link>
                    <St.Wrapper>
                        <div className="mainLayout">
                            <div className='mainLayout__contentLayout'>
                                <div className='mainLayout__cententLayout__titleBox'>
                                    <div className='mainLayout__cententLayout__titleBox__title'>즐겨찾기</div>
                                    <div className='mainLayout__cententLayout__titleBox__buttonGroup'>
                                        <CustomBlockButton
                                            type='button'
                                            className='mainLayout__cententLayout__titleBox__buttonGroup__iconButton'
                                            onClick={() => handleReorderArrowDown()}
                                        >
                                            <CustomImage src='/images/icon/arrow_downward_000000.svg' />
                                        </CustomBlockButton>
                                        <CustomBlockButton
                                            type='button'
                                            className='mainLayout__cententLayout__titleBox__buttonGroup__iconButton'
                                            onClick={() => handleReorderArrowUp()}
                                        >
                                            <CustomImage src='/images/icon/arrow_upward_000000.svg' />
                                        </CustomBlockButton>
                                    </div>
                                </div>
                                <div className='mainLayout__contentLayout__contentList'>
                                    {currentBookmarkExcelTranslatorIdList?.map(bookmarkExcelTranslatorId => {
                                        let excelTranslator = excelTranslatorList?.find(r => r.id === bookmarkExcelTranslatorId);
                                        if (!excelTranslator) {
                                            return null;
                                        }

                                        return (
                                            <div
                                                key={excelTranslator?.id}
                                                className={`mainLayout__contentLayout__contentList__item ${selectedExcelTranslator?.id === excelTranslator?.id ? 'mainLayout__contentLayout__contentList__item-isSelected' : ''}`}
                                                onClick={() => handleSelectExcelTranslator(excelTranslator)}
                                            >{excelTranslator?.name}</div>
                                        );
                                    })}
                                </div>
                            </div>
                            <CustomBlockButton
                                className='mainLayout__exchangeButton'
                                onClick={() => handleExchange()}
                            >
                                <CustomImage src='/images/icon/exchange_default_808080.svg' />
                            </CustomBlockButton>
                            <div className='mainLayout__contentLayout'>
                                <div className='mainLayout__cententLayout__titleBox'>
                                    <div className='mainLayout__cententLayout__titleBox__title'>일반</div>
                                </div>
                                <div className='mainLayout__contentLayout__contentList'>
                                    {excelTranslatorList?.filter(r => !currentBookmarkExcelTranslatorIdList?.includes(r?.id))?.map(excelTranslator => {
                                        return (
                                            <div
                                                key={excelTranslator?.id}
                                                className={`mainLayout__contentLayout__contentList__item ${selectedExcelTranslator?.id === excelTranslator?.id ? 'mainLayout__contentLayout__contentList__item-isSelected' : ''}`}
                                                onClick={() => handleSelectExcelTranslator(excelTranslator)}
                                            >{excelTranslator?.name}</div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='footerButtonGroupLayout'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => onClose()}
                            >취소</CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='footerButtonGroupLayout__confirmButton'
                                onClick={() => handleSubmit()}
                            >확인</CustomBlockButton>
                        </div>
                    </St.Wrapper>
                </St.Container>
            </CustomDialog>
        </>
    );
}