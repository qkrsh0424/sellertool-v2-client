import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { workspaceMemberDataConnect } from "../../../data_connect/workspaceMemberDataConnect";
import NotAllowedComponent from "../../modules/not-allowed/NotAllowedComponent";
import InviteMemberComponent from "./invite-member/InviteMember.component";
import MemberTableComponent from "./member-table/MemberTable.component";
import TitleComponent from "./title/Title.component";

const WorkspaceManagementMainComponent = (props) => {
    const workspaceRdx = useSelector(state => state.workspaceState);
    const userRdx = useSelector(state => state.userState);

    const [workspaceMembers, dispatchWorkspaceMembers] = useReducer(workspaceMembersReducer, initialWorkspaceMembers);

    useEffect(() => {
        if (!workspaceRdx.info) {
            return;
        }

        __workspaceMember.req.fetchWorkspaceMember(workspaceRdx.info.id);
    }, [workspaceRdx.info])

    const __workspaceMember = {
        req: {
            fetchWorkspaceMember: async (workspaceId) => {
                await workspaceMemberDataConnect().searchList(workspaceId)
                    .then(res => {
                        if (res.status === 200) {
                            dispatchWorkspaceMembers({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            }
        }
    }

    if (userRdx.isLoading === true) {
        return null;
    }

    if (userRdx.isLoading === false && (!userRdx.info || !workspaceRdx.info)) {
        return (
            <NotAllowedComponent></NotAllowedComponent>
        );
    }

    return (
        <>
            <TitleComponent
                workspaceInfo={workspaceRdx.info}
            ></TitleComponent>
            <MemberTableComponent
                workspaceMembers={workspaceMembers}
            ></MemberTableComponent>
            <InviteMemberComponent

            ></InviteMemberComponent>
        </>
    );
}
export default WorkspaceManagementMainComponent;

const initialWorkspaceMembers = null;

const workspaceMembersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialWorkspaceMembers;
    }
}