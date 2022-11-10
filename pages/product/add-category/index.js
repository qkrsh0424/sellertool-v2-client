import Head from "next/head";
import FooterMain from "../../../component/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../../component/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../../component/navbar/secondary-navbar-v2";
import MainComponent from "../../../component/product-v2/add-category";

export default function ProductAddCategoryPage(props) {
    return (
        <>
            <Head>
                <title>카테고리 추가 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}