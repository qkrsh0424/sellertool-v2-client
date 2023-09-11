import { CustomBoxImage } from "../../../../modules";
import { Wrapper } from "../styles/SubInfo.styled";

const NAVER_SHOPPING_RANKING_URL = "https://search.shopping.naver.com/search/all"

export default function SubInfoFieldView({
    record,
    onActionFoldAllOptions,
    onActionUnfoldAllOptions
}) {
    return (
        record &&
        <Wrapper>
            <div>
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
            <div className='sub-content'>
                <a href={`${NAVER_SHOPPING_RANKING_URL}?query=${record.keyword}`} target="_blank" rel="noopener">
                    <div className='content-box'>
                        <div>[</div>
                        <div style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{record.keyword}</div>
                        <div>]</div>
                        <div>검색</div>
                        <CustomBoxImage
                            src="/images/icon/n_shopping_icon.png"
                            size='18px'
                        />
                    </div>
                </a>
            </div>
        </Wrapper>
    )
}