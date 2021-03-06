import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { numberWithCommas } from "../../../utils/numberFormatUtils";

const Container = styled.div`
    overflow: hidden;
    padding: 0 30px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

const TitleBox = styled.h3`
    padding: 5px;
    font-size: 17px;
`;

const NoticeTopBox = styled.div`
    padding: 5px;
    font-size: 13px;
    color: #444;
    word-break: keep-all;

    @media all and (max-width:992px){
        font-size: 11px;
    }
`;

const TableContainer = styled.div`
    padding: 5px;
`;

const TableBox = styled.div`
    overflow: auto;
    /* border: 1px solid #f1f1f1; */
    min-height: 300px;
    max-height: 700px;
    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
    }

    table thead{
    }

    table thead th {
        padding:5px;
        background:#309FFF;
        font-size: 15px;
        font-weight: 600;
        color: white;
        position: sticky;
        top:0;
    }

    table tbody tr:first-child{
        border-bottom: 1px solid #f1f1f1;
    }

    table tbody tr{
        &:hover{
            background:#309FFF30;
        }
    }

    table tbody {
        border-bottom: 1px solid #e1e1e1;
        
    }

    table tbody td{
        padding: 3px;
        &:hover{
            background:#309FFF40;
        }
    }

    .thumb-img{
        width: 75%;
    }

    @media only screen and (max-width:992px){
        min-height: 200px;
        max-height: 400px;

        table thead th {
            padding:5px;
            background:#309FFF;
            font-size: 13px;
            font-weight: 600;
            color: white;
            position: sticky;
            top:0;
        }
    }
`;

const TableCol100 = styled.col`
    width: 100px;
    
`;

const TableCol120 = styled.col`
    width: 120px;
    @media only screen and (max-width:992px){
        width: 80px;
    }
`;

const TableCol200 = styled.col`
    width: 200px;
`;

const TableCol300 = styled.col`
    width: 300px;
`;

const TableExposureTag = styled.span`
    padding: 5px 8px;

    background: ${props => props.type === '??????' ? '#2ac2db' : props.type === '????????????' ? '#ed985b' : '#929b9d'};
    border-radius: 5px;

    font-size: 14px;
    font-weight: 600;
    color: white;

    @media only screen and (max-width:992px){
        font-size: 12px;
    }
`;

const TableItem = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #444;
    word-break: keep-all;

    .accent-span{
        color: #ff7171;
    }

    @media only screen and (max-width:992px){
        font-size: 12px;
    }
`;

const SearchResultNoneBox = styled.div`
    padding: 100px 5px;
    text-align: center;

    font-size: 14px;
    font-weight: 600;
    color: #444;

    @media only screen and (max-width:992px){
        padding: 70px 5px;

        font-size: 12px;
    }
`;

const getNaverShoppingUrl = (query, pageIndex) => {
    let url = `https://search.shopping.naver.com/search/all?frm=NVSCTAB&origQuery=${query}&pagingIndex=${pageIndex}&pagingSize=40&productSet=total&query=${query}&sort=rel&viewType=list`;
    return url;
}

