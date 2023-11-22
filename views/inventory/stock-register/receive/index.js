import { FdButtonGroup } from "./components/FdButtonGroup/FdButtonGroup";
import { FdItemList } from "./components/FdItemList";
import { FdTopNavBar } from "./components/FdTopNavBar";
import { PrepareReceiveItemListProvider } from "./contexts/PrepareReceiveItemListProvider";
import { St } from "./index.styled";

export default function MainComponent(props) {
    return (
        <>
            <St.Container>
                <FdTopNavBar />
                <PrepareReceiveItemListProvider>
                    <FdButtonGroup />
                    <FdItemList />
                </PrepareReceiveItemListProvider>
            </St.Container>
        </>
    );
}