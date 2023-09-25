import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import { Container, Wrapper } from "./styles/WorkspaceNameField.styled";

const customDateUtils = CustomDateUtils();

const WorkspaceNameFieldComponent = ({
    workspace,
}) => {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title-box'>
                        <div className='title'>{workspace?.name}</div>
                        {workspace?.subscriptionPlan === 'NONE' && <div className='workspaceTag disabledWorkspace-tag'>구독 필요</div>}
                        {workspace?.subscriptionPlan === 'PRIVATE' && <div className='workspaceTag privateWorkspace-tag'>PRIVATE</div>}
                        {workspace?.subscriptionPlan === 'PUBLIC' && <div className='workspaceTag publicWorkspace-tag'>PUBLIC</div>}
                        {workspace?.subscriptionPlan === 'PLUS' && <div className='workspaceTag plusWorkspace-tag'>PLUS+</div>}
                    </div>
                    {!['NONE', 'PRIVATE'].includes(workspace?.subscriptionPlan) &&
                        <div className='expiryDate'>구독 만료 일시 : ~ {customDateUtils.dateToYYYYMMDDhhmmss(new Date(workspace?.subscriptionExpiryDate))}</div>
                    }
                </Wrapper>
            </Container>
        </>
    );
}
export default WorkspaceNameFieldComponent;