import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import { customToast } from "../../../../../components/toast/custom-react-toastify/v1";
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { RefErpCollectionHeadersContextProvider, useRefErpCollectionHeadersValueContextHook } from "./contexts/ref-erp-collection-headers-context";
import { useCustomFetcher } from "./fetchers/useCustomFetcher";
import { ErpcExcelDownloadFormsContextProvider, useErpcExcelDownloadFormsValueContextHook } from "./contexts/erpc-excel-download-forms-context";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { WegetSettings } from "./wegets/weget-settings";
import { SettingVariablesContextProvider } from "./contexts/setting-variables-context";
import { WegetPreview } from "./wegets/weget-preview";

const StyledHeader = styled.div`
    padding: 10px;
`;

const StyledBody = styled.div`
    padding: 10px;

    .settings-box{

    }
`;

const StyledFooter = styled.div`

`;

export function ExcelDownloadModal({
    ...props
}) {
    return (
        <RefErpCollectionHeadersContextProvider>
            <ErpcExcelDownloadFormsContextProvider>
                <SettingVariablesContextProvider>
                    <ExcelDownloadModalCore
                        {...props}
                    />
                </SettingVariablesContextProvider>
            </ErpcExcelDownloadFormsContextProvider>
        </RefErpCollectionHeadersContextProvider>
    );
}

export function ExcelDownloadModalCore({
    open,
    onClose,
    selectedErpItems
}) {
    const customFetcher = useCustomFetcher();

    const refErpCollectionHeadersValueContextHook = useRefErpCollectionHeadersValueContextHook();

    const erpcExcelDownloadFormsValueContextHook = useErpcExcelDownloadFormsValueContextHook();

    return (
        <>
            <CustomDialog
                open={open}
                onClose={onClose}
                maxWidth="xl"
            >
                <StyledHeader>
                    <CustomDialog.Header>
                        <CustomDialog.Header.Fake />
                        <CustomDialog.Header.Title>엑셀 다운로드</CustomDialog.Header.Title>
                        <CustomDialog.Header.Close onClick={() => onClose()}></CustomDialog.Header.Close>
                    </CustomDialog.Header>
                </StyledHeader>
                <StyledBody>
                    <WegetSettings
                        selectedErpItems={selectedErpItems}
                    />
                </StyledBody>
            </CustomDialog>
        </>
    );
}