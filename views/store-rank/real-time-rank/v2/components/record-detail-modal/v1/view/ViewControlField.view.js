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
                    type='button'
                    className={`button-el ${!isAdRankView && 'active-el'}`}
                    style={{ borderRadius: '15px 15px 0 0' }}
                    onClick={() => onChangeRankView()}
                >
                    <div>일반</div>
                    <div className='sub-info'>{recordDetails?.length ?? 0}</div>
                </button>
            </ButtonBox>
            <ButtonBox>
                <button
                    type='button'
                    className={`button-el ${isAdRankView && 'active-el'}`}
                    style={{ borderRadius: '15px 15px 0 0' }}
                    onClick={() => onChangeAdRankView()}
                >
                    <div>광고</div>
                    <div className='sub-info'>{adRecordDetails?.length ?? 0}</div>
                </button>
            </ButtonBox>
        </Wrapper>
    )
}