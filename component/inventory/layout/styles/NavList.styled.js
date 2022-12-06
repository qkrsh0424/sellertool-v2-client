import styled from 'styled-components';

export const Container = styled.div`
    padding: 30px 20px;
`;

export const LinkItem = styled.div`
    padding: 5px;
    font-size: 18px;
    color: ${props => props.active ? 'var(--mainColor)' : '#999999'};
    -webkit-tap-highlight-color: #00000000;
`;