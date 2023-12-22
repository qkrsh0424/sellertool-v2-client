import * as St from './FdDownloadExcel.styled';
import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { MdAddItem } from "./modals/MdAddItem/MdAddItem";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { useMediaQuery } from "@mui/material";
import { FdSortableFrame } from "./components/FdSortableFrame/FdSortableFrame";
import { FdEditHeaderDetailFrame } from "./components/FdEditHeaderDetailFrame/FdEditHeaderDetailFrame";

// scrollWidth : 스크롤 박스의 총 너비 (보이지 않는 요소의 너비 포함)
// offsetWidth : 박스의 보이는 부분의 너비
// scrollLeft : 스크롤 박스의 가장 왼쪽 위치
export function FdDownloadExcel({
    excelTranslatorDownloadHeaderList,
    onSetExcelTranslatorDownloadHeaderList,
    onToggleDisabledCreate
}) {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const isMobile = useMediaQuery(`(max-width: 992px)`);

    /**
     * {
     *  type,
     *  targetIndex,
     * }
     */
    const [modalInfo, setModalInfo] = useState(null);

    useEffect(() => {
        let keydownEventListener = document.addEventListener('keydown', eventKeyDown);

        return () => { document.removeEventListener('keydown', keydownEventListener) };
    }, [])

    useEffect(() => {
        if (selectedItemId) {
            onToggleDisabledCreate(true);
        } else {
            onToggleDisabledCreate(false);
        }
    }, [selectedItemId]);

    const eventKeyDown = (e) => {
        // Shift + A가 눌렸을 때 실행할 함수 호출
        if (e.shiftKey && (e.key === '+')) {
            toggleModalOpen({ type: 'ADD', targetIndex: 0 });
            e.preventDefault();
        }
    }

    const toggleModalOpen = (modalInfoValue) => {
        if (!modalInfoValue) {
            setModalInfo(null);
            return;
        }

        setModalInfo(modalInfoValue);
    }

    const handleChangeSelectedItemId = (reqItemId) => {
        let newSelectedItemId = null;
        if (!selectedItemId) {
            newSelectedItemId = reqItemId;
        } else if (selectedItemId === reqItemId) {
            newSelectedItemId = null;
        } else {
            newSelectedItemId = reqItemId;
        }

        setSelectedItemId(newSelectedItemId);
    }

    const handleDelete = (reqItemId) => {
        let newExcelTranslatorDownloadHeaderList = [...excelTranslatorDownloadHeaderList].filter(r => r.id !== reqItemId);
        onSetExcelTranslatorDownloadHeaderList(newExcelTranslatorDownloadHeaderList);

        if (reqItemId === selectedItemId) {
            handleChangeSelectedItemId(null);
        }
    }

    const handleChangeExcelTranslatorDownloadHeaderList = (values) => {
        onSetExcelTranslatorDownloadHeaderList(values);
        handleChangeSelectedItemId(null);
    }

    const addModalOpen = modalInfo?.type === 'ADD';

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.TitleLayout>
                        <div>변환기 설정</div>
                    </St.TitleLayout>
                    <St.ButtonGroupLayout>
                        <div className='group__wrapper'>
                            <CustomBlockButton
                                type='button'
                                className='add__button'
                                onClick={() => toggleModalOpen({ type: 'ADD', targetIndex: 0 })}
                            >
                                추가
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                onClick={() => toggleModalOpen({ type: 'ADD', targetIndex: 0 })}
                            >
                                엑셀 업로드
                            </CustomBlockButton>
                        </div>
                    </St.ButtonGroupLayout>
                    <FdSortableFrame
                        isMobile={isMobile}
                        excelTranslatorDownloadHeaderList={excelTranslatorDownloadHeaderList}
                        onSetExcelTranslatorDownloadHeaderList={onSetExcelTranslatorDownloadHeaderList}
                        selectedItemId={selectedItemId}
                        onChangeSelectedItemId={handleChangeSelectedItemId}
                        onDelete={handleDelete}
                    />
                    {selectedItemId &&
                        <>
                            <St.VerticalLineBreaker />
                            <FdEditHeaderDetailFrame
                                excelTranslatorDownloadHeaderList={excelTranslatorDownloadHeaderList}
                                selectedItemId={selectedItemId}
                                onSetExcelTranslatorDownloadHeaderList={handleChangeExcelTranslatorDownloadHeaderList}
                                onClose={() => handleChangeSelectedItemId(null)}
                            />
                        </>
                    }
                    <St.TipsLayout>
                        <div className='wrapper'>
                            <div className='title'>Tips.</div>
                            <div className='itemList'>
                                <div><span className='addSpan'>추가</span> 버튼을 클릭해서 필드를 추가해 보세요. 단축키 <span style={{ color: '#999', fontWeight: '700' }}>(Shift)</span> + <span style={{ color: '#999', fontWeight: '700' }}>(+)</span></div>
                                <div>필드를 클릭해서 세부 내용을 수정해 보세요.</div>
                                <div className='drag'>아이콘으로 필드를 드래그해서 순서를 조정해 보세요.</div>
                                <div className='delete'>아이콘을 클릭해서 필드를 삭제해 보세요.</div>
                            </div>
                        </div>
                    </St.TipsLayout>
                </St.Wrapper>
            </St.Container>
            {addModalOpen &&
                <MdAddItem
                    open={addModalOpen}
                    excelTranslatorDownloadHeaderList={excelTranslatorDownloadHeaderList}
                    onSetExcelTranslatorDownloadHeaderList={onSetExcelTranslatorDownloadHeaderList}
                    onClose={() => toggleModalOpen(null)}
                />
            }
        </>
    );
}