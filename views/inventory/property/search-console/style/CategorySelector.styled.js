import styled from 'styled-components';

export const Box = styled.div`
    width:250px;
    
    &:first-child{
        margin-right: 20px;
        @media all and (max-width: 992px){
            margin-right: 0;
            margin-bottom: 20px;
        }
    }

    @media all and (max-width: 992px){
        width:100%;
    }

    .label{
        font-size: 13px;
        color: #404040;
        margin-bottom: 5px;
    }

    .select-button-item{
        padding:0;
        margin:0;
        height: 40px;
        border-radius: 5px;
        background: var(--defaultGrayColor);
        border:1px solid #f0f0f0;
        font-size: 14px;

        &:hover{
            transition: all .3s;
            background: white;
            
        }
    }
`;
