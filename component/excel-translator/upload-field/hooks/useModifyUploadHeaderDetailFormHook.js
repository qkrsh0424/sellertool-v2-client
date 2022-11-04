import _ from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { excelTranslatorHeaderDataConnect } from "../../../../data_connect/excelTranslatorHeaderDataConnect";
import valueUtils from "../../../../utils/valueUtils";

export default function useModifyUploadHeaderDetailFormHook({
    excelTranslatorHeader
}) {
    const [modifyUploadHeaderDetailForm, setModifyUploadHeaderDetailForm] = useState(null);

    useEffect(() => {

        onInitModifyUploadHeaderDetailForm();
    }, [excelTranslatorHeader?.uploadHeaderDetail]);

    const onInitModifyUploadHeaderDetailForm = () => {
        if (!excelTranslatorHeader?.uploadHeaderDetail) {
            setModifyUploadHeaderDetailForm({
                details: []
            });
            return;
        }
        setModifyUploadHeaderDetailForm(excelTranslatorHeader?.uploadHeaderDetail);
    }

    const reqUploadSampleExcel = async ({
        formData,
        successCallback
    }) => {
        await excelTranslatorHeaderDataConnect().uploadSampleExcelForUploadHeaderDetail(formData)
            .then(res => {
                if (res.status === 200) {
                    setModifyUploadHeaderDetailForm(res.data.data);
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
        let currUploadHeaderDetail = _.cloneDeep(modifyUploadHeaderDetailForm);
        let details = currUploadHeaderDetail.details;

        if (!details) {
            details = [{
                id: uuidv4(),
                cellType: 'String',
                cellNumber: '0',
                headerName: ''
            }];
        } else {
            details.push({
                id: uuidv4(),
                cellType: 'String',
                cellNumber: `${details.length}`,
                headerName: ''
            })
        }

        currUploadHeaderDetail.details = details;

        setModifyUploadHeaderDetailForm(currUploadHeaderDetail);
    }

    const onActionDeleteDetail = (detailId) => {
        setModifyUploadHeaderDetailForm({
            ...modifyUploadHeaderDetailForm,
            details: modifyUploadHeaderDetailForm.details.filter(r => r.id !== detailId)
        })
    }

    const onChangeHeaderName = (e, detailId) => {
        let value = e.target.value;

        setModifyUploadHeaderDetailForm({
            ...modifyUploadHeaderDetailForm,
            details: modifyUploadHeaderDetailForm.details.map(r => {
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

    const onActionChangeOrder = (result) => {
        if (!result.destination) return;

        let targetUploadHeaderDetails = [...modifyUploadHeaderDetailForm?.details];

        const newDetails = valueUtils.reorder(
            targetUploadHeaderDetails,
            result.source.index,
            result.destination.index
        );

        setModifyUploadHeaderDetailForm({
            ...modifyUploadHeaderDetailForm,
            details: newDetails
        })
    }

    const checkUploadHeaderDetailFormatValid = () => {
        if (!modifyUploadHeaderDetailForm) {
            throw new Error('요청을 실행할 수 없습니다. 관리자에 문의해 주세요.\nHINT: uploadHeaderDetail');
        }
    }

    const checkDetailsFormatValid = () => {
        if (!modifyUploadHeaderDetailForm?.details || valueUtils.isEmptyValues(modifyUploadHeaderDetailForm?.details)) {
            throw new Error('최소 1개 이상의 헤더를 추가해야 됩니다.');
        }
    }

    const checkHeaderNameFormatValid = () => {
        modifyUploadHeaderDetailForm?.details?.forEach((r, index) => {
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

    return {
        modifyUploadHeaderDetailForm,
        reqUploadSampleExcel,
        onActionAddDetails,
        onActionDeleteDetail,
        onChangeHeaderName,
        onActionChangeOrder,
        checkUploadHeaderDetailFormatValid,
        checkDetailsFormatValid,
        checkHeaderNameFormatValid
    }
}