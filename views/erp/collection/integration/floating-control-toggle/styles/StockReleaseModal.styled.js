import styled from 'styled-components';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';

export const Container = styled.div`
    background: var(--defaultBackground);
`;

export const CancelButton = styled(CustomBlockButton)`
    background: var(--defaultModalCloseColor);
    color: #fff;
    border: none;
    font-size: 18px;
    flex:1;
`;

export const SubmitButton = styled(CustomBlockButton)`
    background: var(--mainColor);
    color: #fff;
    border: none;
    font-size: 18px;
    width: 60%;
`;

export const InputBox = styled.div`
    padding: 40px 20px;

    .input-item{
        border-radius: 5px;
    }
`;