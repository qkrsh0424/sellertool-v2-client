import styled from 'styled-components';

export const St = {
    Container:styled.div`
        display: flex;
        flex-direction: row;
        min-height: 1000px;
        background: var(--defaultBackground);
        @media all and (max-width:992px){
            flex-direction: column;
        }
    `,
    SidebarContainer: styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;
        width:120px;
        background: #fff;
        border-right: 1px solid #f0f0f0;
        padding: 10px;
        /* background-color: #f9f9f9; */

        @media all and (max-width:992px){
            flex-direction: row;
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #f0f0f0;
        }

        .linkBtn{
            cursor: pointer;
            font-size: 18px;
            display: inline-block;
            border:1px solid #00000000;
            color:#444;
            font-weight: 600;
            letter-spacing: 3px;
            text-align: center;
            width: 100%;
            padding: 5px 0;
            border-radius: 5px;
            transition: all .3s;

            &:hover{
                background: var(--mainColorOpacity100);
            }
        }

        .linkBtn-active{
            /* color: var(--mainColor);
            font-weight: 800;
            border: 1px solid var(--mainColor); */
            background: var(--mainColor);
            color:#fff;

            &:hover{
                background: var(--mainColor);
            }
            
        }
    `,
    MainContainer: styled.div`
        flex:1;
        padding-bottom: 300px;
    `,
}