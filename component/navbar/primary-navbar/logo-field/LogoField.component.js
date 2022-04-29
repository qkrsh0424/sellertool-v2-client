import Image from "next/image";
import Link from "next/link";
import { Container, LogoImgEl } from "./LogoField.styled";

const LogoSrc = 'http://localhost:3000/images/logo/logo1.png';

const LogoFieldComponent = (props) => {
    return (
        <>
            <Container>
                <Link
                    href='/'
                    passHref
                >
                    <div className='logo-figure'>
                        <Image
                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                            src={LogoSrc}
                            layout='fill'
                            alt="logo"
                            className='logo-el'
                            priority={true}
                        ></Image>
                    </div>
                </Link>
            </Container>
        </>
    );
}
export default LogoFieldComponent;