import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import SingleBlockButton from '../../modules/button/SingleBlockButton';
import CustomImage from '../../modules/image/CustomImage';
import NavListComponent from './NavList.component';
import { ClickableWrapper } from '../../../components/clickable-wrapper/v1';

const Container = styled.div`
    position: relative;
`;

const SidebarContainer = styled.div`
    position: absolute;
    background: ${props => props.sidebarColor};
    width: ${props => props.desktopWidth}px;
    transition: all .3s;
    margin-left: ${props => props.toggleOpen ? 0 : -props.desktopWidth}px;
    overflow: auto;
    height: 100%;
    
    @media all and (max-width: 992px){
        width: ${props => props.mobileWidth}px;
        left: 0;
        top:0;
        z-index: 111;
        height: 100%;
    }

    .sidebar-header{
        height: 54px;
        background: var(--contentHeadBackground);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;

        .header-name{
            font-size: 18px;
            font-weight: 500;
        }

        .icon-button{
            margin:0;
            padding:0;
            width:30px;
            height: 30px;
            background:none;
            border: none;
        }
    }
`;
const MainContainer = styled.div`
    background: var(--defaultBackground);
    min-height: 1200px;
    padding-bottom: 300px;
    transition: all .3s;
    padding-left: ${props => props.toggleOpen ? props.desktopWidth : 0}px;

    @media all and (max-width: 992px){
        padding-left: 0px;
    }
`;

const HeaerWrapper = styled.div`
    height: 54px;
    display: flex;
    align-items: center;
    background: white;
    border-bottom: 1px solid #f0f0f0;
    .toggle-button{
        width:30px;
        height: 100%;
        margin:0;
        padding:0;
        margin-right: 20px;
        border:none;
        background: #f6f6f6;

        .icon-figure{
            width: 20px;
            height: 20px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    .header-name{
        font-size: 24px;
        font-weight: 700;

        @media all and (max-width: 992px){
            font-size: 20px;
        }
    }
`;

const ContentWrapper = styled.div`
`;

/**
 * linkList = [
 *      {
 *          pathname:'',
 *          name:'',
 *          subLinkList: [
 *              {
 *                  pathname:'',
 *                  name:'',
 *              }
 *          ]
 *      }
 * ]
 */
const Layout = ({
    sidebarName,
    sidebarColor,
    headerName,
    desktopWidth,
    mobileWidth,
    linkList,

    ...props
}) => {
    const isMobile = useMediaQuery(`(max-width: 992px)`);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
            return;
        }
    }, [isMobile])

    const handleOpenSidebar = useCallback(() => {
        setSidebarOpen(true);
    }, []);

    const handleCloseSidebar = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    const handleClickLink = useCallback(() => {
        if (isMobile) {
            handleCloseSidebar();
        }
    }, [isMobile])

    return (
        <>
            <Container>
                <SidebarContainer
                    desktopWidth={desktopWidth ?? 210}
                    mobileWidth={mobileWidth ?? 210}
                    toggleOpen={sidebarOpen}
                    sidebarColor={sidebarColor ?? '#3d4858'}
                >
                    <ClickableWrapper
                        isActive={(isMobile && sidebarOpen) ? true : false}
                        onClickOutside={() => handleClickLink()}
                    >
                        <div className='sidebar-header'>
                            {sidebarName ?
                                <div className='header-name'>{sidebarName}</div>
                                :
                                <div></div>
                            }
                            <div>
                                <SingleBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => handleCloseSidebar()}
                                >
                                    <CustomImage
                                        src='/images/icon/close_default_959eae.svg'
                                    />
                                </SingleBlockButton>
                            </div>
                        </div>
                        <NavListComponent
                            onActionClickLink={handleClickLink}
                        />
                    </ClickableWrapper>
                </SidebarContainer>
                <MainContainer
                    desktopWidth={desktopWidth ?? 210}
                    mobileWidth={mobileWidth ?? 210}
                    toggleOpen={sidebarOpen}
                >
                    <HeaerWrapper>
                        {sidebarOpen ?
                            <SingleBlockButton
                                type='button'
                                className='toggle-button'
                                onClick={(e) => { handleCloseSidebar(); }}
                            >
                                <div className='icon-figure'>
                                    <CustomImage
                                        src='/images/icon/arrowLeft_chevron_808080.svg'
                                    />
                                </div>
                            </SingleBlockButton>
                            :
                            <SingleBlockButton
                                type='button'
                                className='toggle-button'
                                onClick={() => handleOpenSidebar()}
                            >
                                <div className='icon-figure'>
                                    <CustomImage
                                        src='/images/icon/arrowRight_chevron_808080.svg'
                                    />
                                </div>
                            </SingleBlockButton>
                        }
                        <div className='header-name'>
                            {headerName}
                        </div>
                    </HeaerWrapper>
                    <ContentWrapper>
                        {props.children}
                    </ContentWrapper>
                </MainContainer>
            </Container >
        </>
    );
}
export default Layout;