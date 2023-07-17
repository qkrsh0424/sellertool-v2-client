import { ButtonBox, Wrapper } from "../styles/ViewControl.styled";

export default function ViewControlFieldView({
    isAdRankView,
    recordDetails,
    adRecordDetails,
    onChangeAdRankView,
    onChangeRankView,
}) {
    return (
        <Wrapper>
            <ButtonBox>
                <button
                    className={`button-el ${!isAdRankView && 'active-el'}`}
                    style={{ borderRadius: '5px 5px 0 0' }}
                    onClick={() => onChangeRankView()}
                >
                    <span>일반 </span>
                    <span>({recordDetails?.length ?? 0})</span>
                </button>
            </ButtonBox>
            <ButtonBox>
                <button
                    className={`button-el ${isAdRankView && 'active-el'}`}
                    style={{ borderRadius: '5px 5px 0 0' }}
                    onClick={() => onChangeAdRankView()}
                >
                    <span>광고 </span>
                    <span>({adRecordDetails?.length ?? 0})</span>
                </button>
            </ButtonBox>
        </Wrapper>
    )
}