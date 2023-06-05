import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import CustomInput from "../../../../../components/input/default/v1/CustomInput";
import { useState } from "react";
import _ from "lodash";

const ContentContainer = styled.div`
    padding: 20px;

    .input-box{
        margin-bottom: 20px;
        .label{
            font-size: 12px;
            font-weight: 700;
            margin-bottom: 5px;
        }
    }
`;

export default function SafetyIndexVariableModalComponent({
    open = false,
    onClose = () => { },
    onSubmit = () => { },
    safetyIndexVariableForOutOfStockPeriod,
    safetyIndexVariableForTotal
}) {
    const [editSafetyIndexVariableForOutOfStockPeriod, setEditSafetyIndexVariableForOutOfStockPeriod] = useState(_.cloneDeep(safetyIndexVariableForOutOfStockPeriod));
    const [editSafetyIndexVariableForTotal, setEditSafetyIndexVariableForTotal] = useState(_.cloneDeep(safetyIndexVariableForTotal));

    const handleChangeEditSafetyIndexVariableForOutOfStockPeriod = (e) => {
        const value = e.target.value;

        setEditSafetyIndexVariableForOutOfStockPeriod(value);
    }

    const handleChangeEditSafetyIndexVariableForTotal = (e) => {
        const value = e.target.value;

        setEditSafetyIndexVariableForTotal(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editSafetyIndexVariableForOutOfStockPeriod < 1 || safetyIndexVariableForOutOfStockPeriod > 1000) {
            alert('목표 재고 소진 기간을 1 ~ 1000 로 입력해 주세요.');
            return;
        }

        if (editSafetyIndexVariableForTotal < 0.1 || editSafetyIndexVariableForTotal > 5) {
            alert('안전지수를 0.1 ~ 5 로 입력해 주세요.');
            return;
        }
        onSubmit(editSafetyIndexVariableForOutOfStockPeriod, editSafetyIndexVariableForTotal);
    }
    return (
        <>
            <CustomDialog open={open} onClose={() => onClose()}>
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <div className='input-box'>
                            <div className='label'>목표 재고 소진 기간 (기본값:30, [1 ~ 1000])</div>
                            <CustomInput
                                type='number'
                                value={editSafetyIndexVariableForOutOfStockPeriod || ''}
                                onChange={(e) => handleChangeEditSafetyIndexVariableForOutOfStockPeriod(e)}
                                step={1}
                            />
                        </div>
                        <div className='input-box'>
                            <div className='label'>기본 안전지수 (기본값:1, [0.1 ~ 5])</div>
                            <CustomInput
                                type='number'
                                value={editSafetyIndexVariableForTotal || ''}
                                onChange={(e) => handleChangeEditSafetyIndexVariableForTotal(e)}
                                step={0.1}
                            />
                        </div>
                    </ContentContainer>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton
                            type='button'
                            style={{
                                width: '40%',
                                background: 'var(--defaultModalCloseColor)',
                                color: '#fff'
                            }}
                            onClose={() => onClose()}
                        >
                            닫기
                        </CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='submit'
                            style={{
                                width: '100%',
                                flex: 1,
                                background: 'var(--mainColor)',
                                color: '#fff'
                            }}
                        >
                            적용하기
                        </CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>
        </>
    );
}