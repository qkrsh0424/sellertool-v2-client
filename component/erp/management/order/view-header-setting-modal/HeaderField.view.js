import Image from "next/image";
import Ripple from "../../../../modules/button/Ripple";
import { HeaderFieldWrapper } from "./ViewHeaderSettingModal.styled";

function Title({ element }) {
    return (
        <div className='title-box'>
            {element}
        </div>
    );
}

function Button({ onActionSaveAndModify }) {
    return (
        <div className='button-box'>
            <button
                type='button'
                className='button-el'
                onClick={() => onActionSaveAndModify()}
            >
                <div className='icon-box'>
                    <Image
                        loader={({src, width, quality}) => `${src}?q=${quality || 75}`}
                        src={`http://localhost:3000/images/icon/add_white_icon.png`}
                        className='icon-el'
                        layout="responsive"
                        width={1}
                        height={1}
                        alt={'add icon'}
                    />
                </div>
                <Ripple color={'#d1d1d1'} duration={1000}></Ripple>
            </button>
        </div>
    );
}
export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <Title
                element={'뷰 헤더 설정'}
            ></Title>
            <Button
                onActionSaveAndModify={props.onActionSaveAndModify}
            ></Button>
        </HeaderFieldWrapper>
    );
}