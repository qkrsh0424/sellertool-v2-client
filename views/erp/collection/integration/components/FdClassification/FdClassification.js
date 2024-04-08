import { useRouter } from 'next/router';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdClassification.styled';
import { CustomDateUtils } from '../../../../../../utils/CustomDateUtils';
import { CLASSIFICATIONS } from '../../References';

const customDateUtils = CustomDateUtils();

export function FdClassification(props) {
    const router = useRouter();

    const handleChangeClassification = (classificationType) => {
        let currClassification = CLASSIFICATIONS?.find(r => r.classificationType === classificationType) || CLASSIFICATIONS[0];

        router.replace({
            pathname: router?.pathname,
            query: {
                ...router.query,
                classificationType: currClassification?.classificationType,
                periodSearchCondition: currClassification?.periodSearchCondition,
                startDateTime: customDateUtils.dateToYYYYMMDD(new Date(), '-'),
                endDateTime: customDateUtils.dateToYYYYMMDD(new Date(), '-')
            }
        })
    }

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    {CLASSIFICATIONS?.map(r => {
                        return (
                            <CustomBlockButton
                                key={r.classificationType}
                                type='button'
                                onClick={() => handleChangeClassification(r.classificationType)}
                                className={`${(router?.query?.classificationType === r.classificationType) ? 'active' : ''}`}
                            >
                                {r.name}
                            </CustomBlockButton>
                        );
                    })}
                </St.Wrapper>
            </St.Container>
        </>
    );
}