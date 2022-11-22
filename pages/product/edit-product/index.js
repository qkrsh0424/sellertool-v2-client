import Head from "next/head";
import FooterMain from "../../../component/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../../component/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../../component/navbar/secondary-navbar-v2";
import MainComponent from "../../../component/product-v2/edit-product";

export default function ProductEditProductPage(props) {
    return (
        <>
            <Head>
                <title>상품 수정 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}