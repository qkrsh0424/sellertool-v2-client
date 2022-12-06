import Head from "next/head";
import FooterMain from '../../component/footer/FooterMain';
import MainComponent from "../../component/inventory/root";
import PrimaryNavbarMainComponent from '../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../component/navbar/secondary-navbar-v2';

export default function InventoryPage(props) {
    return (
        <>
            <Head>
                <title>재고 관리 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}