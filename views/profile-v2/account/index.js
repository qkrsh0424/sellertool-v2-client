import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NotAllowedComponent from '../../modules/not-allowed/NotAllowedComponent';
import Layout from '../layout/Layout';
import HeadComponent from './head/Head.component';
import InformationComponent from './information/Information.component';
import MarketingComponent from './marketing/Marketing.component';

const Container = styled.div`
    overflow: hidden;
    background-color: var(--defaultBackground);
    min-height: 800px;
`;

const ProfileAccountMainComponent = (props) => {

    return (
        <>
            <Container>
                <HeadComponent></HeadComponent>
                <Layout>
                    <InformationComponent />
                    <MarketingComponent />
                </Layout>
            </Container>
        </>
    );
}
export default ProfileAccountMainComponent;