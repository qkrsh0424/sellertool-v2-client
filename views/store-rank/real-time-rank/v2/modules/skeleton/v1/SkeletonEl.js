import { Skeleton } from "@mui/material"

/**
 * 
 * @param {object} props
 * @param {variant} string [rectangel | rounded | circle]
 * @param {int} width
 * @param {int} height
 * @returns 
 */
export default function SkeletonEl ({
    variant = 'rectangle',
    width = 70,
    height = 30,
    ...props
}) {
    return (
        <Skeleton
            variant={variant}
            width={width}
            height={height}
            {...props}
        />
    )
}