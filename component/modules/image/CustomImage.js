import Image from "next/image";

export default function CustomImage({
    src,
    className,
    ...props
}) {
    return (
        <Image
            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
            src={src || '/images/normal/image.png'}
            layout='responsive'
            width={1}
            height={1}
            objectFit={'cover'}
            alt='image'
            loading='lazy'
            className={className}
            {...props}
        ></Image>
    );
}