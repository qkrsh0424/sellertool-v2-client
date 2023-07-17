import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { DetailWrapper, Wrapper } from "./styles/RecordDetailModal.styled";
import RankDetailFieldView from "./view/RankDetailField.view";
import RecordInfoFieldView from "./view/RecordInfoField.view";
import ButtonFieldView from "./view/ButtonField.view";
import AdRankDetailFieldView from "./view/AdRankDetailField.view";
import { useState } from "react";
import ViewControlFieldView from "./view/ViewControlField.view";

export function RecordDetailModalComponent({
    open,
    onClose,
    record,
    reqSearchNRankRecordList
}) {
    const [isAdRankView, setIsAdRankView] = useState(false);

    const {
        recordDetails,
        adRecordDetails,
        reqCreateNRankRecordDetail
    } = useNRankRecordDetailHook({ record });

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
                    <RecordInfoFieldView record={record} />
                    <ButtonFieldView
                        record={record}
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
                                record={record}
                                adRecordDetails={adRecordDetails}
                            />
                            :
                            <RankDetailFieldView
                                record={record}
                                recordDetails={recordDetails}
                            />
                        }
                    </DetailWrapper>
                </Wrapper>
            </CustomDialog>
        </>
    )
}