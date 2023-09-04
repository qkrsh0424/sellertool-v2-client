import styled from "styled-components";

const Figure = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    margin: 0 auto;

    img {
        width: 100%;
        height: 100%;
    }

    @media screen and (max-width: 992px) {
        width: ${props => props.mobileSize} !important;
        height: ${props => props.mobileSize} !important;
    }
`;

export function CustomBoxImage({
    src,
    className,
    size='40px',
    mobileSize=size,
    ...props
}) {
    return (
        <Figure style={{ width: size, height: size }} mobileSize={mobileSize}>
            <img
                src={src || '/images/normal/image.png'}
                width={size}
                // objectFit={'cover'}
                alt='image'
                loading='lazy'
                className={className}
                {...props}
            />
        </Figure>
    );
}