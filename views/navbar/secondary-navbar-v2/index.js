import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomBlockButton from '../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomImage from '../../modules/image/CustomImage';
import { Container, MenuButton, SelectorBtnBox, Wrapper } from './index.styled';
import MenuListComponent from './menu/MenuList.component';

const SecondaryNavbarMainComponent = (props) => {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [menuListOpen, setMenuListOpen] = useState(false);

    const handleRouteToSelect = () => {
        router.push({
            pathname: '/workspace/select'
        })
    }

    const toggleMenuListOpen = (open) => {
        setMenuListOpen(open);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <MenuButton
                        type='button'
                        onClick={() => toggleMenuListOpen(!menuListOpen)}
                    >
                        <div style={{ width: 24, height: 24, marginRight: '10px' }}><CustomImage src='/images/icon/menu_hamburg_808080.svg' priority={true} loading='eager' /></div>
                        <div style={{ flex: 1 }}>전체 서비스</div>
                    </MenuButton>
                    {workspaceRedux?.workspaceInfo &&
                        <SelectorBtnBox>
                            <CustomBlockButton
                                type='button'
                                className='button-el'
                                onClick={() => handleRouteToSelect()}
                            >
                                {workspaceRedux.workspaceInfo.name}
                            </CustomBlockButton>
                        </SelectorBtnBox>
                    }
                </Wrapper>
                {menuListOpen &&
                    <MenuListComponent
                        onCloseMenuList={() => toggleMenuListOpen(false)}
                    />
                }
            </Container>
        </>
    );
}
export default SecondaryNavbarMainComponent;