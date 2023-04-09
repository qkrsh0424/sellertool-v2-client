import { useRouter } from "next/router";
import styled from "styled-components";
import CalculatorMain from "../../calculator/CalculatorMain";
import ContentFieldComponent from "./content-field/ContentField.component";
import HeadComponent from "./head/Head.component";
import useMarginRecordHook from "./hooks/useMarginRecordHook";
import useMarginRecordPageHook from "./hooks/useMarginRecordPageHook";
import NameFieldComponent from "./name-field/NameField.component";

const Container = styled.div`
    overflow: hidden;
    background: var(--defaultBackground);
    padding-bottom: 150px;
`;

const MainComponent = () => {
    const router = useRouter();
    const {
        marginRecordPage,
        reqFetchMarginRecordPage,
        size: MARGIN_RECORDS_SIZE,
        page: MARGIN_RECORDS_PAGE,
        onChangePage,
        onChangeSize
    } = useMarginRecordPageHook();

    const {
        marginRecord,
        reqCreateMarginRecord,
        reqUpdateMarginRecord,
        reqDeleteMarginRecord
    } = useMarginRecordHook();

    const handleSubmitCreateMarginRecord = async (body, successCallback) => {
        await reqCreateMarginRecord({
            body: body,
            successCallback: () => {
                successCallback();
                reqFetchMarginRecordPage();
            }
        })
    }

    const handleSubmitUpdateMarginRecord = async (body, successCallback) => {
        await reqUpdateMarginRecord({
            body: body,
            successCallback: () => {
                successCallback();
                reqFetchMarginRecordPage();
            }
        })
    }

    const handleSubmitDeleteMarginRecord = async (body, successCallback) => {
        await reqDeleteMarginRecord({
            body: body,
            successCallback: () => {
                successCallback();
                router.replace({
                    pathname: '/margin/dashboard'
                });
                reqFetchMarginRecordPage();
            }
        })
    }

    return (
        <>
            <Container>
                <HeadComponent />
                <NameFieldComponent
                    marginRecordPage={marginRecordPage}
                    marginRecord={marginRecord}
                    onSubmitDeleteMarginRecord={handleSubmitDeleteMarginRecord}
                    MARGIN_RECORDS_SIZE={MARGIN_RECORDS_SIZE}
                    MARGIN_RECORDS_PAGE={MARGIN_RECORDS_PAGE}
                    onChangePage={onChangePage}
                    onChangeSize={onChangeSize}
                />
                <ContentFieldComponent
                    marginRecords={marginRecordPage?.content}
                    marginRecord={marginRecord}

                    onSubmitCreateMarginRecord={handleSubmitCreateMarginRecord}
                    onSubmitUpdateMarginRecord={handleSubmitUpdateMarginRecord}
                />
            </Container>
            <CalculatorMain></CalculatorMain>
        </>
    );
}

export default MainComponent;