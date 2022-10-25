import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NavbarComponent from '../navbar/Navbar.component';

const Container = styled.div`
    display: flex;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
    margin-top: 20px;
    padding-bottom: 150px;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;
const Block = styled.div`
    padding: 10px;
`;

const ContentWrapper = styled.div`
    flex:1;
`;

const Layout = (props) => {
    return (
        <>
            <Container>
                <NavbarComponent />
                <Block />
                <ContentWrapper>
                    {props.children}
                </ContentWrapper>
            </Container>
        </>
    );
}
export default Layout;