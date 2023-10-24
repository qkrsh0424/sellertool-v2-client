import { ButtonBox, Wrapper } from "../styles/ViewControl.styled";

export default function ViewControlFieldView({
    isAdRankTrakView,
    recordDetails,
    adRecordDetails,
    handleChangeRankTrakView,
    handleChangeAdRankTrakView
}) {
    return (
        <Wrapper>
            <ButtonBox>
                <button
                    type='button'
                    className={`button-el ${!isAdRankTrakView && 'active-el'}`}
                    style={{ borderRadius: '15px 15px 0 0' }}
                    onClick={() => handleChangeRankTrakView()}
                >
                    <div>일반</div>
                    <div className='info-box'>{recordDetails?.length ?? 0}</div>
                </button>
            </ButtonBox>
            <ButtonBox>
                <button
                    type='button'
                    className={`button-el ${isAdRankTrakView && 'active-el'}`}
                    style={{ borderRadius: '15px 15px 0 0' }}
                    onClick={() => handleChangeAdRankTrakView()}
                >
                    <div>광고</div>
                    <div className='info-box'>{adRecordDetails?.length ?? 0}</div>
                </button>
            </ButtonBox>
        </Wrapper>
    )
}