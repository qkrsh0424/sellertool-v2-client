import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import SingleBlockButton from '../../../modules/button/SingleBlockButton';
import CustomImage from '../../../modules/image/CustomImage';
import { ClickableWrapper } from '../../../../components/clickable-wrapper/v1';

const Container = styled.div`
    position: relative;
    display: flex;
    min-height: 1200px;
`;

const SidebarContainer = styled.div`
    background: ${props => props.sidebarColor};
    width: ${props => props.desktopWidth}px;
    transition: all .3s;
    margin-left: ${props => props.toggleOpen ? 0 : -props.desktopWidth}px;
    box-shadow: var(--defaultBoxShadow);
    overflow: auto;
    
    @media all and (max-width: 992px){
        width: ${props => props.mobileWidth}px;
        position:absolute;
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
    flex:1;
    overflow: hidden;
    /* min-height: 1200px; */
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

const Layout = ({
    sidebar,
    sidebarName,
    sidebarColor,
    headerName,
    desktopWidth,
    mobileWidth,
    children,

    ...props
}) => {
    const isDesktop = useMediaQuery(`(min-width: 992px)`);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (isDesktop) {
            setSidebarOpen(true);
            return;
        }
    }, [isDesktop])

    const handleOpenSidebar = useCallback(() => {
        setSidebarOpen(true);
    }, []);

    const handleCloseSidebar = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <>
            <Container>
                <SidebarContainer
                    desktopWidth={desktopWidth ?? 300}
                    mobileWidth={mobileWidth ?? 240}
                    toggleOpen={sidebarOpen}
                    sidebarColor={sidebarColor ?? '#3d4858'}
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
                    {sidebar({ handleCloseSidebar })}
                </SidebarContainer>
                <MainContainer>
                    <HeaerWrapper>
                        {sidebarOpen ?

                            <SingleBlockButton
                                type='button'
                                className='toggle-button'
                                onClick={() => handleCloseSidebar()}
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
                        {children}
                    </ContentWrapper>
                </MainContainer>
            </Container >
        </>
    );
}
export default Layout;