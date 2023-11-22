import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 20px 0;
        
        .wrapper{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;

            @media all and (max-width:992px){
                flex-direction: column;
            }
        }

        .wrapper > .selectedCount-box {
            @media all and (max-width:992px){
                width:100%;
            }
        }

        .wrapper > .selectedCount-box > .selectedCount{
            background: var(--grayButtonColor);
            border: none;
            color:#000;
            font-weight: 600;
            height: 40px;
            width: 100px;
            border-radius: 8px;
            transition: all .3s;

            &:hover{
                background: var(--defaultRedColor);
                color:#fff;
            }

            &:hover:before{
                content:'선택해제';
                font-weight: 600;
            }

            &:hover > span{
                display: none;
            }
        }

        .wrapper > .pagenation-control-box{
            @media all and (max-width:992px){
                display: flex;
                justify-content: flex-end;
                width:100%;
            }
        }
    `,
}