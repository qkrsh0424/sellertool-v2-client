import Head from "next/head";
import FooterMain from "../../../views/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../../views/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../../views/navbar/secondary-navbar-v2";
import MainComponent from "../../../views/product-v2/add-product";

export default function ProductAddProductPage(props) {
    return (
        <>
            <Head>
                <title>상품 추가 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}