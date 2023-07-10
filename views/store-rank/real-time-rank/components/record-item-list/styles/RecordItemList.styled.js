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
    width: 400px;
    padding: 20px 30px;
    background-color: white;
    margin-right: 30px;
    margin-bottom: 30px;
    border-radius: 20px;
    box-shadow: var(--defaultBoxShadow);
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid #fff;

    &:hover {
        border: 1px solid var(--mainColor);
    }
`;

export const LabelGroup = styled.div`
    padding: 5px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;