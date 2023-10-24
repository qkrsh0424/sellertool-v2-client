import { CustomBoxImage } from "../../../../../modules";
import { CustomBlockButton } from "../../../../../modules/buttons/block-button/v1";
import { Wrapper } from "../styles/DetailControl.styled";

export default function DetailControlFieldView({
    isPending,
    traceableRecordDetails,
    traceableAdRecordDetails,
    onActionFoldAllOptions,
    onActionUnfoldAllOptions,
    onOpenDetailTrendModal
}) {
    return (
        <Wrapper>
            <div className='button-box'>
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

            <div className='rank-trend-box'>
                {isPending ?
                    <CustomBlockButton
                        type='button'
                        className='open-button disabled-btn'
                    >
                        -
                    </CustomBlockButton>
                    :
                    <CustomBlockButton
                        type='button'
                        className='open-button'
                        onClick={(e) => onOpenDetailTrendModal(e)}
                    >
                        <span>랭킹 추세 ( {(traceableRecordDetails?.length || 0) + (traceableAdRecordDetails?.length || 0)} ) </span>
                        <div>
                            <CustomBoxImage
                                src='/images/icon/monitoring_default_344b98.svg'
                                size='25px'
                            />
                        </div>
                    </CustomBlockButton>
                }
            </div>
        </Wrapper>
    )
}