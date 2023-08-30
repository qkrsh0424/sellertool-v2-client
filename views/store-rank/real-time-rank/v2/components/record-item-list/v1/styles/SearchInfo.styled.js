import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #a4aabd;
    padding: 20px 10px;
    
    @media screen and (max-width: 992px) {
        flex-direction: column;
    }
    
    .list-title {
        font-weight: 600;
        font-size: 1.2rem;
        margin-right: 20px
    }
`;

export const SearchInfoBox = styled.div`
    display: flex;
    align-items: flex-end;
    color: #979ba5;
    font-weight: 600;
    font-size: 14px;
    flex-wrap: wrap;

    .info-group {
        padding: 3px 5px;
        min-width: 150px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .red-text {
        color: var(--defaultRedColor) !important;
    }
`;