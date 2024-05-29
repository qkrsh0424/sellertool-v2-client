import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    width: 100%;
    height: 48px;

    input{
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
        font-size: 14px;
        background: transparent;
        transition: all.3s ease;
    }

    label{
        position: absolute;
        cursor: text;
        z-index: 2;
        top: 50%;
        transform: translate(0, -50%);
        left: 10px;
        font-size: 12px;
        font-weight: bold;
        background-color: #fff;
        padding: 0 10px;
        color: #999;
        transition: all.3s ease;
    }

    input:focus + label,
    input:valid + label
    {
        font-size: 11px;
        top: -2px;
    }

    input:focus + label{
        color: var(--mainColor);
    }

    input:focus{
        border-color: var(--mainColor);
        border: 1px solid var(--mainColor);
    }
`;

// export default function CustomInput({
//     ...props
// }) {
//     return (
//         <>
//             <Input
//                 {...props}
//             />
//         </>
//     );
// }

const CustomInput = React.forwardRef(({
    label,
    ...props
}, ref) => {
    return (
        <>
            <InputBox>
                <input
                    ref={ref}
                    {...props}
                />
                <label>{label}</label>
            </InputBox>
        </>
    );
})

CustomInput.displayName = 'CustomInput';

export default CustomInput;