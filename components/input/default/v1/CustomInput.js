import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    height: 48px;
    padding: 0 10px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #e0e0e0;
    font-size: 14px;

    &:focus{
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
    ...props
}, ref) => {
    return (
        <>
            <Input
                ref={ref}
                {...props}
            />
        </>
    );
})

CustomInput.displayName = 'CustomInput';

export default CustomInput;