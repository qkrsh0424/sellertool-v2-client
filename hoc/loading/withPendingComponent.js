import { HocCircularProgressLoading, HocEmptyItems } from "./components";

export function withPendingComponent({
    Component = () => <></>,
    EmptyComponent = () => <HocEmptyItems />,
    LoadingComponent = () => <HocCircularProgressLoading />
}) {
    function WrappedComponent({ pendingDatas, ...props }) {
        if (!pendingDatas) {
            return <LoadingComponent />;
        } else if (pendingDatas && pendingDatas?.length <= 0) {
            return <EmptyComponent />;
        } else {
            return <Component {...props} />;
        }
    }

    return WrappedComponent;
}

