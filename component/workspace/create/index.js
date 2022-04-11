import styled from 'styled-components';
import PageContentComponent from './page-content/PageContent.component';
import PageHeaderComponent from './page-header/PageHeader.component';

const Container = styled.div`
    margin-bottom: 100px;
`;

const WorkspaceCreateMainComponent = (props) => {
    return (
        <>
            <Container>
                <PageHeaderComponent></PageHeaderComponent>
                <PageContentComponent></PageContentComponent>
            </Container>
        </>
    );
}
export default WorkspaceCreateMainComponent;