import _ from "lodash";
import { useEffect, useState } from "react";
import { FormDetail } from "../../../../../../static-data/erp-collection-excel-download-form/RefExcelDownloadForm";

export default function useCreateFormDetailsHook(erpcExcelDownloadForm) {
    const [createFormDetails, setCreateFormDetails] = useState([new FormDetail().toJson()]);

    useEffect(() => {
        if(!erpcExcelDownloadForm?.erpcExcelDownloadFormDetails){
            setCreateFormDetails([new FormDetail().toJson()]);
            return;
        }
        
        setCreateFormDetails(_.cloneDeep(erpcExcelDownloadForm?.erpcExcelDownloadFormDetails));
    }, [erpcExcelDownloadForm?.erpcExcelDownloadFormDetails]);

    const onAddFormDetail = () => {
        if (createFormDetails?.length >= 80) {
            alert('구성요소는 최대 80개 까지 추가 가능합니다.');
            return;
        }
        setCreateFormDetails([...createFormDetails.concat(new FormDetail().toJson())]);
    }

    const onDeleteFormDetail = (reqIndex) => {
        if (createFormDetails?.length <= 1) {
            alert('최소 1개 이상의 구성요소를 등록해야 합니다.');
            return;
        }

        setCreateFormDetails(createFormDetails?.filter((r, index) => index !== reqIndex));
    }

    const onChangeCustomCellName = (e, reqIndex) => {
        let value = e.target.value;

        setCreateFormDetails(createFormDetails.map((r, index) => {
            if (reqIndex === index) {
                return {
                    ...r,
                    customCellName: value
                }
            } else {
                return { ...r }
            }
        }))
    }

    const onChangeFieldType = (value, targetFormDetailId) => {
        switch (value) {
            case '일반':
                setCreateFormDetails(createFormDetails.map(r => {
                    if (r.id === targetFormDetailId) {
                        return {
                            ...r,
                            fieldType: value,
                            fixedValue: '',
                        }
                    } else {
                        return { ...r }
                    }
                }))
                break;
            case '고정값':
                setCreateFormDetails(createFormDetails.map(r => {
                    if (r.id === targetFormDetailId) {
                        return {
                            ...r,
                            fieldType: value,
                            viewDetails: [],
                        }
                    } else {
                        return { ...r }
                    }
                }))
                break;
            case '운송코드':
                setCreateFormDetails(createFormDetails.map(r => {
                    if (r.id === targetFormDetailId) {
                        return {
                            ...r,
                            fieldType: value,
                            viewDetails: [],
                            fixedValue: '',
                            valueSplitter: '-',
                            mergeYn: 'n',
                            mergeSplitter: '\n'
                        }
                    } else {
                        return { ...r }
                    }
                }))
                break;
        }
    }

    const onChangeValueSplitter = (value, targetFormDetailId) => {
        setCreateFormDetails(createFormDetails.map(r => {
            if (r.id === targetFormDetailId) {
                return {
                    ...r,
                    valueSplitter: value
                }
            } else {
                return { ...r }
            }
        }))
    }

    const onChangeMergeSplitter = (value, targetFormDetailId) => {
        setCreateFormDetails(createFormDetails.map(r => {
            if (r.id === targetFormDetailId) {
                return {
                    ...r,
                    mergeSplitter: value
                }
            } else {
                return { ...r }
            }
        }))
    }

    const onChangeMergeYn = (yn, targetFormDetailId) => {
        setCreateFormDetails(createFormDetails.map(r => {
            if (r.id === targetFormDetailId) {
                return {
                    ...r,
                    mergeYn: yn
                }
            } else {
                return { ...r }
            }
        }))
    }

    const onChangeFixedValue = (e, targetFormDetailId) => {
        let value = e.target.value;

        setCreateFormDetails(createFormDetails.map(r => {
            if (r.id === targetFormDetailId) {
                return {
                    ...r,
                    fixedValue: value
                }
            } else {
                return { ...r }
            }
        }))
    }

    const onChangeViewDetails = (viewDetails, targetFormDetailId) => {
        setCreateFormDetails(createFormDetails.map(r => {
            if (r.id === targetFormDetailId) {
                return {
                    ...r,
                    viewDetails: viewDetails
                }
            } else {
                return { ...r }
            }
        }))
    }

    const checkFormDetailsFormatValid = () => {
        createFormDetails?.forEach((r, index) => {
            if (r.customCellName?.length > 50) {
                throw new Error(`${index + 1} 행 : 구성요소명의 형식이 맞지 않습니다. 범위 : 0-50자`)
            }

            if (r.fieldType === '일반' && r.viewDetails?.length > 5) {
                throw new Error(`${index + 1} 행 : 필드값은 최대 5개 까지 선택 가능합니다.`);
            }

            if (r.fieldType === '고정값' && r.fixedValue?.length > 50) {
                throw new Error(`${index + 1} 행 : 고정값의 형식이 맞지 않습니다. 범위 : 0-50자`);
            }
        })
    }

    const returnSubmitFormat = () => {
        return createFormDetails?.map((r, index) => {
            return {
                ...r,
                viewDetails: r.viewDetails?.join(),
                orderNumber: index
            }
        })
    }

    return {
        createFormDetails,
        onAddFormDetail,
        onDeleteFormDetail,
        onChangeCustomCellName,
        onChangeFieldType,
        onChangeValueSplitter,
        onChangeMergeSplitter,
        onChangeMergeYn,
        onChangeFixedValue,
        onChangeViewDetails,
        checkFormDetailsFormatValid,
        returnSubmitFormat
    }
}