import Image from 'next/image';
import Ripple from '../../../modules/Ripple';
import { TableFieldWrapper } from './MemberTable.styled';

function PermissionChecker({ flag }) {
    if (flag === 'y') {
        return <div className='circle-el' style={{ background: '#50bb1a' }}></div>;
    } else {
        return <div className='circle-el' style={{ background: '#ff6961' }}></div>;
    }
}

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
            >
                <table cellSpacing="0">
                    <colgroup>
                        <col className='col-5-3'></col>
                        <col className='col-15-13'></col>
                        <col className='col-15-13'></col>
                        <col className='col-15-13'></col>
                        <col className='col-15-13'></col>
                        <col className='col-15-13'></col>
                        <col className='col-15-13'></col>
                        <col className='col-15-13'></col>
                        <col className='col-15-13'></col>
                        <col className='col-15-13'></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th
                                className="fixed-header"
                            >
                                #
                            </th>
                            <th
                                className="fixed-header"
                            >
                                멤버 닉네임
                            </th>
                            <th
                                className="fixed-header"
                            >
                                멤버 이메일
                            </th>
                            <th
                                className="fixed-header"
                            >
                                등급
                            </th>
                            <th
                                className="fixed-header"
                            >
                                워크스페이스 읽기 권한
                            </th>
                            <th
                                className="fixed-header"
                            >
                                워크스페이스 쓰기 권한
                            </th>
                            <th
                                className="fixed-header"
                            >
                                워크스페이스 수정 권한
                            </th>
                            <th
                                className="fixed-header"
                            >
                                워크스페이스 삭제 권한
                            </th>
                            <th
                                className="fixed-header"
                            >
                                권한 설정
                            </th>
                            <th
                                className="fixed-header"
                            >
                                멤버 제명
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.workspaceMembers.map((r, index) => {
                            return (
                                <tr key={r.workspaceMember.id}>
                                    <td>{index + 1}</td>
                                    <td>{r.user.nickname}</td>
                                    <td>{r.user.email}</td>
                                    <td>{r.workspaceMember.grade}</td>
                                    <td>
                                        <PermissionChecker
                                            flag={r.workspaceMember.readPermissionYn}
                                        />
                                    </td>
                                    {/* <td>{r.workspaceMember.readPermissionYn}</td> */}
                                    <td>
                                        <PermissionChecker
                                            flag={r.workspaceMember.writePermissionYn}
                                        />
                                    </td>
                                    <td>
                                        <PermissionChecker
                                            flag={r.workspaceMember.updatePermissionYn}
                                        />
                                    </td>
                                    <td>
                                        <PermissionChecker
                                            flag={r.workspaceMember.deletePermissionYn}
                                        />
                                    </td>
                                    <>
                                        <td>
                                            <button
                                                className='edit-button-el'
                                            >
                                                <div className='edit-button-icon-figure'>
                                                    <Image
                                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                        src='http://localhost:3000/images/icon/setting_icon.png'
                                                        layout='fill'
                                                        alt=""
                                                        className='button-icon'
                                                        loading='lazy'
                                                    ></Image>
                                                </div>
                                                <Ripple color={'#fff'} duration={1000}></Ripple>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className='delete-button-el'
                                            >
                                                <div className='delete-button-icon-figure'>
                                                    <Image
                                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                        src='http://localhost:3000/images/icon/x_icon.png'
                                                        layout='fill'
                                                        alt=""
                                                        className='delete-button-icon'
                                                        loading='lazy'
                                                    ></Image>
                                                </div>
                                                <Ripple color={'#fff'} duration={1000}></Ripple>
                                            </button>
                                        </td>
                                    </>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    );
}