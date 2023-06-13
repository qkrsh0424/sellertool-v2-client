import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import { ServerStyleSheet } from 'styled-components';
import { CustomDefaultBackdrop } from '../components/backdrop/default/v1/components';

class MyDocument extends Document {

    // styled-components와 material-ui를 css 깨짐 없이 사용하기 위해서 초기 렌더전에 ssr 단계에서 처리하는 작업.
    // it's compatible with server-side generation (SSG).
    static async getInitialProps(ctx) {
        // Step 1: Create an instance of ServerStyleSheet
        const styledComponentsSheet = new ServerStyleSheet();
        const materialSheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;
        try {
            // Step 2: Retrieve styles from components in the page
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />))
            });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <React.Fragment>
                        {initialProps.styles}
                        {materialSheets.getStyleElement()}
                        {styledComponentsSheet.getStyleElement()}
                    </React.Fragment>)
            }
        } finally {
            styledComponentsSheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument