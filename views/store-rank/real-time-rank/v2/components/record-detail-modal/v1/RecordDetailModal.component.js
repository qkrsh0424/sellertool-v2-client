
import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { DetailWrapper, Wrapper } from "./styles/RecordDetailModal.styled";
import RankDetailFieldView from "./view/RankDetailField.view";
import RecordInfoFieldView from "./view/RecordInfoField.view";
import ButtonFieldView from "./view/ButtonField.view";
import AdRankDetailFieldView from "./view/AdRankDetailField.view";
import { useEffect, useState } from "react";
import ViewControlFieldView from "./view/ViewControlField.view";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";

export function RecordDetailModalComponent({
    open,
    onClose,
    record,
    reqSearchNRankRecordList
}) {
    const [isAdRankView, setIsAdRankView] = useState(false);
    const [currentRecordInfo, setCurrentRecordInfo] = useState(null);

    const {
        recordDetails,
        adRecordDetails,
        reqCreateNRankRecordDetail
    } = useNRankRecordDetailHook({ record });

    useEffect(() => {
        if(!record) {
            return;
        }

        handleInitCurrentRecordInfo()
    }, [record])

    const handleInitCurrentRecordInfo = () => {
        let data = record?.infos?.find(info => record.current_nrank_record_info_id === info.id);
        setCurrentRecordInfo(data);
    }

    const handleChangeAdRankView = () => {
        setIsAdRankView(true);
    }

    const handleChangeRankView = () => {
        setIsAdRankView(false);
    }

    const handleCreateNRankRecordDetail = () => {
        reqCreateNRankRecordDetail(() => {
            reqSearchNRankRecordList()
        })
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="md"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>랭킹 조회</CustomDialog.Title>
                <Wrapper>
                    <RecordInfoFieldView
                        record={record}
                        currentRecordInfo={currentRecordInfo}
                    />
                    <ButtonFieldView
                        currentRecordInfo={currentRecordInfo}
                        onSubmit={handleCreateNRankRecordDetail}
                    />
                    <DetailWrapper>
                        <ViewControlFieldView
                            isAdRankView={isAdRankView}
                            recordDetails={recordDetails}
                            adRecordDetails={adRecordDetails}
                            onChangeAdRankView={handleChangeAdRankView}
                            onChangeRankView={handleChangeRankView}
                        />
                        {isAdRankView ?
                            <AdRankDetailFieldView
                                adRecordDetails={adRecordDetails}
                            />
                            :
                            <RankDetailFieldView
                                currentRecordInfo={currentRecordInfo}
                                recordDetails={recordDetails}
                            />
                        }
                    </DetailWrapper>
                </Wrapper>
            </CustomDialog>
        </>
    )
}