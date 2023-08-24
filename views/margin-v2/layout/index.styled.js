import styled from 'styled-components';

export const St = {
    Container:styled.div`
        display: flex;
        flex-direction: row;
        min-height: 1000px;
        @media all and (max-width:992px){
            flex-direction: column;
        }
    `,
    SidebarContainer: styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;
        width:110px;
        background: #fff;
        border-right: 1px solid #f0f0f0;
        padding: 20px;
        background-color: #f9f9f9;

        @media all and (max-width:992px){
            flex-direction: row;
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #f0f0f0;
        }

        .linkBtn{
            cursor: pointer;
            font-size: 16px;
            display: inline-block;
            border:1px solid #00000000;
            color:#444;
            font-weight: 600;
            letter-spacing: 3px;

            &:hover{
                color: var(--mainColor);    
            }
        }

        .linkBtn-active{
            color: var(--mainColor);
            font-weight: 800;
        }
    `,
    MainContainer: styled.div`
        flex:1;
        background: var(--defaultBackground);
    `,
}