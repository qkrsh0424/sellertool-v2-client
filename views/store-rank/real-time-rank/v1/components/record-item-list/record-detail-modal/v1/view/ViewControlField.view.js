import { ButtonBox, Wrapper } from "../styles/ViewControl.styled";

export default function ViewControlFieldView({
    isAdRankView,
    recordDetails,
    adRecordDetails,
    onChangeAdRankView,
    onChangeRankView,
    onActionFoldAllOptions,
    onActionUnfoldAllOptions
}) {
    return (
        <Wrapper>
            <div className='control-btn-box'>
                <button
                    className='button-el'
                    style={{ marginRight: '5px' }}
                    onClick={() => onActionFoldAllOptions()}
                >
                    전체 펼치기
                </button>
                <button
                    className='button-el'
                    onClick={() => onActionUnfoldAllOptions()}
                >
                    전체 접기
                </button>
            </div>
            <div className='tab-container'>
                <ButtonBox>
                    <button
                        type='button'
                        className={`button-el ${!isAdRankView && 'active-el'}`}
                        style={{ borderRadius: '15px 15px 0 0' }}
                        onClick={() => onChangeRankView()}
                    >
                        <div>일반</div>
                        <div className='info-box'>{recordDetails?.length ?? 0}</div>
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
                        <div className='info-box'>{adRecordDetails?.length ?? 0}</div>
                    </button>
                </ButtonBox>
            </div>
        </Wrapper>
    )
}