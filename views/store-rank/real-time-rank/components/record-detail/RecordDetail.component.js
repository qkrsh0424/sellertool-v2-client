import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { Container } from "./styles/RecordDetail.styled";
import RankInfoFieldView from "./view/RecordInfoField.view";

export function RecordDetailComponent() {
    const {
        record,
        recordDetails,
        reqCreateNRankRecordDetail
    } = useNRankRecordDetailHook();

    return (
        <>
            <Container>
                <RankInfoFieldView record={record} />
                <CustomBlockButton
                    className='button-item'
                    onClick={() => reqCreateNRankRecordDetail()}
                >
                    조회
                </CustomBlockButton>
                {/* <RankRecordDetailFieldView /> */}
            </Container>
        </>
    )
}