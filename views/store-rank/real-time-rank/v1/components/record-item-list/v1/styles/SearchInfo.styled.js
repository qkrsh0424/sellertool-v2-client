import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const SearchTitleBox = styled.div`
    padding: 10px;
    border-bottom: 1px solid #a4aabd;

    .list-title {
        font-weight: 600;
        font-size: 1.2rem;
        margin-right: 20px
    }
`;

export const SearchInfoBox = styled.div`
    color: #979ba5;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 15px;
    padding: 0 10px;
    
    .sub-info-box {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        padding: 10px 0;
    }

    .info-group {
        padding: 3px 0;
        min-width: 150px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .sub-info {
        font-size: 12px;
        color: var(--mainColor);
    }

    .red-text {
        color: var(--defaultRedColor) !important;
    }
`;