import React from "react";
import { Virtuoso } from "react-virtuoso";
import styled from "styled-components";

const TableWrapper = styled.div`
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
 * @param {number} height
 * @param {array} rows
 * @param {int} totalCount
 * @param {object} headerField
 * @param {object} bodyField
 * @param {string} className
 * @param {object} props
 * @returns 
 */
export default function CustomTableVirtuoso({
    height = 300,
    rows = [],
    totalCount = 0,
    headerField,
    bodyField,
    className = '',
    ...props
}) {
    const List = React.forwardRef(({ children, style }, ref) => {
        return (
            <table
                className={className}
                style={{
                    "--tablePaddingTop": (style?.paddingTop ?? 0) + "px",
                    "--tablePaddingBottom": (style?.paddingBottom ?? 0) + "px"
                }}
                cellSpacing="0"
            >
                <thead>
                    {headerField}
                </thead>

                <tbody ref={ref}>
                    {bodyField &&
                        <>
                            {children}
                        </>
                    }
                </tbody>
            </table>
        )
    })

    List.displayName = "List";

    const Item = (params) => {
        if(!(params && rows.length > 0)) return;

        let index = params["data-index"];
        let data = rows[index];

        return {
            ...bodyField,
            props: {
                ...bodyField.props,
                rowIndex: index,
                rowData: data,
                rowConfig: params
            }
        };
    }

    return (
        <TableWrapper>
            <Virtuoso
                style={{ height }}
                totalCount={totalCount}
                components={{ List, Item }}
                {...props}
            />
        </TableWrapper>
    )
}