import { useEffect } from "react";
import { CustomNumberUtils } from "../../../utils/CustomNumberUtils";
import CustomBlockButton from "../../buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../dialog/v1/CustomDialog";
import CustomInput from "../../input/default/v1/CustomInput";
import { useDataSourceHook, useMrPurchaseModuleHook, usePurchaseCostFormHook } from "./hooks";
import { St } from "./index.styled";
import { useSelector } from "react-redux";
import { customBackdropController } from "../../backdrop/default/v1";
import { FdModuleList, FdPurchaseUnitPriceCalculator } from "./components";
import { useMrBaseExchangeRateHook } from "./hooks/useMrBaseExchangeRateHook";

const customNumberUtils = CustomNumberUtils();
const customBackdropControl = customBackdropController();

export function PurchaseCostCalculatorModal({
    open,
    onClose = () => { }
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();
    const purchaseCostFormHook = usePurchaseCostFormHook({
        BASE_EXCHANGE_RATE_LIST: BASE_EXCHANGE_RATE_LIST
    });
    const mrPurchaseModuleHook = useMrPurchaseModuleHook();
    const mrBaseExchangeRateHook = useMrBaseExchangeRateHook();

    useEffect(() => {
        if (!wsId) {
            return;
        }

        dataSourceHook.onReqFetchMrPurchaseModuleList({ headers: { wsId: wsId } }, (results) => {
            mrPurchaseModuleHook.onSetMrPurchaseModuleList(results);
        });
        dataSourceHook.onReqFetchMrBaseExchangeRateList({ headers: { wsId: wsId } }, (results) => {
            mrBaseExchangeRateHook.onSetMrBaseExchangeRateList(results);
        })
    }, [wsId]);

    console.log(mrBaseExchangeRateHook);
    const handleCalculate = () => {
        let productUnitPriceWithBaseExchangeRate = purchaseCostFormHook.returnProductUnitPriceWithBaseExchangeRate();
        let totalProductQty = purchaseCostFormHook.returnTotalProductQty();
        let localFreightCostWithBaseExchangeRate = purchaseCostFormHook.returnLocalFreightCostWithBaseExchangeRate();
        let extraCostWithBaseExchangeRate = purchaseCostFormHook.returnExtraCostWithBaseExchangeRate();
        let customsDutyRate = purchaseCostFormHook.returnCustomsDutyRate();
        let customsTaxRate = purchaseCostFormHook.returnCustomsTaxRate();

        let beforeCustomsSum = productUnitPriceWithBaseExchangeRate * totalProductQty + localFreightCostWithBaseExchangeRate + extraCostWithBaseExchangeRate;
        let afterCustomsSum = beforeCustomsSum + beforeCustomsSum * customsDutyRate + beforeCustomsSum * customsTaxRate;
        let purchaseUnitPrice = afterCustomsSum / totalProductQty;

        purchaseCostFormHook.onChangeValueOfName('purchaseUnitPrice', customNumberUtils.roundToDigit(purchaseUnitPrice, 0));
        // console.log(
        //     productUnitPriceWithBaseExchangeRate,
        //     totalProductQty,
        //     localFreightCostWithBaseExchangeRate,
        //     extraCostWithBaseExchangeRate,
        //     customsDutyRate,
        //     customsTaxRate,
        //     purchaseUnitPrice,
        //     customNumberUtils.roundToDigit(purchaseUnitPrice, 0)
        // );
    }

    const handleSubmitSavePurchaseUnitPriceForm = () => {

    }

    const handleSubmitAddPurchaseModule = async (form) => {
        customBackdropControl.showBackdrop();
        let headers = {
            wsId: wsId
        }

        let body = {
            id: form?.id,
            name: form?.name
        }

        let createdMrPurchaseModuleId = null;
        let newMrPurchaseModuleList = null;
        let newSelectedMrPurchaseModule = null;

        // 생성
        await dataSourceHook.onReqCreateMrPurchaseModule({ headers, body }, (results, response) => {
            createdMrPurchaseModuleId = results?.id;
        });

        // 정상적으로 생성되었다면 모듈 리스트를 재조회 및 재설정
        if (createdMrPurchaseModuleId) {
            await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers }, (results, response) => {
                newMrPurchaseModuleList = results;
            });

            mrPurchaseModuleHook.onSetMrPurchaseModuleList(newMrPurchaseModuleList);
        }

        // 새로운 모듈 리스트에서 새로운 선택 모듈을 세팅
        if (createdMrPurchaseModuleId && newMrPurchaseModuleList) {
            newSelectedMrPurchaseModule = newMrPurchaseModuleList?.find(r => r.id === createdMrPurchaseModuleId);
            mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(newSelectedMrPurchaseModule);
        }
        customBackdropControl.hideBackdrop();

    }

    const handleSubmitEditMrPurchaseModuleName = async (form) => {
        customBackdropControl.showBackdrop();
        let headers = {
            wsId: wsId
        }

        let body = {
            ...form
            // id: form?.id,
            // name: form?.name
        }

        let editedMrPurchaseModuleId = null;
        let newMrPurchaseModuleList = null;
        let newSelectedMrPurchaseModule = null;

        // 생성
        await dataSourceHook.onReqChangeMrPurchaseModuleName({ headers, body }, (results, response) => {
            editedMrPurchaseModuleId = results?.id;
        });

        // 정상적으로 생성되었다면 모듈 리스트를 재조회 및 재설정
        if (editedMrPurchaseModuleId) {
            await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers }, (results, response) => {
                newMrPurchaseModuleList = results;
            });

            mrPurchaseModuleHook.onSetMrPurchaseModuleList(newMrPurchaseModuleList);
        }

        // 새로운 모듈 리스트에서 새로운 선택 모듈을 세팅
        if (editedMrPurchaseModuleId && newMrPurchaseModuleList) {
            newSelectedMrPurchaseModule = newMrPurchaseModuleList?.find(r => r.id === editedMrPurchaseModuleId);
            mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(newSelectedMrPurchaseModule);
        }
        customBackdropControl.hideBackdrop();
    }

    const handleSubmitDeleteMrPurchaseModuleOne = async (mrPurchaseModuleId) => {
        customBackdropControl.showBackdrop();
        let headers = {
            wsId: wsId
        }

        let body = {
            id: mrPurchaseModuleId
        }

        let returnedMrPurchaseModuleId = null;
        let newMrPurchaseModuleList = null;

        // 삭제 실행
        await dataSourceHook.onReqDeleteMrPurchaseModuleOne({ headers, body }, (results, response) => {
            returnedMrPurchaseModuleId = results;
        })

        // 정상적으로 생성되었다면 모듈 리스트를 재조회 및 재설정
        if (returnedMrPurchaseModuleId) {
            await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers }, (results, response) => {
                newMrPurchaseModuleList = results;
            });

            mrPurchaseModuleHook.onSetMrPurchaseModuleList(newMrPurchaseModuleList);
        }

        mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(null);

        customBackdropControl.hideBackdrop();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="xl"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <St.Container>
                    <St.ModuleListFieldWrapper>
                        <FdModuleList
                            mrPurchaseModuleList={mrPurchaseModuleHook?.mrPurchaseModuleList}
                            selectedMrPurchaseModule={mrPurchaseModuleHook?.selectedMrPurchaseModule}
                            onSubmitAdd={handleSubmitAddPurchaseModule}
                            onSubmitEdit={handleSubmitEditMrPurchaseModuleName}
                            onSubmitDelete={handleSubmitDeleteMrPurchaseModuleOne}
                            onSetSelectedMrPurchaseModule={mrPurchaseModuleHook.onSetSelectedMrPurchaseModule}
                        />
                    </St.ModuleListFieldWrapper>

                    <St.InputFieldWrapper>
                        <FdPurchaseUnitPriceCalculator
                            baseExchangeRateList={mrBaseExchangeRateHook?.mrBaseExchangeRateList}
                        />
                        <NumberInputWithExchangeRate
                            label='제품단가'
                            valueType='PRICE'
                            buttonType='BASE_EXCHANGE_RATE'
                            baseExchangeRateId={purchaseCostFormHook?.purchaseCostForm?.productUnitPriceBaseExchangeRateId}
                            inputName='productUnitPrice'
                            purchaseCostForm={purchaseCostFormHook?.purchaseCostForm}
                            onChangeValueOfName={purchaseCostFormHook?.onChangeValueOfName}
                        />
                        <NumberInputWithExchangeRate
                            label='제품 총 수량'
                            valueType='QUANTITY'
                            buttonType='PCS'
                            inputName='totalProductQty'
                            purchaseCostForm={purchaseCostFormHook?.purchaseCostForm}
                            onChangeValueOfName={purchaseCostFormHook?.onChangeValueOfName}
                        />
                        <NumberInputWithExchangeRate
                            label='현지 운임비'
                            valueType='PRICE'
                            buttonType='BASE_EXCHANGE_RATE'
                            baseExchangeRateId={purchaseCostFormHook?.purchaseCostForm?.localFreightCostBaseExchangeRateId}
                            inputName='localFreightCost'
                            purchaseCostForm={purchaseCostFormHook?.purchaseCostForm}
                            onChangeValueOfName={purchaseCostFormHook?.onChangeValueOfName}
                        />
                        <NumberInputWithExchangeRate
                            label='기타비용'
                            valueType='PRICE'
                            buttonType='BASE_EXCHANGE_RATE'
                            baseExchangeRateId={purchaseCostFormHook?.purchaseCostForm?.extraCostBaseExchangeRateId}
                            inputName='extraCost'
                            purchaseCostForm={purchaseCostFormHook?.purchaseCostForm}
                            onChangeValueOfName={purchaseCostFormHook?.onChangeValueOfName}
                        />
                        <NumberInputWithExchangeRate
                            label='관세'
                            valueType='RATE'
                            buttonType='PERCENTAGE'
                            inputName='customsDutyRate'
                            purchaseCostForm={purchaseCostFormHook?.purchaseCostForm}
                            onChangeValueOfName={purchaseCostFormHook?.onChangeValueOfName}
                        />
                        <NumberInputWithExchangeRate
                            label='관부가세'
                            valueType='RATE'
                            buttonType='PERCENTAGE'
                            inputName='customsTaxRate'
                            purchaseCostForm={purchaseCostFormHook?.purchaseCostForm}
                            onChangeValueOfName={purchaseCostFormHook?.onChangeValueOfName}
                        />
                        <CustomBlockButton
                            type='button'
                            className='calculate-button'
                            onClick={() => handleCalculate()}
                        >
                            계산하기
                        </CustomBlockButton>
                    </St.InputFieldWrapper>
                    <St.ModuleListFieldWrapper>
                    </St.ModuleListFieldWrapper>
                    <St.ResultFieldWrapper>
                        <St.NumberInputWithExchangeRate>
                            <label>매입단가(원)</label>
                            <div className='flexible'>
                                <CustomInput
                                    type='text'
                                    className='result-input'
                                    name={'purchaseUnitPrice'}
                                    value={customNumberUtils.numberWithCommas2(purchaseCostFormHook?.purchaseCostForm?.purchaseUnitPrice) || ''}
                                    onChange={(e) => handleChangeValue(e)}
                                    inputmode='decimal'
                                    placeholder={'결과값이 표시됩니다.'}
                                    readOnly
                                ></CustomInput>

                                {/* {UnitTypeButton['BASE_EXCHANGE_RATE'](purchaseCostFormHook?.purchaseCostForm?.purchaseUnitPriceBaseExchangeRateId)} */}
                            </div>
                        </St.NumberInputWithExchangeRate>
                        <St.NumberInputWithExchangeRate>
                            <label>매입단가 (기준환율적용)</label>
                            <div className='flexible'>
                                <CustomInput
                                    type='text'
                                    className='result-input'
                                    name={'purchaseUnitPrice'}
                                    value={customNumberUtils.numberWithCommas2(purchaseCostFormHook?.purchaseCostForm?.purchaseUnitPrice) || ''}
                                    onChange={(e) => handleChangeValue(e)}
                                    inputmode='decimal'
                                    placeholder={'결과값이 표시됩니다.'}
                                    readOnly
                                ></CustomInput>

                                {UnitTypeButton['BASE_EXCHANGE_RATE'](purchaseCostFormHook?.purchaseCostForm?.purchaseUnitPriceBaseExchangeRateId)}
                            </div>
                        </St.NumberInputWithExchangeRate>
                    </St.ResultFieldWrapper>
                </St.Container>
            </CustomDialog>
        </>
    );
}