const ResultDashboardComponent = (props) => {
    console.log(props.rankDataState)
    return (
        <>
            <Container>
                <TitleBox>????????????</TitleBox>
                {!props.rankDataState &&
                    <SearchResultNoneBox>
                        ?????? ????????? ????????? ??????????????? ????
                    </SearchResultNoneBox>
                }
                {(props.rankDataState?.adList.length === 0 && props.rankDataState?.commonList.length === 0) &&
                    <SearchResultNoneBox>
                        ?????? ????????? ?????? ???????????? ????
                    </SearchResultNoneBox>
                }
                {(props.rankDataState?.adList.length > 0 || props.rankDataState?.commonList.length > 0) &&
                    <TableContainer>
                        <TableBox>
                            <table>
                                <colgroup>
                                    <TableCol120 />
                                    <TableCol100 />
                                    <TableCol100 />
                                    <TableCol200 />
                                    <TableCol200 />
                                    <TableCol300 />
                                    <TableCol200 />
                                    <TableCol200 />
                                    <TableCol200 />
                                    <TableCol120 />
                                    <TableCol300 />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>?????????</th>
                                        <th>????????????</th>
                                        <th>??????</th>
                                        <th>?????????(Page)</th>
                                        <th>????????? ??????(Rank in Page)</th>
                                        <th>?????????</th>
                                        <th>?????????</th>
                                        <th>?????????</th>
                                        <th>?????????</th>
                                        <th>???????????? ID</th>
                                        <th>????????????</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.rankDataState?.adList?.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <a
                                                        href={data.details.adcrUrl}
                                                        target={'_blank'}
                                                        rel="noreferrer"
                                                    >
                                                        <img
                                                            src={data.imageUrl}
                                                            className='thumb-img'
                                                            alt=''
                                                        ></img>
                                                    </a>
                                                </td>
                                                <td>
                                                    <TableExposureTag
                                                        type={data.type}
                                                    >
                                                        {data.type}
                                                    </TableExposureTag>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        <span className='accent-span'>{data.rank}</span> ???
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <a
                                                        href={getNaverShoppingUrl(data.query, data.pageIndex)}
                                                        target={'_blank'}
                                                        rel="noreferrer"
                                                    >
                                                        <TableItem>
                                                            {data.pageIndex} ?????????
                                                        </TableItem>
                                                    </a>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        ????????????
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <a
                                                        href={data.details.adcrUrl}
                                                        target={'_blank'}
                                                        rel="noreferrer"
                                                    >
                                                        <TableItem>
                                                            {data.productTitle}
                                                        </TableItem>
                                                    </a>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {data.details?.brand}
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {data.details?.maker}
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {numberWithCommas(data.details?.lowPrice || 0)} ???
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {data.type === '????????????' && data.details?.parentId}
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        <span>{data.details?.category1Name}</span>
                                                        {data.details?.category2Name &&
                                                            <span> | {data.details?.category2Name}</span>
                                                        }
                                                        {data.details?.category3Name &&
                                                            <span> | {data.details?.category3Name}</span>
                                                        }
                                                        {data.details?.category4Name &&
                                                            <span> | {data.details?.category4Name}</span>
                                                        }
                                                    </TableItem>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {props.rankDataState?.commonList?.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <a
                                                        href={data.details.crUrl}
                                                        target={'_blank'}
                                                        rel="noreferrer"
                                                    >
                                                        <img
                                                            src={data.imageUrl}
                                                            className='thumb-img'
                                                            alt=''
                                                        ></img>
                                                    </a>
                                                </td>
                                                <td>

                                                    <TableExposureTag
                                                        type={data.type}
                                                    >
                                                        {data.type}
                                                    </TableExposureTag>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        <span className='accent-span'>{data.rank}</span> ???
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <a
                                                        href={getNaverShoppingUrl(data.query, data.pageIndex)}
                                                        target={'_blank'}
                                                        rel="noreferrer"
                                                    >
                                                        <TableItem>
                                                            {data.pageIndex} ?????????
                                                        </TableItem>
                                                    </a>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {data.pageRank} ??? in {data.pageIndex} ?????????
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <a
                                                        href={data.details.crUrl}
                                                        target={'_blank'}
                                                        rel="noreferrer"
                                                    >
                                                        <TableItem>
                                                            {data.productTitle}
                                                        </TableItem>
                                                    </a>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {data.details?.brand}
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {data.details?.maker}
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {numberWithCommas(data.details?.lowPrice || 0)} ???
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        {data.type === '????????????' && data.details?.parentId}
                                                    </TableItem>
                                                </td>
                                                <td>
                                                    <TableItem>
                                                        <span>{data.details?.category1Name}</span>
                                                        {data.details?.category2Name &&
                                                            <span> | {data.details?.category2Name}</span>
                                                        }
                                                        {data.details?.category3Name &&
                                                            <span> | {data.details?.category3Name}</span>
                                                        }
                                                        {data.details?.category4Name &&
                                                            <span> | {data.details?.category4Name}</span>
                                                        }
                                                    </TableItem>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                </tbody>
                            </table>
                        </TableBox>
                    </TableContainer>
                }
                <NoticeTopBox>
                    <div>* ??????????????? [??????]??? ?????? ?????? ??? ???????????? ????????? ????????? ?????? ????????? ???????????????.</div>
                    <div>* ??????????????? [??????] ?????? [????????????]??? ?????? ?????? ????????? ????????? ?????? ??? ???????????? ????????? ???????????????.</div>
                </NoticeTopBox>
            </Container>
        </>
    );
}

export default ResultDashboardComponent;