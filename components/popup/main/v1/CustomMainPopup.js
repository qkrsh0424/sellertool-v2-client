import { useEffect, useRef, useState } from "react";
import * as St from './CustomMainPopup.styled';
import CustomImage from "../../../image/CustomImage";
import CustomBlockButton from "../../../buttons/block-button/v1/CustomBlockButton";
import { useCookies } from "react-cookie";
import { CustomDateUtils } from "../../../../utils/CustomDateUtils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const customDateUtils = CustomDateUtils();

function useMainPopupIgnoreCampaignsCookie() {
    const [cookies, setCookie] = useCookies();
    const targetCookie = cookies['main_popup_ignore_campaign_ids'];
    const [ignoredCampaignList, setIgnoredCampaignList] = useState(null);

    useEffect(() => {
        let results = [];

        if (!targetCookie || !Array.isArray(targetCookie)) {
            results = [];
        } else {
            results = [...targetCookie];
        }

        setIgnoredCampaignList(results);

    }, [targetCookie]);

    const onAddIgnoreCampaign = (campaignId) => {
        const expirationDate = new Date();
        expirationDate.setHours(23, 59, 59);

        const ignoredCampaignSet = new Set([...ignoredCampaignList]);
        ignoredCampaignSet.add(campaignId);

        setCookie('main_popup_ignore_campaign_ids', [...ignoredCampaignSet], {
            path: '/',
            expires: expirationDate
        })
    }
    return [ignoredCampaignList, onAddIgnoreCampaign];
}

// TODO : 팝업 완성하기
export function CustomMainPopup(props) {
    const [ignoredCampaignList, onAddIgnoreCampaign] = useMainPopupIgnoreCampaignsCookie();

    if (!ignoredCampaignList) {
        return null;
    }

    return (
        <St.Container>
            {CAMPAIGN_LIST?.filter(r => !ignoredCampaignList?.includes(r?.id))?.map(r => {
                return (
                    <Popup
                        key={r.id}
                        campaign={r}
                        onAddIgnoreCampaign={onAddIgnoreCampaign}
                    />
                );
            })}
        </St.Container>
    );
}

const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000
}

function Popup({
    campaign,
    onAddIgnoreCampaign
}) {
    const sliderRef = useRef();
    const [popupOpen, setPopupOpen] = useState(true);
    const [sliderIndex, setSliderIndex] = useState({
        oldSlide: 0,
        activeSlide: 0,
        activeSlide2: 0
    });

    const togglePopupOpen = (bool) => {
        setPopupOpen(bool);
    }

    if (!popupOpen) {
        return null;
    }

    return (
        <St.PopupContainer>
            <div className='wrapper'>
                <div className='slider-wrapper'>
                    <Slider
                        ref={sliderRef}
                        {...settings}
                        beforeChange={(current, next) => {
                            setSliderIndex({
                                ...sliderIndex,
                                oldSlide: current,
                                activeSlide: next
                            })
                        }}
                        afterChange={(current) => {
                            setSliderIndex({
                                ...sliderIndex,
                                activeSlide2: current
                            })
                        }}
                    >
                        {campaign?.imageList?.map(r => {
                            return (
                                <St.PopupImage
                                    key={r.id}
                                    src={r.src}
                                />
                            );
                        })}
                    </Slider>
                    {sliderIndex.activeSlide2 !== 0 &&
                        <St.SliderPrevArrow
                            type="button"
                            onClick={() => sliderRef?.current?.slickPrev()}
                        >
                            <CustomImage
                                className={'icon'}
                                src='/images/icon/arrowLeft_chevron_ffffff.svg'
                            />
                        </St.SliderPrevArrow>
                    }
                    {sliderIndex.activeSlide2 !== campaign?.imageList?.length - 1 &&
                        <St.SliderNextArrow
                            type="button"
                            onClick={() => sliderRef?.current?.slickNext()}
                        >
                            <CustomImage
                                className={'icon'}
                                src='/images/icon/arrowRight_chevron_ffffff.svg'
                            />
                        </St.SliderNextArrow>
                    }
                    <St.SliderNumbering>
                        {sliderIndex.activeSlide2 + 1} | {campaign?.imageList?.length}
                    </St.SliderNumbering>
                </div>
                <div className='wrapper__footerButtonGroup'>
                    <CustomBlockButton
                        type='button'
                        onClick={() => onAddIgnoreCampaign(campaign.id)}
                    >
                        오늘 그만보기
                    </CustomBlockButton>
                    <CustomBlockButton
                        type='button'
                        onClick={() => togglePopupOpen(false)}
                    >
                        닫기
                    </CustomBlockButton>
                </div>
            </div>
        </St.PopupContainer>
    );
}

const CAMPAIGN_LIST = [
    {
        id: 1,
        imageList: [
            {
                id: '1-1',
                src: 'https://assets.sellertool.io/popup/1-1.png',
            },
            {
                id: '1-2',
                src: 'https://assets.sellertool.io/popup/1-2.png',
            }
        ],
        href: '/excel-editor/translator'
    },
]