import { FdButtonGroup } from "./components/FdButtonGroup/FdButtonGroup";
import { FdItemList } from "./components/FdItemList";
import { FdTopNavBar } from "./components/FdTopNavBar";
import { useStockReceiveItemHook } from "./hooks/useStockReceiveItemHook";
import { St } from "./index.styled";

export default function MainComponent(props) {;
    const stockReceiveItemHook = useStockReceiveItemHook();
    return (
        <>
            <St.Container>
                <FdTopNavBar />
                <FdButtonGroup
                    stockReceiveItemList={stockReceiveItemHook?.stockReceiveItemList}
                    onConcatStockReceiveItems={stockReceiveItemHook.onConcatStockReceiveItems}
                />
                <FdItemList
                    stockReceiveItemList={stockReceiveItemHook.stockReceiveItemList}
                />
            </St.Container>
        </>
    );
}