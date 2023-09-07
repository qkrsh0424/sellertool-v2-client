import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import ResizableTh from "../../../../../components/table/th/v1/ResizableTh";
import { StaticUtils } from "../../utils/staticUtils";
import { St } from "./FdMarginRecordList.styled";

export function FdMarginRecordList({
    marginRecordList,
    selectedMarginRecord,
    onSelectMarginRecord
}) {
    console.log(selectedMarginRecord);
    return (
        <>
            <St.Container>
                <St.TableWrapper>
                    <St.TableBox>
                        <table
                            cellSpacing={0}
                        >
                            <thead>
                                <tr>
                                    <ResizableTh
                                        className="fixed-header"
                                        scope="col"
                                        // width={r.defaultWidth}
                                        width={100}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        <div className='text-box'>
                                            <div className='text'>상품명</div>
                                            <div className='lineBreaker'></div>
                                            <div className='text'>태그</div>
                                        </div>
                                    </ResizableTh>
                                    <ResizableTh
                                        className="fixed-header"
                                        scope="col"
                                        // width={r.defaultWidth}
                                        width={100}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        <div className='text-box'>
                                            <div className='text'>판매총계</div>
                                            <div className='lineBreaker'></div>
                                            <div className='text'>매입총계</div>
                                        </div>
                                    </ResizableTh>
                                    <ResizableTh
                                        className="fixed-header"
                                        scope="col"
                                        // width={r.defaultWidth}
                                        width={50}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        <div>마진율</div>
                                    </ResizableTh>
                                </tr>
                            </thead>
                            <tbody>
                                {marginRecordList?.map(marginRecord => {
                                    return (
                                        <tr
                                            key={marginRecord?.id}
                                            onClick={() => onSelectMarginRecord(marginRecord)}
                                            style={{
                                                background: selectedMarginRecord?.id === marginRecord?.id ? 'var(--mainColorOpacity100)' : ''
                                            }}
                                        >
                                            <td>
                                                <div className='text-box'>
                                                    <div className='text'>{marginRecord?.name}</div>
                                                    <div className='lineBreaker'></div>
                                                    <div className='text'>{marginRecord?.tag}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='text-box'>
                                                    <div className='text'>100,000</div>
                                                    <div className='lineBreaker'></div>
                                                    <div className='text'>50,000</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='text-box'>
                                                    <div className='text'>40%</div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </St.TableBox>
                </St.TableWrapper>
            </St.Container>
        </>
    );
}