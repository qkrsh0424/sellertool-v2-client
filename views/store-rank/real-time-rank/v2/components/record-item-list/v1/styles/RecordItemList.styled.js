import styled from "styled-components";

export const Container = styled.div`
    padding: 20px 20px 0 20px;

    @media all and (max-width:992px){
        padding: 20px 10px 0 10px;
    }

    .list-title {
        padding: 20px 10px;
        font-weight: 600;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    border-top: 1px solid #a4aabd;
    padding: 20px 5px;
`;

export const RecordItemBox = styled.div`
    position: relative;
    margin-right: 30px;
    margin-bottom: 30px;
`;

export const RecordInfo = styled.div`
    width: 500px;
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
    padding: 5px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #444;
    width: 100%;
`;

export const ContentValue = styled.div`
    display: inline;
    font-weight: 600;
    color: #000;
    font-size: 1.1rem;
`;