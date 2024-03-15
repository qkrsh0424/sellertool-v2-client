import styled from 'styled-components';

export const Container = styled.div`

`;

export const SliderNumbering = styled.div`
    user-select:none;
    position: absolute;
    bottom:10px;
    right:10px;
    background:#40404080;
    width:80px;
    padding: 17px 0;
    color:#fff;
    text-align:center;
    border-radius:10px;
    letter-spacing:2px;
    font-size:14px;
    font-weight:600;
    transition: border-radius .3s;

    &:hover{
        border-radius:0;
    }

    @media all and (max-width:992px){
        bottom:10px;
        right:20px;
        width:55px;
        padding: 12px 0;
        font-size:11px;
    }
`;

export const SliderPrevArrow = styled.div`
    -webkit-tap-highlight-color: #00000000;
    display: block;
    width:40px;
    height:40px;
    background:#40404080;
    position:absolute;
    top:50%;
    left: 0;
    transform: translate(0, -50%);
    padding:0;
    margin:0;
    cursor: pointer;
    transition: border-radius .3s;

    &:hover{
        background:#404040;
        border-radius: 50%;

        .icon{
            opacity: 1;
        }
    }

    @media all and (max-width:992px){
        left: 20px;
        width:28px;
        height:28px;
    }

    .icon{
        width:inherit;
        height: inherit;
        opacity: 0.8;
    }
`;

export const SliderNextArrow = styled.div`
    -webkit-tap-highlight-color: #00000000;
    display: block;
    width:40px;
    height:40px;
    background:#40404080;
    position:absolute;
    top:50%;
    right: 0;
    transform: translate(0, -50%);
    padding:0;
    margin:0;
    cursor: pointer;
    transition: border-radius .3s;

    &:hover{
        background:#404040;
        border-radius: 50%;

        .icon{
            opacity: 1;
        }
    }

    @media all and (max-width:992px){
        right: 20px;
        width:28px;
        height:28px;
    }

    .icon{
        width:inherit;
        height: inherit;
        opacity: 0.8;
    }
`;

export const PopupContainer = styled.div`
    width: 450px;
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 999;

    @media all and (max-width:550px){
        bottom: 0;
        right: 0;
        width: 100%;
    }

    > .wrapper{
        border-radius: 20px;
        overflow: hidden;
        box-shadow: var(--defaultBoxShadow2);    

        > .wrapper__popupImageBox{
            width: 100%;
        }
    
        > .wrapper__footerButtonGroup{
            border-top: 1px solid #444;
            display: flex;
            flex-direction: row;
            align-items: center;
    
            > button{
                flex: 1;
                border:none;
                font-weight: 700;
                background: var(--defaultBlackColor);
                color: #fff;
                font-size: 16px;
    
                &:first-child{
                    border-right: 1px solid #444;
                }
            }
        }
    }

    .slider-wrapper{
        position:relative;
        box-sizing: border-box;
        overflow: hidden;
        line-height: 0;

        /* &:hover{
            ${SliderPrevArrow}, ${SliderNextArrow}{
                display: block;
            }
        } */
        
        @media all and (max-width:992px){
            width: 100%;
            height: auto;
            border-radius: 0;
        }
    }

    .slick-dots{
        bottom:20px;
    }

    .slick-dots li.slick-active button:before {
        color:#fff !important;
        opacity: 1;
    }

    .slick-dots li button:before {
        color:#fff !important;
        opacity: 0.5;
        font-size: 12px;
    }

    .slick-prev{
        z-index: 10;
        left: 10px;
    }
    
    .slick-next{
        z-index: 10;
        right:10px;
    }

`;

export const PopupImage = styled.img`
    width: 100%;
    height: 100%;
`;