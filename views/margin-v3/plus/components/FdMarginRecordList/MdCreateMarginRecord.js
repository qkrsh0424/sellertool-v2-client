import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import CustomInput from "../../../../../components/input/default/v1/CustomInput";
import { St } from "./MdCreateMarginRecord.styled";
import { v4 as uuidv4 } from 'uuid';
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";

const initializeFormValues = () => {
    return {
        id: uuidv4(),
        name: '',
        tag: '',
        salesPrice: '0',
        salesPriceMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        consumerDeliveryCharge: '0',
        consumerDeliveryChargeMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        purchaseUnitPrice: '0',
        purchaseUnitPriceMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        purchaseUnitFreightCost: '0',
        purchaseUnitFreightCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        sellerDeliveryCharge: '0',
        sellerDeliveryChargeMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        marketDefaultCommission: '0',
        marketLinkedCommission: '0',
        marketDeliveryCommission: '0',
        marketingCost: '0',
        marketingCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        extraCost: '0',
        extraCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        mrPurchaseModuleYn: 'n',
        mrPurchaseModuleId: null,
        marketCommissionType: 'ETC',
    }
}
export function MdCreateMarginRecord({
    open = false,
    onClose = () => { },
    onConfirm = async () => { }
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [formValues, setFormValues] = useState(initializeFormValues());

    const handleChangeNameValueFormEvent = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmitConfirm = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        await onConfirm({
            ...formValues,
            name: formValues?.name?.trim(),
            tag: formValues?.tag?.trim()
        }, () => {
            onClose();
        })
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>마진율 계산기 추가</CustomDialog.Title>
                <St.Container onSubmit={(e) => handleSubmitConfirm(e)}>
                    <St.FormWrapper>
                        <div className="control-wrapper">
                            <label>상품명</label>
                            <CustomInput
                                type='text'
                                placeholder='1-50자 내외로 입력'
                                name='name'
                                value={formValues?.name}
                                onChange={(e) => handleChangeNameValueFormEvent(e)}
                                maxLength={50}
                            />
                        </div>
                        <div className="control-wrapper">
                            <label>태그</label>
                            <CustomInput
                                type='text'
                                placeholder='0-50자 내외로 입력'
                                name='tag'
                                value={formValues?.tag}
                                onChange={(e) => handleChangeNameValueFormEvent(e)}
                                maxLength={50}
                            />
                        </div>
                    </St.FormWrapper>
                    <St.ButtonWrapper>
                        <CustomBlockButton
                            type='button'
                            className='button-el'
                            style={{ color: '#808080' }}
                            onClick={() => onClose()}
                        >
                            취소
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='submit'
                            className='button-el'
                            style={{ color: 'var(--mainColor)' }}
                            rippleColor={'var(--mainColorOpacity200)'}
                            disabled={disabledBtn}
                        >
                            확인
                        </CustomBlockButton>
                    </St.ButtonWrapper>
                </St.Container>
            </CustomDialog>
        </>
    );
}