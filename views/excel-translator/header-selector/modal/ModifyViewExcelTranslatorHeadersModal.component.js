import Image from "next/image";
import { useState } from "react";
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import useModifyViewExcelTranslatorHeaderIdsFormHook from "../hooks/useModifyViewExcelTranslatorHeaderIdsFormHook";
import { Container, FlexBlock } from "../styles/ModifyViewExcelTranslatorHeadersModal.styled";

export default function ModifyViewExcelTranslatorHeadersModalComponent({
    excelTranslatorHeaders,
    viewExcelTranslatorHeaderIds,
    onClose,
    onConfirm
}) {
    const {
        modifyViewExcelTranslatorHeaderIdsForm,
        onActionExchangeHeaderId,
        onActionMoveDownHeaderId,
        onActionMoveUpHeaderId
    } = useModifyViewExcelTranslatorHeaderIdsFormHook({
        excelTranslatorHeaders: excelTranslatorHeaders,
        viewExcelTranslatorHeaderIds: viewExcelTranslatorHeaderIds
    });

    const [selectedExcelTranslatorHeaderId, setSelectedExcelTranslatorHeaderId] = useState(null);
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        action: {
            selectHeader: (headerId) => {
                setSelectedExcelTranslatorHeaderId(headerId);
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                onConfirm(modifyViewExcelTranslatorHeaderIdsForm);
            }
        }
    }
    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
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
                        선택창에 보여질 엑셀 변환기를 <span className='accent-text'>설정</span>해 보세요.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                        <div className='content-box'>
                            <div className='title mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                <div>
                                    숨겨짐
                                </div>
                            </div>
                            <div className='item-list'>

                                {excelTranslatorHeaders?.map(r => {
                                    if (!modifyViewExcelTranslatorHeaderIdsForm?.includes(r.id)) {
                                        return (
                                            <div
                                                key={r.id}
                                                className={`item ${selectedExcelTranslatorHeaderId === r.id ? 'item-active' : ''}`}
                                                onClick={() => __handle.action.selectHeader(r.id)}
                                            >
                                                {r.uploadHeaderTitle} &gt; {r.downloadHeaderTitle}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <FlexBlock />
                        <div className='move-button-group mgl-flex mgl-flex-justifyContent-center'>
                            <SingleBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => onActionExchangeHeaderId(selectedExcelTranslatorHeaderId)}
                            >
                                <div className='icon-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src='/images/icon/exchange_default_808080.svg'
                                        layout='responsive'
                                        width={1}
                                        height={1}
                                        alt="icon"
                                        loading="lazy"
                                    ></Image>
                                </div>
                            </SingleBlockButton>
                        </div>
                        <FlexBlock />
                        <div className='content-box'>
                            <div className='title mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                <div>
                                    보여짐
                                </div>
                                <div className='mgl-flex mgl-flex-alignItems-center'>
                                    <SingleBlockButton
                                        type='button'
                                        className='order-button'
                                        onClick={() => onActionMoveUpHeaderId(selectedExcelTranslatorHeaderId)}
                                    >
                                        <Image
                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                            src='/images/icon/arrowDropUp_default_808080.svg'
                                            layout='responsive'
                                            width={1}
                                            height={1}
                                            alt="icon"
                                            loading="lazy"
                                        ></Image>
                                    </SingleBlockButton>
                                    <SingleBlockButton
                                        type='button'
                                        className='order-button'
                                        onClick={() => onActionMoveDownHeaderId(selectedExcelTranslatorHeaderId)}
                                    >
                                        <Image
                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                            src='/images/icon/arrowDropDown_default_808080.svg'
                                            layout='responsive'
                                            width={1}
                                            height={1}
                                            alt="icon"
                                            loading="lazy"
                                        ></Image>
                                    </SingleBlockButton>
                                </div>
                            </div>
                            <div className='item-list'>
                                {modifyViewExcelTranslatorHeaderIdsForm?.map(r => {
                                    let data = excelTranslatorHeaders?.find(r2 => r2.id === r);

                                    if (data) {
                                        return (
                                            <div
                                                key={r}
                                                className={`item ${selectedExcelTranslatorHeaderId === data.id ? 'item-active' : ''}`}
                                                onClick={() => __handle.action.selectHeader(data.id)}
                                            >
                                                {data.uploadHeaderTitle} &gt; {data.downloadHeaderTitle}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='button-group'>
                        <SingleBlockButton
                            type='button'
                            className='button-el'
                            style={{
                                background: '#959eae',
                                flex: 1
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='submit'
                            className='button-el'
                            style={{
                                background: 'var(--mainColor)',
                                width: '60%'
                            }}
                            disabled={disabledBtn}
                        >
                            확인
                        </SingleBlockButton>
                    </div>
                </form>
            </Container>
        </>
    );
}