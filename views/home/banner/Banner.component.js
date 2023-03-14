import CustomImage from "../../modules/image/CustomImage";
import styled from 'styled-components';

const BannerBox = styled.div`
    width:100%;
`;

export default function BannerComponent(props) {
    return (
        <>
            <BannerBox>
                <CustomImage
                    src='/images/banner/banner1.png'
                    width={1}
                    height={0.525}
                />
            </BannerBox>
        </>
    );
}