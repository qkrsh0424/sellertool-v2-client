import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    padding-top: 40px;
`;

export const Wrapper = styled.div`
    background: #fff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow3);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TitleContainer = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

export const ProudctInfoContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .informationTableWrapper{
        > table{
            width: 100%;
            border-collapse: collapse;

            > tbody{
                > tr{
                    > td{
                        font-size: 14px;
                        font-weight: 500;
                        padding: 8px;
                        border-top: 1px solid #e0e0e0;
                        border-bottom: 1px solid #e0e0e0;
                    }

                    > td.left{
                        width: 100px;
                        background-color: #f0f0f0;
                    }

                    > td.right{

                    }
                }
            }
        }
    }

    .noticeWrapper{
        > ul{
            padding-left: 20px;
            margin: 0;
            line-height: 1.5;
            font-size: 13px;
            font-weight: 500;

            > li{
                list-style: square;
                
                ::marker{
                    color: red;
                }
            }
        }
    }

    .imageListWrapper{
        overflow: hidden;
    }

    .imageListWrapper.spread{
        height: auto;
    }

    .imageListWrapper.fold{
        height: 400px;
    }

    .informationBlur{
        position: absolute;
        right: 0;
        bottom: 48px;
        left: 0;
        z-index: 1000;
        height: 80px;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0.8));
    }

    .spreadButton{
        border: 1px solid #000;
        color: #000;
    }

    .lineBreaker{
        height: 1px;
        width: 100%;
        background-color: #f0f0f0;
    }
`;