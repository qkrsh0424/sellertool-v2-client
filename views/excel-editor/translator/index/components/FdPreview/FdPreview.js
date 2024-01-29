import CustomImage from '../../../../../../components/image/CustomImage';
import ResizableTh from '../../../../../../components/table/th/v1/ResizableTh';
import * as St from './FdPreview.styled';

export function FdPreview({
    selectedExcelTranslator,
    uploadHeaderList,
    uploadRowDataList,
    downloadHeaderList,
    downloadRowDataList
}) {
    return (
        <>
            <St.Container>
                <div className='wrapper'>
                    <div className='wrapper__title'>
                        미리보기
                    </div>
                    <UploadExcelPreview
                        uploadHeaderList={uploadHeaderList}
                        uploadRowDataList={uploadRowDataList}
                    />
                    <St.Arrow>
                        <CustomImage
                            src={'/images/icon/arrow_downward_808080.svg'}
                        />
                    </St.Arrow>
                    <DownloadExcelPreview
                        selectedExcelTranslator={selectedExcelTranslator}
                        downloadHeaderList={downloadHeaderList}
                        downloadRowDataList={downloadRowDataList}
                    />
                </div>
            </St.Container>
        </>
    );
}

function UploadExcelPreview({
    uploadHeaderList,
    uploadRowDataList
}) {
    return (
        <>
            <St.UploadExcelPreviewContainer>
                <div className='wrapper'>
                    <div className='wrapper__title'>변환할 엑셀</div>
                    {!uploadHeaderList &&
                        <div className='wrapper__emptyTableWrapper'>
                            변환할 엑셀을 선택해 주세요.
                        </div>
                    }
                    {uploadHeaderList &&
                        <div className='wrapper__tableWrapper'>
                            <table cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <ResizableTh
                                            className='fixed-col-left'
                                            width={40}
                                            style={{
                                                zIndex: 11
                                            }}
                                        ></ResizableTh>
                                        {uploadHeaderList?.map((r, index) => {
                                            return (
                                                <ResizableTh
                                                    key={r?.id}
                                                    scope="col"
                                                    width={150}
                                                    style={{
                                                        zIndex: '10'
                                                    }}
                                                >
                                                    <div className='numbering__box'>{index + 1}열</div>
                                                    <div className='value__box'>{r?.headerName}</div>
                                                </ResizableTh>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploadRowDataList?.map((uploadRowData, uploadRowDataIndex) => {
                                        return (
                                            <tr key={uploadRowData?.id}>
                                                <td className='numbering__td fixed-col-left'>{uploadRowDataIndex + 1}행</td>
                                                {uploadRowData?.uploadCellValueList?.map(uploadCellValue => {
                                                    return (
                                                        <td
                                                            key={uploadCellValue?.id}
                                                        >
                                                            {uploadCellValue?.value}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </St.UploadExcelPreviewContainer>
        </>
    );
}

function DownloadExcelPreview({
    selectedExcelTranslator,
    downloadHeaderList,
    downloadRowDataList
}) {
    return (
        <>
            <St.UploadExcelPreviewContainer>
                <div className='wrapper'>
                    <div className='wrapper__title'>결과 엑셀</div>
                    <div className='wrapper__tableWrapper'>
                        <table cellSpacing={0}>
                            <thead>
                                <tr>
                                    <ResizableTh
                                        className='fixed-col-left'
                                        width={40}
                                        style={{
                                            zIndex: 11
                                        }}
                                    ></ResizableTh>
                                    {selectedExcelTranslator?.excelTranslatorDownloadHeaderList?.map((r, index) => {
                                        return (
                                            <ResizableTh
                                                key={r?.id}
                                                scope="col"
                                                width={200}
                                                style={{
                                                    zIndex: '10'
                                                }}
                                            >
                                                <div className='numbering__box'>{index + 1}열</div>
                                                <div className='value__box'>{r?.headerName}</div>
                                            </ResizableTh>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {downloadRowDataList?.map((downloadRowData, downloadRowDataIndex) => {
                                    return (
                                        <tr key={downloadRowData?.id}>
                                            <td className='numbering__td fixed-col-left'>{downloadRowDataIndex + 1}행</td>
                                            {downloadRowData?.downloadCellValueList?.map(downloadCellValue => {
                                                return (
                                                    <td
                                                        key={downloadCellValue?.id}
                                                    >
                                                        {downloadCellValue?.value}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </St.UploadExcelPreviewContainer>
        </>
    );
}