import { SearchInfoBox, Wrapper } from "../styles/SearchInfo.styled";

export function SearchInfoFieldView({
    recordList,
    rankSearchInfo
}) {
    let searched_count = rankSearchInfo?.searched_count ?? 0;
    let allowed_search_count = rankSearchInfo?.allowed_search_count ?? 0;
    let search_page_size = rankSearchInfo?.search_page_size ?? 0;

    return (
        <Wrapper>
            <div className='list-title'>
                <span>검색 내역 </span>
                <span>({recordList?.length ?? 0} 개)</span>
            </div>
            <SearchInfoBox>
                <div className='info-group'>
                    <div>
                        <span>랭킹 조회 횟수</span>
                    </div>
                    <div style={{ color: '#737784' }}>
                        <span>(</span>
                        <span className={(searched_count !== 0) && (searched_count >= allowed_search_count) ? 'red-text' : ''}>
                            {searched_count ?? 0}
                        </span>
                        <span> / </span>
                        <span>{allowed_search_count ?? 0}</span>
                        <span>)</span>
                    </div>
                </div>
                <div className='info-group'>
                    <div>
                        <span>랭킹 검색 순위</span>
                    </div>
                    <div style={{ color: '#737784' }}>
                        <span>(최대 {(search_page_size ?? 0) * 80}위)</span>
                    </div>
                </div>
            </SearchInfoBox>
        </Wrapper>
    )
}