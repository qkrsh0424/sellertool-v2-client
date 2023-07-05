import CustomInput from "../../../../../components/input/default/v1/CustomInput";
import { ButtonFieldBox, Container, InputFieldBox, Wrapper } from "./styles/InputField.styled";
import CustomImage from "../../../../modules/image/CustomImage";
import useNRankRecordFormHook from "./hooks/useNRankRecordFormHook";

export function InputFieldComponent() {
    const {
        keyword,
        mallName,
        onChangeKeyword,
        onChangeMallName,
        reqCreateSearchInfo
    } = useNRankRecordFormHook();

    return (
        <>
            <Container>
                <form onSubmit={() => reqCreateSearchInfo()} method="post">
                    <Wrapper>
                        <InputFieldBox>
                            <CustomInput
                                type='text'
                                name='keyword'
                                value={keyword || ''}
                                className='input-el'
                                placeholder='검색 키워드'
                                onChange={(e) => onChangeKeyword(e)}
                            />
                            <CustomInput
                                type='text'
                                name='mallName'
                                value={mallName || ''}
                                className='input-el'
                                placeholder='검색 스토어명'
                                onChange={(e) => onChangeMallName(e)}
                            />
                        </InputFieldBox>
                        <ButtonFieldBox>
                            <div className='submit-button-box'>
                                <button
                                    type='submit'
                                    className='submit-button-el'
                                >
                                    <CustomImage
                                        src='/images/icon/add_default_ffffff.svg'
                                    />
                                </button>
                            </div>
                        </ButtonFieldBox>
                    </Wrapper>
                </form>
            </Container>
        </>   
    )
}