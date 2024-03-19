import { useEffect, useState } from "react";
import { CustomDialog } from "../../dialog/v1/CustomDialog";
import { St } from "./index.styled";
import CustomBlockButton from "../../buttons/block-button/v1/CustomBlockButton";
import { FdCommonCalculator, FdOverseasCalculator } from "./components";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        wsId,
        mrBaseExchangeRateList,
    ]);

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

    const handleChangeType = (type) => {
        setType(type);
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
                                onClick={() => handleChangeType('COMMON')}
                            >일반형</CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className={`button-item ${type === 'OVERSEAS' ? 'button-item-isActive' : ''}`}
                                onClick={() => handleChangeType('OVERSEAS')}
                            >해외 수입형</CustomBlockButton>
                        </div>
                    </St.ButtonGroupWrapper>
                    {type === 'COMMON' &&
                        <FdCommonCalculator
                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                            onExport={handleSubmitExport}
                        />
                    }
                    {type === 'OVERSEAS' &&
                        <FdOverseasCalculator
                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                            onExport={handleSubmitExport}
                        />
                    }
                </St.Container>
            </CustomDialog>
        </>
    );
}