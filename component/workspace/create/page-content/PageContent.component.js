import { useEffect, useReducer } from "react";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import ItemListFieldView from "./ItemListField.view";
import OperationFieldView from "./OperationField.view";
import { Container } from "./PageContent.styled";

const PageContentComponent = (props) => {
    return (
        <>
            <Container>
                <ItemListFieldView
                    workspaceType={props.workspace.publicYn === 'y' ? 'public' : 'private'}

                    onActionSelectPublic={props._onSelectPublic}
                    onActionSelectPrivate={props._onSelectPrivate}
                />
                <OperationFieldView
                    onContinue={props._onOpenNameModal}
                />
            </Container>
        </>
    );
}
export default PageContentComponent;