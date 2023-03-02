import { Container, DescriptionFieldWrapper, TitleFieldWrapper } from "./PageHeader.styled";

function Title({ element }) {
    return (
        <TitleFieldWrapper>
            {element}
        </TitleFieldWrapper>
    );
}

function Description({ element }) {
    return (
        <DescriptionFieldWrapper>
            {element}
        </DescriptionFieldWrapper>
    );
}

const PageHeaderComponent = (props) => {
    return (
        <>
            <Container>
                <Title
                    element={'셀러툴을 어떤 용도로 사용하실 계획인가요?'}
                />
                <Description
                    element={'사용목적에 맞게 워크스페이스를 생성해보세요.'}
                />
            </Container>
        </>
    );
}
export default PageHeaderComponent;