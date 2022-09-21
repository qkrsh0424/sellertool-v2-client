import Image from "next/image";
import { CreateTableFieldWrapper } from "./ViewHeaderSettingModal.styled";

export default function CreateTableFieldView(props) {
    return (
        <CreateTableFieldWrapper>
            <div className='table-box'>
                <table
                    cellSpacing="0"
                >
                    <colgroup>
                        {props.createHeaderDetails.map((r, index) => {
                            return (
                                <col key={index} width={'300px'}></col>
                            );
                        })}

                    </colgroup>
                    <thead>
                        <tr>
                            {props.createHeaderDetails.map((r, index) => {
                                return (
                                    <th
                                        key={index}
                                        scope="col"
                                    >
                                        <div>기준 항목 [<span style={{ color: '#e57474' }}>번호</span>][<span style={{ color: '#4d8ceb' }}>네임</span>]</div>
                                        <div>[<span style={{ color: '#e57474' }}>{r.cellNumber}</span>][<span style={{ color: '#4d8ceb' }}>{r.originCellName}</span>]</div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {props.createHeaderDetails.map((r, index) => {
                                return (
                                    <td
                                        key={index}
                                        scope="col"
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <button className='button-item' onClick={() => props.onActionOrderToLeft(index)}>
                                                    <div className='icon-item'>
                                                        <Image
                                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                            src={`http://localhost:3000/images/icon/left_arrow_white_icon.png`}
                                                            className='icon-el'
                                                            layout="responsive"
                                                            width={1}
                                                            height={1}
                                                            loading={'lazy'}
                                                            alt={'left white icon'}
                                                        />
                                                    </div>
                                                </button>
                                            </div>
                                            <div>
                                                <input type='text' className='input-item' name='customCellName' value={r.customCellName} onChange={(e) => props.onChangeCreateHeaderDetailsValue(e, index)}></input>
                                            </div>
                                            <div>
                                                <button className='button-item' onClick={() => props.onActionOrderToRight(index)}>
                                                    <div className='icon-item'>
                                                        <Image
                                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                            src={`http://localhost:3000/images/icon/right_arrow_white_icon.png`}
                                                            className='icon-el'
                                                            layout="responsive"
                                                            width={1}
                                                            height={1}
                                                            loading={'lazy'}
                                                            alt={'right white icon'}
                                                        />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </CreateTableFieldWrapper>
    );
}