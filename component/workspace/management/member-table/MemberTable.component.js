import { Container, TitleFieldWrapper } from "./MemberTable.styled";
import TableFieldView from "./TableField.view";

const MemberTableComponent = (props) => {
    console.log(props.workspaceMembers);
    if (!props.workspaceMembers) {
        return null;
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    멤버 리스트
                </TitleFieldWrapper>
                <TableFieldView
                    workspaceMembers={props.workspaceMembers}
                ></TableFieldView>
            </Container>
        </>
    );
}
export default MemberTableComponent;