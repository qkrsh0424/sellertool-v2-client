import Image from "next/image";

export default function CustomImage({
    src,
    className,
    loading = 'lazy',
    priority = false,
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
            loading={loading}
            priority={priority}
            className={className}
            {...props}
        ></Image>
    );
}