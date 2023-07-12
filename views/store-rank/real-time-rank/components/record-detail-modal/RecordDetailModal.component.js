import { useEffect, useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import { diffTimeToHHmmss, setPlusTime } from "../../utils/dateFormatUtils";
import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { Wrapper } from "./styles/RecordDetailModal.styled";
import RankDetailFieldView from "./view/RankDetailField.view";
import RecordInfoFieldView from "./view/RecordInfoField.view";
import useNRankRecordHook from "./hooks/useNRankRecordHook";

export function RecordDetailModalComponent({
    open,
    onClose,
    onActionOpenSearchedRecordDetail
}) {
    const {
        record
    } = useNRankRecordHook();

    const {
        recordDetails,
        reqCreateNRankRecordDetail
    } = useNRankRecordDetailHook({ record });

    const [timeDiff, setTimeDiff] = useState(null);
    const [isSearchable, setIsSearchable] = useState(false);

    useEffect(() => {
        if(!record) {
            return;
        }

        let currentTime = new Date();
        let targetTime = setPlusTime(record.last_searched_at, 1, 0, 0);
        
        if(currentTime > targetTime) {
            setIsSearchable(true);
            return;
        }
        let timerValue = diffTimeToHHmmss(currentTime, targetTime);
        setTimeDiff(timerValue)

        const timer = setInterval(() => {
            currentTime = new Date();

            if(currentTime > targetTime) {
                setIsSearchable(true);
                return;
            }

            timerValue = diffTimeToHHmmss(currentTime, targetTime)
            setTimeDiff(timerValue)
        }, 1000)

        return () => clearInterval(timer)
    }, [record])

    const handleActionCreateNRankRecordDetail = async () => {
        setIsSearchable(false);

        await reqCreateNRankRecordDetail(() => {
            onActionOpenSearchedRecordDetail();
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
                    {isSearchable ?
                        <CustomBlockButton
                            className='button-item'
                            onClick={() => handleActionCreateNRankRecordDetail()}
                        >
                            조회
                        </CustomBlockButton>
                        :
                        <CustomBlockButton
                            className='disabled-btn'
                            disabled
                        >
                            {timeDiff}
                        </CustomBlockButton>
                    }
                    <RankDetailFieldView recordDetails={recordDetails} />
                </Wrapper>
            </CustomDialog>
        </>
    )
}