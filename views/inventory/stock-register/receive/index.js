import { FdButtonGroup } from "./components/FdButtonGroup/FdButtonGroup";
import { FdTopNavBar } from "./components/FdTopNavBar";
import { St } from "./index.styled";

export default function MainComponent(props) {
    return (
        <>
            <St.Container>
                <FdTopNavBar />
                <FdButtonGroup />
            </St.Container>
        </>
    );
}