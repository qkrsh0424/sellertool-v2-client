import Image from "next/image";
import { ItemListFieldWrapper } from "./PageContent.styled";

function Checkbox({ subscriptionPlan, selectedSubscriptionPlan }) {
    if (selectedSubscriptionPlan === subscriptionPlan) {
        return (
            <div className='check-box'>
                <div className={`icon-figure ${subscriptionPlan === selectedSubscriptionPlan ? 'icon-figure-active' : ''}`}>
                    <Image
                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                        src='/images/icon/check_default_ffffff.svg'
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

function Info({ subscriptionPlan, selectedSubscriptionPlan, title, description, serviceDescription }) {
    return (
        <div className='info-box'>
            <div className='title-el'>
                {title}
            </div>
            <div className='description-el'>
                {description}
            </div>
            <div className={`service-description-el ${subscriptionPlan === selectedSubscriptionPlan ? 'service-description-el-active' : ''}`}>
                {serviceDescription}
            </div>
        </div>
    );
}

function Item({ subscriptionPlan, selectedSubscriptionPlan, avatarSrc, title, description, serviceDescription, onClick, ...props }) {
    return (
        <div
            className={`item-box ${subscriptionPlan === selectedSubscriptionPlan ? 'item-box-active' : ''}`}
            onClick={onClick}
            {...props}
        >
            <Checkbox
                subscriptionPlan={subscriptionPlan}
                selectedSubscriptionPlan={selectedSubscriptionPlan}
            />
            <Avatar
                src={avatarSrc}
            />
            <Info
                subscriptionPlan={subscriptionPlan}
                selectedSubscriptionPlan={selectedSubscriptionPlan}
                title={title}
                description={description}
                serviceDescription={serviceDescription}
            />

        </div>
    );
}

export default function ItemListFieldView({
    workspaceCreateForm,
    onActionSelectPublic,
    onActionSelectPrivate
}) {
    return (
        <ItemListFieldWrapper>
            <div className='item-list-box'>
                <Item
                    subscriptionPlan="NONE"
                    selectedSubscriptionPlan={workspaceCreateForm?.subscriptionPlan}
                    avatarSrc={'/images/icon/person_default_505050.svg'}
                    title={'개인용'}
                    description={'사용 목적에 맞게 더욱 체계적으로 관리해 보세요.'}
                    serviceDescription={'개인 사용자에게 최대 2개 무료 제공'}
                    onClick={onActionSelectPrivate}
                />
                <Item
                    subscriptionPlan="PUBLIC"
                    selectedSubscriptionPlan={workspaceCreateForm?.subscriptionPlan}
                    avatarSrc={'/images/icon/groups_default_505050.svg'}
                    title={'단체용'}
                    description={'팀원들과 셀러툴의 기능들을 함께 사용해 보세요.'}
                    serviceDescription={'서비스 준비중 입니다.'}
                    onClick={() => { }}
                    style={{
                        opacity: '0.7'
                    }}
                    // serviceDescription={'무료 서비스 체험하기'}
                    // onClick={onActionSelectPublic}
                />
            </div>
        </ItemListFieldWrapper>
    );
}