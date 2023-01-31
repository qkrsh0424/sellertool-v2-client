import Head from "next/head";
import FooterMain from '../../views/footer/FooterMain';
import MainComponent from "../../views/inventory/root";
import PrimaryNavbarMainComponent from '../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../views/navbar/secondary-navbar-v2';

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