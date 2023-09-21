import { Container, Wrapper } from "./styles/WorkspaceNameField.styled";

const WorkspaceNameFieldComponent = ({
    workspace,
}) => {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title-box'>
                        {workspace?.name}
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}
export default WorkspaceNameFieldComponent;