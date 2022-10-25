import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NotAllowedComponent from '../../modules/not-allowed/NotAllowedComponent';
import Layout from '../layout/Layout';
import HeadComponent from './head/Head.component';
import InformationComponent from './information/Information.component';

const Container = styled.div`
    overflow: hidden;
    background-color: var(--defaultBackground);
`;

const ProfileAccountMainComponent = (props) => {
    const userRedux = useSelector(state => state.userRedux);

    // if (userRedux.isLoading === true) {
    //     return null;
    // }

    // if (userRedux.isLoading === false && (!userRedux.userInfo)) {
    //     return (
    //         <NotAllowedComponent></NotAllowedComponent>
    //     );
    // }

    return (
        <>
            <Container>
                <HeadComponent></HeadComponent>
                <Layout>
                    <InformationComponent />
                </Layout>
            </Container>
        </>
    );
}
export default ProfileAccountMainComponent;