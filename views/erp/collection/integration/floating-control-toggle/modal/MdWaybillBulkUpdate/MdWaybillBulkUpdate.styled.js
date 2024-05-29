import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 20px;
    .button-item{
        border-radius: 5px;
        &:last-child{
            margin-top: 10px;
        }
    }

    .sample-download-button{
        color: #606060;
    }

    .upload-button{
        font-weight: 700;
        border: 1px solid var(--mainColor);
        color:white;
        background: var(--mainColor);
    }
`;