import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { Wrapper } from "./styles/RecordDetailModal.styled";
import RankDetailFieldView from "./view/RankDetailField.view";
import RecordInfoFieldView from "./view/RecordInfoField.view";

export function RecordDetailModalComponent({
    record,
    onClose
}) {
    const {
        recordDetails,
        reqCreateNRankRecordDetail
    } = useNRankRecordDetailHook({ record });

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="lg"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>랭킹 조회</CustomDialog.Title>
                <Wrapper>
                    <RecordInfoFieldView record={record} />
                    <CustomBlockButton
                        className='button-item'
                        onClick={() => reqCreateNRankRecordDetail()}
                    >
                        조회
                    </CustomBlockButton>
                    <RankDetailFieldView recordDetails={recordDetails} />
                </Wrapper>
            </CustomDialog>
        </>
    )
}