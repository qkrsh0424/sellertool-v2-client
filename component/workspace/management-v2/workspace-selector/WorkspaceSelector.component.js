import { useRouter } from 'next/router';
import { Container, SelectorBtnBox, Wrapper } from './styles/WorkspaceSelector.styled';
import SingleBlockButton from '../../../modules/button/SingleBlockButton';

const WorkspaceSelectorComponent = (props) => {
    const router = useRouter();

    const __handle = {
        action: {
            routeToSelect: () => {
                router.replace({
                    pathname: '/workspace/select'
                })
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <SelectorBtnBox>
                        <SingleBlockButton
                            type='button'
                            className='button-el'
                            onClick={() => __handle.action.routeToSelect()}
                        >
                            워크스페이스 선택
                        </SingleBlockButton>
                    </SelectorBtnBox>
                </Wrapper>
            </Container>
        </>
    );
}
export default WorkspaceSelectorComponent;