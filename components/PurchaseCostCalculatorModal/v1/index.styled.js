import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 0 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        gap:20px;  

        @media all and (max-width:1280px){
            flex-direction: column;
            padding: 10px;
        }
    `,
    ModuleListFieldWrapper: styled.div`
        width:280px;
        @media all and (max-width:1280px){
            width:100%;
        }
    `,
    InputFieldWrapper: styled.div`
        width:100%;
        flex:1;
        display: flex;
        flex-direction: column;
        gap: 20px;
    `,
    ResultFieldWrapper: styled.div`
        width:100%;
        flex:1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .result-input{
            border: 1.5px solid var(--defaultBlueColor);
            font-weight: 600;

            &::placeholder{
                font-size: 12px;
            }
        }
    `,
}
