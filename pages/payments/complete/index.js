import Head from "next/head";
import PrimaryNavbarMainComponent from "../../../views/navbar/primary-navbar";
import MainComponent from "../../../views/payments/complete/v1";

export default function PaymentsCompletePage(props) {
    return (
        <>
            <Head>
                <title>결제완료 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <MainComponent />
        </>
    );
}