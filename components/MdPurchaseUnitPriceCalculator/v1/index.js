import { useEffect, useState } from "react";
import { CustomDialog } from "../../dialog/v1/CustomDialog";
import { St } from "./index.styled";
import CustomInput from "../../input/default/v1/CustomInput";
import CustomBlockButton from "../../buttons/block-button/v1/CustomBlockButton";
import { FdCommonCalculator } from "./components";
import { useDataSourceHook } from "./hooks";
import { useDispatch, useSelector } from "react-redux";

export function MdPurchaseUnitPriceCalculator({
    open = false,
    onClose = () => { },
    onExport
}) {
    const reduxDispatch = useDispatch();
    const mrBaseExchangeRateRedux = useSelector(state => state?.mrBaseExchangeRateRedux);
    const workspaceRedux = useSelector(state => state?.workspaceRedux);

    const dataSourceHook = useDataSourceHook();

    const [dialogSize, setDialogSize] = useState('xl');
    const [type, setType] = useState('COMMON'); // COMMON, OVERSEAS

    const wsId = workspaceRedux?.workspaceInfo?.id;
    const mrBaseExchangeRateList = mrBaseExchangeRateRedux?.mrBaseExchangeRateList;

    useEffect(() => {
        if (!wsId) {
            return;
        }

        if (mrBaseExchangeRateList) {
            return;
        }

        handleReqFetchMrBaseExchangeRateList();
    }, [wsId, mrBaseExchangeRateList]);

    const handleReqFetchMrBaseExchangeRateList = async () => {
        await dataSourceHook?.onReqFetchMrBaseExchangeRateList({ headers: { wsId: wsId } }, (results, response) => {
            reduxDispatch({
                type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                payload: {
                    name: 'mrBaseExchangeRateList',
                    value: results
                }
            });
        });
    }

    const handleSubmitExport = (body) => {
        onExport(body);
        onClose();
    }
    return (
        <>
            <CustomDialog
                open={open}
                maxWidth={dialogSize}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>매입단가 계산기</CustomDialog.Title>
                <St.Container>
                    <St.ButtonGroupWrapper>
                        <div className='flexible'>
                            <CustomBlockButton
                                type='button'
                                className={`button-item ${type === 'COMMON' ? 'button-item-isActive' : ''}`}
                            >일반형</CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className={`button-item ${type === 'OVERSEAS' ? 'button-item-isActive' : ''}`}
                            >해외 수입형</CustomBlockButton>
                        </div>
                    </St.ButtonGroupWrapper>
                    <FdCommonCalculator
                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                        onExport={handleSubmitExport}
                    />
                </St.Container>
            </CustomDialog>
        </>
    );
}