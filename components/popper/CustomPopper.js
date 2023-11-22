import { Popper } from "@mui/material";
import styled from 'styled-components';

const ContentWrapper = styled.div`
    border: 1px solid #f0f0f0;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 10px;
`;

/**
 * 
 * @param {boolean} open
 * @param {string} id
 * @param {object} anchorEl
 * @param {string} placement [top-start, top, top-end, right-start, right, right-end, bottom-start, bottom, bottom-end, left-start, left, left-end] default: top
 * @param {string} disablePortal true: 부모 태그에 생성, false: 바디 필드에 생성 default: false
 * @param {object} element
 * @returns 
 */
export default function CustomPopper({
    open,
    anchorEl,
    placement = 'top',
    disablePortal = false,
    element,
    ...props
}) {
    return (
        <>
            <Popper
                open={open}
                anchorEl={anchorEl}
                disablePortal={disablePortal}
                placement={placement}
            >
                <ContentWrapper>
                    {element}
                </ContentWrapper>
            </Popper>
        </>
    );
}