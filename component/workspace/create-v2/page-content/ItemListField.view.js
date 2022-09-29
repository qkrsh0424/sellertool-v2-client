import Image from "next/image";
import { ItemListFieldWrapper } from "./PageContent.styled";

function Checkbox({ publicYn, selectedPublicYn }) {
    if (selectedPublicYn === publicYn) {
        return (
            <div className='check-box'>
                <div className={`icon-figure ${publicYn === selectedPublicYn ? 'icon-figure-active' : ''}`}>
                    <Image
                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                        src='http://localhost:3000/images/icon/check_default_ffffff.svg'
                        layout='fill'
                        alt=""
                        loading="lazy"
                    ></Image>
                </div>
            </div>
        );
    } else {
        return (
            <div className='check-box'>
                <div className='icon-figure'>
                </div>
            </div>
        );
    }
}

function Avatar({ src }) {
    return (
        <div className='avatar-box'>
            <div className='icon-figure'>
                <Image
                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                    src={src}
                    layout='fill'
                    alt=""
                ></Image>
            </div>
        </div>
    );
}

function Info({ publicYn, selectedPublicYn, title, description, serviceDescription }) {
    return (
        <div className='info-box'>
            <div className='title-el'>
                {title}
            </div>
            <div className='description-el'>
                {description}
            </div>
            <div className={`service-description-el ${selectedPublicYn === publicYn ? 'service-description-el-active' : ''}`}>
                {serviceDescription}
            </div>
        </div>
    );
}

function Item({ publicYn, selectedPublicYn, avatarSrc, title, description, serviceDescription, onClick }) {
    return (
        <div
            className={`item-box ${publicYn === selectedPublicYn ? 'item-box-active' : ''}`}
            onClick={onClick}
        >
            <Checkbox
                publicYn={publicYn}
                selectedPublicYn={selectedPublicYn}
            />
            <Avatar
                src={avatarSrc}
            />
            <Info
                publicYn={publicYn}
                selectedPublicYn={selectedPublicYn}
                title={title}
                description={description}
                serviceDescription={serviceDescription}
            />

        </div>
    );
}

export default function ItemListFieldView(props) {
    return (
        <ItemListFieldWrapper>
            <div className='item-list-box'>
                <Item
                    publicYn={'y'}
                    selectedPublicYn={props.workspaceCreateForm.publicYn}
                    avatarSrc={'http://localhost:3000/images/icon/groups_default_505050.svg'}
                    title={'팀용'}
                    description={'팀원들과 셀러툴의 기능들을 함께 사용해 보세요.'}
                    serviceDescription={'무료 서비스 체험하기'}
                    onClick={props.onActionSelectPublic}
                />
                <Item
                    publicYn={'n'}
                    selectedPublicYn={props.workspaceCreateForm.publicYn}
                    avatarSrc={'http://localhost:3000/images/icon/person_default_505050.svg'}
                    title={'개인용'}
                    description={'사용 목적에 맞게 더욱 체계적으로 관리해 보세요.'}
                    serviceDescription={'개인 사용자에게 무료 제공'}
                    onClick={props.onActionSelectPrivate}
                />
            </div>
        </ItemListFieldWrapper>
    );
}