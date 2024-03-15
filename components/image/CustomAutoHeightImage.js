import Image from "next/image";
import styled from 'styled-components';

const Figure = styled.div`
    width: 100%;
    & > span {
        position: unset !important;

        & .autoImage {
            object-fit: contain !important;
            position: relative !important;
            height: auto !important;
        }
    }
`;

export function CustomAuthHeightImage({
    src = '/images/normal/image.png',
    alt = 'image',
    ...props
}) {
    return (
        <Figure>
            <Image
                loader={({ src, width, quality }) => `${src}?q=75`}
                src={src}
                layout='fill'
                className='autoImage'
                alt={alt}
                {...props}
            />
        </Figure>
    );
}