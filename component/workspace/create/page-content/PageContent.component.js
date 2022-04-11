import { useReducer } from "react";
import ItemListFieldView from "./ItemListField.view";
import OperationFieldView from "./OperationField.view";
import { Container } from "./PageContent.styled";

const PageContentComponent = (props) => {
    const [workspaceType, dispatchWorkspaceType] = useReducer(workspaceTypeReducer, initialWorkspaceType);

    const onActionSelectPublic = () => {
        dispatchWorkspaceType({
            type: 'SET_DATA',
            payload: 'public'
        })
    }

    const onActionSelectPrivate = () => {
        dispatchWorkspaceType({
            type: 'SET_DATA',
            payload: 'private'
        })
    }

    return (
        <>
            <Container>
                <ItemListFieldView
                    workspaceType={workspaceType}

                    onActionSelectPublic={onActionSelectPublic}
                    onActionSelectPrivate={onActionSelectPrivate}
                />
                <OperationFieldView

                />
            </Container>
        </>
    );
}
export default PageContentComponent;

const initialWorkspaceType = 'private';

const workspaceTypeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialWorkspaceType
    }
}