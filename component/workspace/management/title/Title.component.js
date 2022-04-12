import Image from "next/image";
import Ripple from "../../../modules/Ripple";
import { Container, Wrapper } from "./Title.styled";

const TitleComponent = (props) => {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title-box'>
                        {props.workspaceInfo.name}
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                        >
                            <div className='button-icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src='http://localhost:3000/images/icon/pen_icon2.png'
                                    layout='fill'
                                    alt=""
                                    className='button-icon'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <Ripple color={'#fff'} duration={1000}></Ripple>
                        </button>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}
export default TitleComponent;