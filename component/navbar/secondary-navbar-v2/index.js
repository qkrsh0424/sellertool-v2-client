import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import SingleBlockButton from '../../modules/button/SingleBlockButton';
import { Container, SelectorBtn, SelectorBtnBox, Wrapper } from './index.styled';

const SecondaryNavbarMainComponent = (props) => {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const __handle = {
        action: {
            routeToSelect: () => {
                router.push({
                    pathname: '/workspace/select'
                })
            }
        }
    }
    return (
        <>
            {workspaceRedux.workspaceInfo &&
                <Container>
                    <Wrapper>
                        <SelectorBtnBox>
                            <SingleBlockButton
                                type='button'
                                className='button-el'
                                onClick={() => __handle.action.routeToSelect()}
                            >
                                {workspaceRedux.workspaceInfo.name}
                            </SingleBlockButton>
                        </SelectorBtnBox>
                    </Wrapper>
                </Container>
            }

        </>
    );
}
export default SecondaryNavbarMainComponent;