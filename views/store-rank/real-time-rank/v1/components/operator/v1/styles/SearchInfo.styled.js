import styled from "styled-components";

export const Wrapper = styled.div`

`;

export const SearchTitleBox = styled.div`
    padding: 10px;
    border-bottom: 1px solid #a4aabd;

    .list-title {
        font-weight: 600;
        font-size: 14px;
        margin-right: 20px
    }
`;

export const SearchInfoBox = styled.div`
    color: #979ba5;
    font-weight: 600;
    font-size: 12px;
    padding: 0 10px;
    
    .sub-info-box {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px 0;
        gap: 15px;
    }

    .info-group {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .exclamation-icon {
        border: 1px solid #a3a8b2;
        border-radius: 10px;
    }

    .tooltip {
        
    }

    .tooltip-text {
        width: 300px;
    }

    .red-text {
        color: var(--defaultRedColor) !important;
    }
`;