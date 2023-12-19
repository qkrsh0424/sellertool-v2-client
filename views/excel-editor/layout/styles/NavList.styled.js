import styled from 'styled-components';

export const Container = styled.div`
    padding: 30px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const LinkItemWrapper = styled.div`

`;

export const LinkItem = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.active ? 'var(--mainColor)' : '#777777'};
    -webkit-tap-highlight-color: #00000000;
`;

export const SubLinkListWrapper = styled.div`
    margin-top: 15px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const SubLinkItem = styled.div`
    font-size: 16px;
    font-weight: ${props => props.active ? '600' : '500'};
    color: ${props => props.active ? 'var(--mainColorOpacity600)' : '#999999'};
    -webkit-tap-highlight-color: #00000000;
`;