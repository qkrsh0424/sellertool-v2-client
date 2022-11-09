import styled from 'styled-components';

const Container = styled.div`
    flex:1;
`;

const HeadFieldWrapper = styled.div`
    .head-title{
        font-size: 21px;
        font-weight: 500;
    }
`;

const BodyFieldWrapper = styled.div`
    margin-top: 10px;

    @media all and (max-width: 992px){
        flex-direction: column;
    }

    .thumbnail-box{
        width: 30%;
        border-radius: 5px;
        overflow: hidden;
        @media all and (max-width: 992px){
            width: 50%;
        }
    }

    .default-content-box{
        flex:1;
        margin-left: 10px;

        @media all and (max-width: 992px){
            margin-left: 0;
        }
    }

    .detail-content-box{

    }

    .flex-wrapper{
        display: flex;

        @media all and (max-width: 992px){
            flex-direction: column;
            margin: 0;
        }
    }

    .info-box{
        flex:1;
        border-bottom: 1px solid #e0e0e0;
        padding:10px 0;

        @media all and (max-width: 992px){
            margin: 0;
        }
    }

    .info-box .title{
        font-size: 15px;
        font-weight: 500;
    }

    .info-box .content{
        margin-top: 5px;
        font-size: 13px;
    }
`;

export {
    Container,
    HeadFieldWrapper,
    BodyFieldWrapper
}