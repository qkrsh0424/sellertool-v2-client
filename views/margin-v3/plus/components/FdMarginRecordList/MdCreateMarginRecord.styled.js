import styled from 'styled-components';

export const St = {
    Container: styled.form`
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    `,
    FormWrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;

        .control-wrapper{
            display: flex;
            flex-direction: column;
            gap: 5px;
            label{
                font-size: 13px;
                font-weight: 700;
                color:#666666;
            }

            input{
                border-radius: 5px;
            }
        }
    `,
    ButtonWrapper: styled.div`
        display: flex;
        justify-content: flex-end;
        
        .button-el{
            width:100px;
            height: 40px;
            border:none;
            background: none;
            border-radius: 5px;

            &:hover{
                background: var(--mainColorOpacity50);
            }
        }
    `,
}