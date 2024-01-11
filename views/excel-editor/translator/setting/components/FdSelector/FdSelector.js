import { useRouter } from 'next/router';
import CustomSelect from '../../../../../../components/select/default/v1/CustomSelect';
import * as St from './FdSelector.styled';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';

export function FdSelector({
    excelTranslatorList
}) {
    const router = useRouter();
    const currentExcelTranslatorId = router?.query?.excelTranslatorId;

    const handleChangeExcelTranslatorId = (value) => {
        let query = { ...router?.query };

        if (!value) {
            delete query?.excelTranslatorId;
        } else {
            query.excelTranslatorId = value;
        }

        router?.replace({
            pathname: router?.pathname,
            query: query
        })
    }
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.Title>
                        변환기 선택
                    </St.Title>
                    <St.SelectWrapper>
                        <CustomSelect
                            value={currentExcelTranslatorId || ''}
                            onChange={(e) => handleChangeExcelTranslatorId(e.target.value)}
                        >
                            <option value={''}>선택</option>
                            {excelTranslatorList?.map(excelTranslator => {
                                return (
                                    <option key={excelTranslator?.id} value={excelTranslator?.id}>{excelTranslator?.name}</option>
                                );
                            })}
                        </CustomSelect>
                    </St.SelectWrapper>
                </St.Wrapper>
            </St.Container>
        </>
    );
}