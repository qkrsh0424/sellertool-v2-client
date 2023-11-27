import { FdButtonGroup } from "./components/FdButtonGroup/FdButtonGroup";
import { FdItemList } from "./components/FdItemList/FdItemList";
import { FdTopNavBar } from "./components/FdTopNavBar";
import { PrepareReleaseItemListProvider } from "./contexts/PrepareReleaseItemListProvider";
import { St } from "./index.styled";

export default function MainComponent(props) {
    return (
        <>
            <St.Container>
                <FdTopNavBar />
                <PrepareReleaseItemListProvider>
                    <FdButtonGroup />
                    <FdItemList />
                </PrepareReleaseItemListProvider>
            </St.Container>
        </>
    );
}