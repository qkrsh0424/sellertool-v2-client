import styled from 'styled-components';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';

export const Container = styled.div`
    padding: 0 20px;
`;

export const Wrapper = styled.div`
    background: var(--defaultPurpleColorOpacity200);
    padding: 20px;
    border-radius: 15px;

    .flexBox{
        display: flex;
        gap: 10px;
        align-items: center;
    }
`;

export const DescriptionText = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

export const EventButton = styled(CustomBlockButton)`
    width: auto;
    height: auto;
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid #00000000;
    font-weight: 700;

    &.confirm{
        border: 1px solid #000000;
    }

    &.delete{
        font-weight: 500;
    }
`;