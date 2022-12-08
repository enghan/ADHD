import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IntlProvider } from "react-intl";
import Head from "next/head";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {useRouter} from "next/router";
import ar from "../lang/ar";
import en from "../lang/en";
import {RecoilRoot} from "recoil";
import AppBar from "../components/appbar";
import {ChakraProvider} from '@chakra-ui/react';
import theme from "../theme";
import FooterBar from "../components/footer";
import CopyRightDiv from "../components/copy_right_part";
import '../styles/globals.css'
import Fonts from "../font";
import {getCookie} from "./services/lang_cookies";
import {useEffect, useState} from "react";

const messages = {
  ar,
  en,
};
function getDirection(locale:string) {
    if (locale === "ar") {
        return "rtl";
    }

    return "ltr";
}
function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState();
    useEffect(() => {
        setSession( getCookie("language"))
        console.log("session "+session)
    }, []);

  return (

      <RecoilRoot>
          <ChakraProvider theme={theme}>
              <Fonts />

          <IntlProvider locale={session} messages={messages[session]} defaultLocale={'ar'} >
            <Head>
              <link rel="icon" href="/favicon.ico" />
              <title>React App</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="description" content="Web site created using create-next-app" />
              <meta name="theme-color" content="#000000" />
            </Head>
            <AppBar/>
            <Component {...pageProps} dir={getDirection(session)} />
              <FooterBar />
              <CopyRightDiv />
          </IntlProvider>
          </ChakraProvider>
      </RecoilRoot>

  );
}

export default MyApp
