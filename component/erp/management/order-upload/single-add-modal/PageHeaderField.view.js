import Image from "next/image";
import { PageHeaderFieldWrapper } from "./SingleAddModal.styled";

export default function PageHeaderFieldView(props) {
    return (
        <PageHeaderFieldWrapper>
            <div className='title-el'>
                단건 등록
            </div>
            <div className='button-box'>
                <button
                    type='submit'
                    className='button-el'
                >
                    <div className='button-icon-figure'>
                        <Image
                            loader={({src, width, quality}) => `${src}?q=${quality || 75}`}
                            src='http://localhost:3000/images/icon/add_white_icon.png'
                            layout="responsive"
                            width={1}
                            height={1}

                            alt={"add white icon"}
                        ></Image>
                    </div>
                </button>
            </div>
        </PageHeaderFieldWrapper>
    );
}