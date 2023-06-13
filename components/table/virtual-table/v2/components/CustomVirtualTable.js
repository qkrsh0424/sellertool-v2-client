import React, { useEffect, useRef, useState } from "react";
import { Virtuoso, TableVirtuoso } from "react-virtuoso";
import styled from "styled-components";
import ResizableTh from "../../../th/v1/ResizableTh";

const VirtualTable = styled(TableVirtuoso)`
    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #00000010;
        border-radius: 10px;
    }

    table {
        position:relative;
        text-align: center;
        table-layout: fixed;
        border: none;
        width: 100%;
    }

    tbody::before {
        display: block;
        padding-top: var(--tablePaddingTop);
        content: "";
    }

    tbody::after {
        display: block;
        padding-bottom: var(--tablePaddingBottom);
        content: "";
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #fff;
        color: #000;
        font-weight: 700;
        padding: 10px;
        font-size: 12px;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
    }

    table tbody tr td{
        vertical-align: middle !important;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        font-size: 11px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        height: 43px;

        @media all and (max-width: 992px){
            font-size: 10px;
        }

        &:focus{
            background:red;
        }
    }

    .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
        box-shadow: 0 -0.5px 0 0 #e0e0e0 inset;
    }

    .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        box-shadow: -0.5px 0 0 0 #e0e0e0 inset;
    }

    .fixed-col-right {
        position: sticky;
        background: white;
        right: 0;
        z-index:10;
        box-shadow: 0.5px 0 0 0 #e0e0e0 inset;
    }
`;

const TableHead = styled.thead`

`;

/**
 * 
 * @param {object} params
 * @param {number} params.height
 * @param {object} params.data
 * @param {CallbackContext} params.THeadRow
 * @param {CallbackContext} params.TBodyRow - callback virtuosoData
 * @param {string} params.tableClassName
 * @param {string} params.tableHeadClassName
 * @param {string} params.tableBodyClassName
 * @param {json} params.tableStyle
 * @param {json} params.tableHeadStyle
 * @param {json} params.tableBodyStyle
 * @returns 
 */
export const CustomVirtualTable = React.forwardRef(({
    height = 300,
    data,
    THeadRow,
    /**
     * TBodyRow 의 컴포넌트는 반드시 virtuosoData 를 필수 props로 가져가야 된다.
     * tr 태그에 attribute로 virtuosoData를 모두 넣어줘야 한다.
     * 
     * ex)
     * function TBodyRow({virtuosoData}){
     *      return (
     *          <tr {...virtuosoData}>
     *              <td>...</td>
     *              <td>...</td>
     *          </tr>
     *      );
     * }
     */
    TBodyRow,
    tableClassName = '',
    tableHeadClassName = '',
    tableBodyClassName = '',
    tableStyle = {},
    tableHeadStyle = {},
    tableBodyStyle = {}
},
    virtuosoRef
) => {

    const Table = React.useMemo(
        // eslint-disable-next-line react/display-name
        () => (props) => {
            return (
                <table {...props} cellSpacing={0} className={tableClassName} style={tableStyle}></table>
            )
        }
        , []
    );

    const TableHead = React.useMemo(
        // eslint-disable-next-line react/display-name
        () => React.forwardRef(
            (props, ref) => {
                return (
                    <thead {...props} ref={ref} className={tableHeadClassName} style={tableHeadStyle}></thead>
                );
            }
        )
        , []
    )

    const TableBody = React.useMemo(
        // eslint-disable-next-line react/display-name
        () => React.forwardRef(
            (props, ref) => {
                return (
                    <tbody {...props} ref={ref} className={tableBodyClassName} style={tableBodyStyle}></tbody>
                )
            }
        )
        , []
    )

    return (
        <>
            <VirtualTable
                style={{ height }}
                data={data}
                ref={virtuosoRef}
                fixedHeaderContent={() => (THeadRow())}
                components={{
                    Table: Table,
                    TableHead: TableHead,
                    TableBody: TableBody,
                    TableRow: (props) => {
                        if (!props || !props?.item) {
                            return null;
                        }

                        return TBodyRow(props);
                    }
                }}
            />
        </>
    );
});

CustomVirtualTable.displayName = "CustomVirtualTable"