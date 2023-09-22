import CustomScrollTrigger from '../../../components/scroll/CustomScrollTrigger';
import CustomImage from '../../modules/image/CustomImage';
import ServiceListComponent from '../service-list-v2/ServiceList.component';
import { Container, FloatingImageBox, H1, H2, H3, ServiceListFadeOut, Wrapper } from './Section1.styled';

export default function Section1Component(props) {

    const handleScrollTriggerEnter = (entry) => {
        if (!entry) {
            return;
        }
        entry?.target?.childNodes[0]?.classList?.add('fadeIn');
    }

    const handleScrollTriggerLeave = (entry) => {
        if (entry?.boundingClientRect?.y <= 0) {
            return;
        }
        entry?.target?.childNodes[0]?.classList?.remove('fadeIn');
    }

    return (
        <>
            <Container>
                <CustomScrollTrigger
                    tag='div'
                    onEnter={(entry) => handleScrollTriggerEnter(entry)}
                    onLeave={(entry) => handleScrollTriggerLeave(entry)}
                    threshold={0.3}
                >
                    <FloatingImageBox>
                        <CustomImage src='/images/normal/wave.png' />
                    </FloatingImageBox>
                </CustomScrollTrigger>
                <Wrapper>
                    <CustomScrollTrigger onEnter={(entry) => handleScrollTriggerEnter(entry)} onLeave={(entry) => handleScrollTriggerLeave(entry)} threshold={0.3}>
                        <H1 className='emoji'></H1>
                    </CustomScrollTrigger>
                    <CustomScrollTrigger onEnter={(entry) => handleScrollTriggerEnter(entry)} onLeave={(entry) => handleScrollTriggerLeave(entry)} threshold={0.3}>
                        <H2>성공적인 온라인 커머스는<br />지속적인 관리에서 부터 시작됩니다.</H2>
                        {/* <H2></H2> */}
                    </CustomScrollTrigger>
                    {/* <CustomScrollTrigger onEnter={(entry) => handleScrollTriggerEnter(entry)} onLeave={(entry) => handleScrollTriggerLeave(entry)} threshold={0.3}>
                        <H1>그래서 한땀한땀 직접 만들었습니다.</H1>
                    </CustomScrollTrigger> */}
                    <CustomScrollTrigger onEnter={(entry) => handleScrollTriggerEnter(entry)} onLeave={(entry) => handleScrollTriggerLeave(entry)} threshold={0.3}>
                        <H3>마진율, 재고관리, 판매 매출 분석까지 모두 관리해 보세요.</H3>
                    </CustomScrollTrigger>
                    <CustomScrollTrigger onEnter={(entry) => handleScrollTriggerEnter(entry)} onLeave={(entry) => handleScrollTriggerLeave(entry)} threshold={0.3}>
                        <ServiceListFadeOut>
                            <ServiceListComponent />
                        </ServiceListFadeOut>
                    </CustomScrollTrigger>
                </Wrapper>
            </Container>
        </>
    );
}