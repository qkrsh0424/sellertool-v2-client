import { useMediaQuery } from "@mui/material";
import styled from 'styled-components';
import CustomImage from "../../../components/image/CustomImage";

const BannerBox = styled.div`
    width:100%;
    border-bottom: 1px solid #e0e0e0;
    background: var(--mainColorOpacity100);
`;


export default function BannerComponent(props) {
    const isMobile = useMediaQuery(`(max-width: 992px)`);

    return (
        <>
            <BannerBox>
                {isMobile ?
                    <CustomImage
                        src='/images/banner/banner2.png'
                        width={1}
                        height={0.45}
                    />
                    :
                    <CustomImage
                        src='/images/banner/banner2.png'
                        width={1}
                        height={0.37}
                    />
                }
            </BannerBox>
        </>
    );
}