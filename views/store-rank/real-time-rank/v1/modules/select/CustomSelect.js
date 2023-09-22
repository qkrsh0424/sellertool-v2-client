import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Select = styled.select`
    width: ${props => props.width};
    height: ${props => props.height};
    padding:0 10px;
    padding-right: 30px;
    border: 1px solid #e1e1e1;
    border-radius: 0;
    box-sizing: border-box;
    font-size: 14px;
    -webkit-appearance: none;
    -moz-appearance: none; 
    -webkit-tap-highlight-color: #00000000;
    appearance: none;
    background:url('/images/icon/arrowDropDown_default_808080.svg') no-repeat 97% 50%/25px auto;
    background-color: #fff;
    color:#505050;
    cursor: pointer;
    
    &:focus{
        outline: none;
    }
    
    &::-ms-expand{
        display: none;
    }

    &:disabled{
        background: #f0f0f050;
        cursor:not-allowed;
    }
    
    @media all and (max-width:992px) {
        width: 100%;
    }
`;
// /**
//  * Version1 of CustomSelect
//  * @param {object} props
//  * @param {string} props.width
//  * @param {string} props.height
//  * @returns 
//  */
// export default function CustomSelect({
//     children,
//     width,
//     height,
//     ...props
// }) {

//     return (
//         <Select
//             width={width || '100%'}
//             height={height || '48px'}
//             {...props}
//         >
//             {children}
//         </Select>
//     );
// }

/**
 * Version2 of CustomSelect
 * Version1 을 forwardRef로 감싸서 처리함.
 * @param {object} props
 * @param {string} props.width
 * @param {string} props.height
 * @returns 
 */
const CustomSelect = React.forwardRef(({
    children,
    width,
    height,
    ...props
}, ref) => {
    return (
        <Select
            ref={ref}
            width={width || '100%'}
            height={height || '48px'}
            {...props}
        >
            {children}
        </Select>
    );
});

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;