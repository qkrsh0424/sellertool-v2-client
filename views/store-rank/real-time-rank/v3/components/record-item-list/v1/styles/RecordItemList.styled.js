import styled from "styled-components";

export const Container = styled.div`
    padding: 20px 20px 0 20px;

    @media all and (max-width:992px){
        padding: 20px 10px 0 10px;
    }

    .list-title {
        padding: 20px 10px;
        font-weight: 600;
        font-size: 1.2rem;
    }
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 15px;

    border-top: 1px solid #a4aabd;
    padding: 20px 5px;

    @media screen and (max-width: 576px){
        display: block;
    }
`;

export const RecordItemBox = styled.div`
    position: relative;
    
    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 576px){
        width: 100%;
        margin-bottom: 15px;
    }
`;

export const RecordInfo = styled.div`
    position: relative;
    background-color: white;
    border-radius: 20px;
    box-shadow: var(--defaultBoxShadow);
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid #efefef;
    overflow: hidden;

    ${RecordItemBox}:hover & {
        border: 1px solid var(--mainColor);
    }

    ${props => props.isSameRecord &&
        'border: 1px solid var(--defaultRedColor)'
    };

    .content-box {
        display: flex;
        align-items: center;
        overflow: hidden;
        overflow-x: scroll;
    }

    .sub-info-box {
        display: flex;
        gap: 5px;
        position: absolute;
        bottom: 10px;
        right: 15px;
        margin: 2px;

        .item-el {
            color: #666;
            font-weight: 500;
            font-size: 14px;
            background-color: var(--defaultGrayColor);
            border: 1px solid var(--defaultGrayColor);
            border-radius: 5px;
            padding: 5px 7px;
        }
    }
`;

export const ControlBox = styled.div`
    opacity: 0;

    ${RecordItemBox}:hover & {
        opacity: 1;
    };

    .delete-box {
        position: absolute;
        right: -3px;
        top: -8px;
        z-index: 10;
    }

    .delete-box .button-item {
        border-radius: 50%;
        padding: 2px;
        border: 1px solid var(--defaultRedColor);
        background-color: #fff;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background-color: #ffe0e0;
        }
    }
`;

export const ContentGroup = styled.div`
    display: flex;
    gap: 5px;
    padding: 5px 0px;
    color: #7f7f7f;
    white-space: break-spaces;
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */
    
    @media screen and (max-width: 1280px) {
        overflow: hidden;
        white-space: nowrap;
    }
`;

export const ContentValue = styled.div`
    display: inline;
    font-weight: 600;
    color: #505050;
    font-size: 1.1rem;
`;