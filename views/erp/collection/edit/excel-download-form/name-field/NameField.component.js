import CustomInput from "../../../../../modules/input/CustomInput";
import { Container, InputBox, InputGroup, SelectItemListContainer, TitleContainer } from "./NameField.styled";

export default function NameFieldComponent({
    name,
    onChangeName,
    description,
    onChangeDescription
}) {
    return (
        <>
            <Container>
                <TitleContainer>
                    <div className='title'>다운로드 폼 정보</div>
                </TitleContainer>
                <InputGroup>
                    <InputBox>
                        <div className='label'>
                            <span className='required-tag'></span>
                            다운로드 폼 명
                        </div>
                        <div className='mgl-flex mgl-flex-alignItems-center'>
                            <CustomInput
                                type='text'
                                className='input-item'
                                value={name || ''}
                                onChange={(e) => onChangeName(e)}
                                maxLength={20}
                                required
                            />
                            <div className='length-tag'>{name?.length} / 20</div>
                        </div>
                    </InputBox>
                    <InputBox>
                        <div className='label'>설명</div>
                        <div className='mgl-flex mgl-flex-alignItems-center'>
                            <CustomInput
                                type='text'
                                className='input-item'
                                value={description || ''}
                                onChange={(e) => onChangeDescription(e)}
                                maxLength={50}
                            />
                            <div className='length-tag'>{description?.length} / 50</div>
                        </div>
                    </InputBox>
                </InputGroup>
            </Container>
        </>
    );
}