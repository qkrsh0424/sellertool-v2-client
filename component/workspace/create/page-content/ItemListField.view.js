import Image from "next/image";
import { ItemListFieldWrapper } from "./PageContent.styled";

function Checkbox({ itemType, workspaceType }) {
    if (workspaceType === itemType) {
        return (
            <div className='check-box'>
                <div className={`icon-figure ${itemType === workspaceType ? 'icon-figure-active' : ''}`}>
                    <Image
                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                        src='http://localhost:3000/images/icon/check_white_icon.png'
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

function Info({ itemType, workspaceType, title, description, serviceDescription }) {
    return (
        <div className='info-box'>
            <div className='title-el'>
                {title}
            </div>
            <div className='description-el'>
                {description}
            </div>
            <div className={`service-description-el ${workspaceType === itemType ? 'service-description-el-active' : ''}`}>
                {serviceDescription}
            </div>
        </div>
    );
}

function Item({ itemType, workspaceType, avatarSrc, title, description, serviceDescription, onClick }) {
    return (
        <div
            className={`item-box ${itemType === workspaceType ? 'item-box-active' : ''}`}
            onClick={onClick}
        >
            <Checkbox
                itemType={itemType}
                workspaceType={workspaceType}
            />
            <Avatar
                src={avatarSrc}
            />
            <Info
                itemType={itemType}
                workspaceType={workspaceType}
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
                    itemType={'public'}
                    workspaceType={props.workspaceType}
                    avatarSrc={'http://localhost:3000/images/icon/default_group_icon.png'}
                    title={'??????'}
                    description={'???????????? ???????????? ???????????? ?????? ????????? ?????????.'}
                    serviceDescription={'?????? ????????? ????????????'}
                    onClick={props.onActionSelectPublic}
                />
                <Item
                    itemType={'private'}
                    workspaceType={props.workspaceType}
                    avatarSrc={'http://localhost:3000/images/icon/default_private_icon.png'}
                    title={'?????????'}
                    description={'?????? ????????? ?????? ?????? ??????????????? ????????? ?????????.'}
                    serviceDescription={'?????? ??????????????? ?????? ??????'}
                    onClick={props.onActionSelectPrivate}
                />
            </div>
        </ItemListFieldWrapper>
    );
}