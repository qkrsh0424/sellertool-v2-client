import _ from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { excelTranslatorHeaderDataConnect } from "../../../../data_connect/excelTranslatorHeaderDataConnect";
import valueUtils from "../../../../utils/valueUtils";

export default function useModifyDownloadHeaderDetailFormHook({
    excelTranslatorHeader
}) {
    const [modifyDownloadHeaderDetailForm, setModifyDownloadHeaderDetailForm] = useState(null);

    useEffect(() => {
        onInitModifyDownloadHeaderDetailForm();
    }, [excelTranslatorHeader?.downloadHeaderDetail]);

    const onInitModifyDownloadHeaderDetailForm = () => {
        if (!excelTranslatorHeader?.downloadHeaderDetail) {
            setModifyDownloadHeaderDetailForm({
                details: []
            });
            return;
        }
        setModifyDownloadHeaderDetailForm(excelTranslatorHeader?.downloadHeaderDetail);
    }

    const reqUploadSampleExcel = async ({
        formData,
        successCallback
    }) => {
        await excelTranslatorHeaderDataConnect().uploadSampleExcelForDownloadHeaderDetail(formData)
            .then(res => {
                if (res.status === 200) {
                    setModifyDownloadHeaderDetailForm(res.data.data);
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
                return;
            })
    }

    const onActionAddDetails = () => {
        let currDownloadHeaderDetail = _.cloneDeep(modifyDownloadHeaderDetailForm);
        let details = currDownloadHeaderDetail.details;

        if (!details) {
            details = [{
                id: uuidv4(),
                fixedValue: '',
                headerName: '',
                uploadHeaderId: '',
                targetCellNumber: '0'
            }];
        } else {
            details.push({
                id: uuidv4(),
                fixedValue: '',
                headerName: '',
                uploadHeaderId: '',
                targetCellNumber: '0'
            })
        }

        currDownloadHeaderDetail.details = details;

        setModifyDownloadHeaderDetailForm(currDownloadHeaderDetail);
    }

    const onActionDeleteDetail = (detailId) => {
        setModifyDownloadHeaderDetailForm({
            ...modifyDownloadHeaderDetailForm,
            details: modifyDownloadHeaderDetailForm.details.filter(r => r.id !== detailId)
        })
    }

    const onChangeHeaderName = (e, detailId) => {
        let value = e.target.value;

        setModifyDownloadHeaderDetailForm({
            ...modifyDownloadHeaderDetailForm,
            details: modifyDownloadHeaderDetailForm.details.map(r => {
                if (r.id === detailId) {
                    return {
                        ...r,
                        headerName: value
                    }
                } else {
                    return {
                        ...r
                    }
                }
            })
        })
    }

    const onChangeFixedValue = (e, detailId) => {
        let value = e.target.value;

        setModifyDownloadHeaderDetailForm({
            ...modifyDownloadHeaderDetailForm,
            details: modifyDownloadHeaderDetailForm.details.map(r => {
                if (r.id === detailId) {
                    return {
                        ...r,
                        fixedValue: value
                    }
                } else {
                    return {
                        ...r
                    }
                }
            })
        })
    }

    const onChangeFixedValueUsageOn = (detailId) => {
        setModifyDownloadHeaderDetailForm({
            ...modifyDownloadHeaderDetailForm,
            details: modifyDownloadHeaderDetailForm.details.map(r => {
                if (r.id === detailId) {
                    return {
                        ...r,
                        fixedValue: '',
                        uploadHeaderId: '',
                        targetCellNumber: '-1'
                    }
                } else {
                    return {
                        ...r
                    }
                }
            })
        })
    }

    const onChangeFixedValueUsageOff = (detailId) => {
        setModifyDownloadHeaderDetailForm({
            ...modifyDownloadHeaderDetailForm,
            details: modifyDownloadHeaderDetailForm.details.map(r => {
                if (r.id === detailId) {
                    return {
                        ...r,
                        fixedValue: '',
                        uploadHeaderId: '',
                        targetCellNumber: '0'
                    }
                } else {
                    return {
                        ...r
                    }
                }
            })
        })
    }

    const onChangeTargetCellNumber = (e, detailId) => {
        let value = e.target.value;

        if (value == '-1') {
            setModifyDownloadHeaderDetailForm({
                ...modifyDownloadHeaderDetailForm,
                details: modifyDownloadHeaderDetailForm.details.map(r => {
                    if (r.id === detailId) {
                        return {
                            ...r,
                            fixedValue: '',
                            uploadHeaderId: '',
                            targetCellNumber: '-1'
                        }
                    } else {
                        return {
                            ...r
                        }
                    }
                })
            })
            return;
        }

        setModifyDownloadHeaderDetailForm({
            ...modifyDownloadHeaderDetailForm,
            details: modifyDownloadHeaderDetailForm.details.map(r => {
                if (r.id === detailId) {
                    return {
                        ...r,
                        fixedValue: '',
                        targetCellNumber: value
                    }
                } else {
                    return {
                        ...r
                    }
                }
            })
        })
    }

    const onActionChangeOrder = (result) => {
        if (!result.destination) return;

        let targetDownloadHeaderDetails = [...modifyDownloadHeaderDetailForm?.details];

        const newDetails = valueUtils.reorder(
            targetDownloadHeaderDetails,
            result.source.index,
            result.destination.index
        );

        setModifyDownloadHeaderDetailForm({
            ...modifyDownloadHeaderDetailForm,
            details: newDetails
        })
    }

    const checkDownloadHeaderDetailFormatValid = () => {
        if (!modifyDownloadHeaderDetailForm) {
            throw new Error('요청을 실행할 수 없습니다. 관리자에 문의해 주세요.\nHINT: downloadHeaderDetail');
        }
    }

    const checkDetailsFormatValid = () => {
        if (!modifyDownloadHeaderDetailForm?.details || valueUtils.isEmptyValues(modifyDownloadHeaderDetailForm?.details)) {
            throw new Error('최소 1개 이상의 헤더를 추가해야 됩니다.');
        }
    }

    const checkHeaderNameFormatValid = () => {
        modifyDownloadHeaderDetailForm?.details?.forEach((r, index) => {
            let headerName = r.headerName;

            let spaceSearchRegex = /^(\s)|(\s)$/;

            if (headerName.search(spaceSearchRegex) !== -1) {
                throw new Error(`${index + 1} 행의 헤더명 형식을 정확히 입력해 주세요.\n(앞뒤 공백 제외 1-20 자)`);
            }

            if (headerName.length < 1 || headerName.length > 20) {
                throw new Error(`${index + 1} 행의 헤더명 형식을 정확히 입력해 주세요.\n(앞뒤 공백 제외 1-20 자)`);
            }
        })
    }

    const checkFixedValueFormatValid = () => {
        modifyDownloadHeaderDetailForm?.details?.forEach((r, index) => {
            if(r.targetCellNumber != '-1'){
                return;
            }

            let fixedValue = r.fixedValue;

            let spaceSearchRegex = /^(\s)|(\s)$/;

            if (fixedValue.search(spaceSearchRegex) !== -1) {
                throw new Error(`${index + 1} 행의 고정값 형식을 정확히 입력해 주세요.\n(앞뒤 공백 제외 < 20 자)`);
            }

            if (fixedValue.length < 0 || fixedValue.length > 20) {
                throw new Error(`${index + 1} 행의 고정값 형식을 정확히 입력해 주세요.\n(앞뒤 공백 제외 < 20 자)`);
            }
        })
    }

    return {
        modifyDownloadHeaderDetailForm,
        reqUploadSampleExcel,
        onActionAddDetails,
        onActionDeleteDetail,
        onChangeHeaderName,
        onChangeFixedValue,
        onChangeFixedValueUsageOn,
        onChangeFixedValueUsageOff,
        onChangeTargetCellNumber,
        onActionChangeOrder,
        checkDownloadHeaderDetailFormatValid,
        checkDetailsFormatValid,
        checkHeaderNameFormatValid,
        checkFixedValueFormatValid
    }
}