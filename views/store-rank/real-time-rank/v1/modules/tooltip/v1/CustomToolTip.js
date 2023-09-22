import React from 'react';
import styled from 'styled-components';

const TooltipBox = styled.div`
    position: relative;
    cursor: pointer;
`;

const TooltipText = styled.div`
    visibility: hidden;
    background-color: #fff;
    border: 1px solid #cecece;
    color: #787b83;
    text-align: center;
    border-radius: 5px;
    padding: 10px;

    position: absolute;
    z-index: 1;

    ${TooltipBox}:hover &{
        visibility: visible;
    }
`;

export function CustomToolTip({
    tooltipBox,
    tooltipText,
    ...props
}) {
    return (
        <TooltipBox className='tooptip-box' {...props}>
            <div>
                {tooltipBox ?? (
                    < CustomBoxImage
                        src='/images/icon/exclamation_default_a3a8b2.svg'
                    />
                )}
            </div>
            <TooltipText className='tooltip-text'>
                {tooltipText}
            </TooltipText>
        </TooltipBox>
    )
}
