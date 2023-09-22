import Link from "next/link";
import CustomImage from "../../../components/image/CustomImage";
import { St } from "./FdEvent.styled";

export function FdEvent(props) {
    return (
        <>
            <St.Container>
                <St.GridWrapper>
                    <Link
                        href={'https://www.notion.so/sellertool/PLUS-e3dc9cab54964d27adc677440a079608'}
                        passHref
                    >
                        <a target="_blank">
                            <St.CardWrapper>
                                <div className='image-box'>
                                    <CustomImage
                                        src={'/images/banner/event_banner1.png'}
                                        width={1}
                                        height={0.37}
                                    />
                                </div>
                            </St.CardWrapper>
                        </a>
                    </Link>
                    <St.CardWrapper>
                        <div className='image-box'>
                            <CustomImage
                                src={'/images/banner/event_banner2.png'}
                                width={1}
                                height={0.37}
                            />
                        </div>
                    </St.CardWrapper>
                </St.GridWrapper>
            </St.Container>
        </>
    );
}