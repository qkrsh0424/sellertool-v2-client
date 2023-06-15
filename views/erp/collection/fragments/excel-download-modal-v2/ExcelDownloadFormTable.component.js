import useErpcExcelDownloadFormHook from "../hooks/useErpcExcelDownloadFormHook";
import { ExcelDownloadFormTableWrapper, TableBox, TableWrapper } from "./ExcelDownloadModal.styled";

const ExcelDownloadFormTableComponent = ({
    refErpCollectionHeaders,
    selectedExcelHeader
}) => {
    const {
        erpcExcelDownloadForm
    } = useErpcExcelDownloadFormHook(
        selectedExcelHeader?.id
    );

    return (
        <>
            <ExcelDownloadFormTableWrapper>
                <div className='table-box'>
                    <table cellSpacing="0">
                        <colgroup>
                            {erpcExcelDownloadForm?.erpcExcelDownloadFormDetails?.map((r, index) => {
                                return (
                                    <col key={index} width={'200px'}></col>
                                );
                            })}
                        </colgroup>
                        <thead>
                            <tr>
                                {erpcExcelDownloadForm?.erpcExcelDownloadFormDetails?.map((r, index) => {
                                    return (
                                        <th key={index} scope="col">{r.customCellName}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {erpcExcelDownloadForm?.erpcExcelDownloadFormDetails?.map((detail, index) => {
                                    if (detail.fieldType === '고정값') {
                                        return (
                                            <td key={detail.id}>
                                                <div>
                                                    [고정값]
                                                </div>
                                                <div>
                                                    {detail.fixedValue}
                                                </div>
                                            </td>
                                        );
                                    }
                                    if (detail.fieldType === '운송코드') {
                                        return (
                                            <td key={detail.id}>
                                                <div>
                                                    [운송코드]
                                                </div>
                                            </td>
                                        );
                                    }

                                    let name = detail.viewDetails.map(r => {
                                        let originHeaderName = refErpCollectionHeaders?.filter(dr => dr.matchedFieldName === r)[0]?.originHeaderName;
                                        return originHeaderName;
                                    });

                                    return (
                                        <td key={detail.id}>
                                            <div>
                                                [일반]
                                            </div>
                                            <div>
                                                {name.join(detail.splitter)}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ExcelDownloadFormTableWrapper>
        </>
    );
}
export default ExcelDownloadFormTableComponent;