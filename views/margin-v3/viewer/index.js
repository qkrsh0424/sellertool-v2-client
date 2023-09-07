import styled from "styled-components";
import HeadComponent from "./head/Head.component";
import useMarginRecordHook from "./hooks/useMarginRecordHook";
import ContentFieldComponent from './content-field/ContentField.component';
import NameFieldComponent from "./name-field/NameField.component";

const Container = styled.div`
    overflow: hidden;
    background: var(--defaultBackground);
    padding-bottom: 150px;
`;

const MainComponent = () => {
    const {
        marginRecord
    } = useMarginRecordHook();

    return (
        <>
            <Container>
                <HeadComponent />
                <NameFieldComponent
                    marginRecord={marginRecord}
                />
                <ContentFieldComponent
                    marginRecord={marginRecord}
                />
            </Container>
        </>
    );
}

export default MainComponent;