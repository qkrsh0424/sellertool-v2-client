import React, { useEffect, useRef } from "react";
import { Virtuoso, TableVirtuoso } from "react-virtuoso";
import styled from "styled-components";

const VirtualTable = styled(Virtuoso)`
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
// export function CustomVirtualTable({
//     height = 300,
//     data,
//     THeadRow,
//     /**
//      * TBodyRow 의 컴포넌트는 반드시 virtuosoData 를 필수 props로 가져가야 된다.
//      * tr 태그에 attribute로 virtuosoData를 모두 넣어줘야 한다.
//      * 
//      * ex)
//      * function TBodyRow({virtuosoData}){
//      *      return (
//      *          <tr {...virtuosoData}>
//      *              <td>...</td>
//      *              <td>...</td>
//      *          </tr>
//      *      );
//      * }
//      */
//     TBodyRow,
//     tableClassName = '',
//     tableHeadClassName = '',
//     tableBodyClassName = '',
//     tableStyle = {},
//     tableHeadStyle = {},
//     tableBodyStyle = {}
// }) {
//     const scrollerRef = useRef();

//     const handleScrollToTop = () => {
//         console.log(scrollerRef);
//         scrollerRef.current.scrollTo({ top: 0 });
//     }

//     const TableBox = React.forwardRef(({ children, style }, ref) => {
//         return (
//             <table
//                 className={tableClassName}
//                 style={{
//                     "--tablePaddingTop": (style?.paddingTop ?? 0) + "px",
//                     "--tablePaddingBottom": (style?.paddingBottom ?? 0) + "px",
//                     ...tableStyle
//                 }}
//                 cellSpacing="0"
//             >
//                 <thead className={tableHeadClassName} style={tableHeadStyle}>
//                     {THeadRow()}
//                 </thead>

//                 <tbody ref={ref} className={tableBodyClassName} style={tableBodyStyle}>
//                     {children}
//                 </tbody>
//             </table>
//         );
//     })
//     TableBox.displayName = "TableBox"


//     return (
//         <>
//             <button type='button' onClick={() => handleScrollToTop()}>스크롤탑</button>
//             <VirtualTable
//                 style={{ height }}
//                 data={data}
//                 ref={scrollerRef}
//                 components={{
//                     List: TableBox,
//                     Item: (props) => {
//                         if (!props || !props?.item) {
//                             return null;
//                         }

//                         return TBodyRow(props);
//                     }
//                 }}
//             />
//         </>
//     );
// }

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
    const TableBox = React.forwardRef(({ children, style }, tbodyRef) => {
        return (
            <table
                className={tableClassName}
                style={{
                    "--tablePaddingTop": (style?.paddingTop ?? 0) + "px",
                    "--tablePaddingBottom": (style?.paddingBottom ?? 0) + "px",
                    ...tableStyle
                }}
                cellSpacing="0"
            >
                <thead className={tableHeadClassName} style={tableHeadStyle}>
                    {THeadRow()}
                </thead>

                <tbody ref={tbodyRef} className={tableBodyClassName} style={tableBodyStyle}>
                    {children}
                </tbody>
            </table>
        );
    })
    TableBox.displayName = "TableBox"


    return (
        <>
            <VirtualTable
                style={{ height }}
                data={data}
                ref={virtuosoRef}
                components={{
                    List: TableBox,
                    Item: (props) => {
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