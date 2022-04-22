import { useEffect, useState } from "react";
import FieldLoading from "../../../modules/FieldLoading";
import { Container, TitleFieldWrapper } from "./MemberTable.styled";
import TableFieldView from "./TableField.view";

const MemberTableComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!props.workspaceMembers) {
            setIsLoading(true);
            return;
        }
        setIsLoading(false);
    }, [props.workspaceMembers]);

    if (!props.workspaceMembers) {
        return null;
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    멤버 리스트
                </TitleFieldWrapper>
                {isLoading &&
                    <FieldLoading
                        marginTop={100}
                        marginBottom={100}
                    />
                }
                <TableFieldView
                    workspaceMembers={props.workspaceMembers}
                ></TableFieldView>
            </Container>
        </>
    );
}
export default MemberTableComponent;