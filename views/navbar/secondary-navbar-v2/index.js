import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomBlockButton from '../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomImage from '../../modules/image/CustomImage';
import { Container, MenuButton, SelectorBtnBox, Wrapper } from './index.styled';
import MenuListComponent from './menu/MenuList.component';
import { ClickableWrapper } from '../../../components/clickable-wrapper/v1';

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
            <ClickableWrapper
                onClickOutside={() => toggleMenuListOpen(false)}
            >
                <Container>
                    <Wrapper>
                    <MenuButton
                            type='button'
                            onClick={() => toggleMenuListOpen(!menuListOpen)}
                        >
                            <div className='wrapper'>
                                <div className='icon-figure'>
                                    <CustomImage
                                        src='/images/icon/menu_hamburg_808080.svg'
                                        alt="셀러툴 전체 서비스"
                                        loading='lazy'
                                    />
                                </div>
                                <div className='text'>전체 서비스</div>
                            </div>
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
            </ClickableWrapper>
        </>
    );
}
export default SecondaryNavbarMainComponent;