import styled from "styled-components";
import CalculatorMain from "../../calculator/CalculatorMain";
import ContentFieldComponent from "./content-field/ContentField.component";
import HeadComponent from "./head/Head.component";
import useMarginRecordHook from "./hooks/useMarginRecordHook";

const Container = styled.div`
    overflow: hidden;
    background: var(--defaultBackground);
    padding-bottom: 150px;
`;

const MainComponent = () => {
    const {
        marginRecord,
        reqCreateMarginRecord,
        reqUpdateMarginRecord,
        reqDeleteMarginRecord
    } = useMarginRecordHook();

    const __handle = {
        submit: {
            createMarginRecord: async ({
                body,
                successCallback
            }) => {
                await reqCreateMarginRecord({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            updateMarginRecord: async ({
                body,
                successCallback
            }) => {
                await reqUpdateMarginRecord({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            deleteMarginRecord: async ({
                body,
                successCallback
            }) => {
                await reqDeleteMarginRecord({
                    body: body,
                    successCallback: () => {
                        successCallback()
                    }
                })
            }
        }
    }
    return (
        <>
            <Container>
                <HeadComponent />
                <ContentFieldComponent
                    marginRecord={marginRecord}

                    onSubmitCreateMarginRecord={__handle.submit.createMarginRecord}
                    onSubmitUpdateMarginRecord={__handle.submit.updateMarginRecord}
                    onSubmitDeleteMarginRecord={__handle.submit.deleteMarginRecord}
                />
            </Container>
            <CalculatorMain></CalculatorMain>
        </>
    );
}

export default MainComponent;