function NumberInputWithExchangeRate({
    label,
    valueType,
    buttonType,
    baseExchangeRateId,
    inputName,
    purchaseCostForm,
    onChangeValueOfName,
    readOnly
}) {
    const handleChangeValue = (e) => {
        switch (valueType) {
            case 'PRICE':
                handleChangePriceValue(e);
                break;
            case 'QUANTITY':
                handleChangeQuantityValue(e);
                break;
            case 'RATE':
                handleChangeRateValue(e);
                break;
        }
    }
    const handleChangePriceValue = (e) => {
        let value = e.target.value;
        if (!value) {
            onChangeValueOfName(inputName, '');
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnPriceValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            onChangeValueOfName(inputName, value || '');
        }
    }

    const handleChangeRateValue = (e) => {
        let value = e.target.value;

        if (!value) {
            onChangeValueOfName(inputName, value || '');
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnRateValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            onChangeValueOfName(inputName, value || '');
        }
    }

    const handleChangeQuantityValue = (e) => {
        let value = e.target.value;

        if (!value) {
            onChangeValueOfName(inputName, value || '');
            return;
        }

        value = value.replaceAll(",", "");
        if (customNumberUtils.hasPrefixZero(value)) {
            return;
        }

        if ((/^[0-9]{0,12}$/).test(value)) {
            onChangeValueOfName(inputName, value || '');
        }
    }

    const returnPriceValueElseThrow = (price, errorMessage) => {
        if (!price) {
            return 0;
        }

        if (price < 0 || price > 99999999999) { // 0.9e11
            throw new Error(errorMessage);
        }

        return price;
    }

    const returnRateValueElseThrow = (value, errorMessage) => {
        if (!value) {
            return 0;
        }

        if (value < 0 || value > 100) {
            throw new Error(errorMessage);
        }

        return value;
    }

    return (
        <St.NumberInputWithExchangeRate>
            <label>{label}</label>
            <div className='flexible'>
                <CustomInput
                    type='text'
                    name={inputName}
                    value={customNumberUtils.numberWithCommas2(purchaseCostForm[inputName]) || ''}
                    onChange={(e) => handleChangeValue(e)}
                    inputmode='decimal'
                    placeholder={valueType === 'QUANTITY' ? '1' : '0'}
                    readOnly={readOnly}
                ></CustomInput>

                {UnitTypeButton[buttonType](baseExchangeRateId)}
            </div>
        </St.NumberInputWithExchangeRate>
    );
}

const UnitTypeButton = {
    PCS: () => <button className='readOnly-button'>PCS</button>,
    BASE_EXCHANGE_RATE: (baseExchangeRateId) => {
        const baseExchangeRate = BASE_EXCHANGE_RATE_LIST?.find(r => r.id === baseExchangeRateId);

        return (
            <CustomBlockButton className='active-button' title={baseExchangeRate?.value}>{baseExchangeRate?.name || 'NN'}</CustomBlockButton>
        );
    },
    PERCENTAGE: () => <button className='readOnly-button'>%</button>
}

const BASE_EXCHANGE_RATE_LIST = [
    {
        cid: 1,
        id: 1,
        name: 'KRW',
        value: 1
    },
    {
        cid: 2,
        id: 2,
        name: 'USD',
        value: 1300
    },
    {
        cid: 3,
        id: 3,
        name: 'CNY',
        value: 190
    }
]