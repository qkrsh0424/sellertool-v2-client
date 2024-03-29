import styled from "styled-components";

const Figure = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    margin: 0 auto;

    img {
        width: 100%;
        height: 100%;
    }
`;

export function CustomBoxImage({
    src,
    className,
    size='100%',
    ...props
}) {
    return (
        <Figure style={{ width: size, height: size }}>
            <img
                src={src || '/images/normal/image.png'}
                width={size}
                alt='image'
                loading='lazy'
                className={className}
                {...props}
            />
        </Figure>
    );
}