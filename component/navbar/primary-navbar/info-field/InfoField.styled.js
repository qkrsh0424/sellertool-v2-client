import styled from 'styled-components';

const Container = styled.div`
    display: flex;

    .rt-el{
        padding:10px;
        border-radius:5px;

        font-size:14px;
        font-weight: 600;
        color:white;

        cursor: pointer;

        transition: all .3s;

        &:hover{
            box-shadow: 
                #2C73D220 0px 2px 1px -1px, 
                #2C73D220 0px 1px 1px 0px, 
                #2C73D220 3px 3px 3px 0px;
        }

        &:active{
            background: #609FFF;
        }
    }
`;

export {
    Container
}