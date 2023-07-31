
import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { DetailWrapper, Wrapper } from "./styles/RecordDetailModal.styled";
import RankDetailFieldView from "./view/RankDetailField.view";
import RecordInfoFieldView from "./view/RecordInfoField.view";
import ButtonFieldView from "./view/ButtonField.view";
import AdRankDetailFieldView from "./view/AdRankDetailField.view";
import { useState } from "react";
import ViewControlFieldView from "./view/ViewControlField.view";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import { CustomProgressIcon } from "../../progress/progress-icon/v1";

export function RecordDetailModalComponent({
    open,
    onClose,
    record,
    reqSearchNRankRecordList
}) {
    const [isAdRankView, setIsAdRankView] = useState(false);
    
    const {
        isLoading: isRecordDetailsSearchLoading,
        recordDetails,
        adRecordDetails,
        targetRecordInfo,
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
        });
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
                        targetRecordInfo={targetRecordInfo}
                    />
                    <ButtonFieldView
                        targetRecordInfo={targetRecordInfo}
                        isRecordDetailsSearchLoading={isRecordDetailsSearchLoading}
                        onSubmit={handleCreateNRankRecordDetail}
                    />
                    <DetailWrapper style={{ position: 'relative' }}>
                        <ViewControlFieldView
                            isAdRankView={isAdRankView}
                            recordDetails={recordDetails}
                            adRecordDetails={adRecordDetails}
                            onChangeAdRankView={handleChangeAdRankView}
                            onChangeRankView={handleChangeRankView}
                        />
                        
                        {isRecordDetailsSearchLoading &&
                            <CustomProgressIcon
                                type={'sync'}
                                // color='#a7abb9'
                                color='var(--mainColor)'
                                size={20}
                                margin={20}
                                isBackgroundBlur={true}
                            />
                        }

                        {isAdRankView ?
                            <AdRankDetailFieldView
                                adRecordDetails={adRecordDetails}
                            />
                            :
                            <RankDetailFieldView
                                targetRecordInfo={targetRecordInfo}
                                recordDetails={recordDetails}
                            />
                        }
                    </DetailWrapper>
                </Wrapper>
            </CustomDialog>
        </>
    )
}