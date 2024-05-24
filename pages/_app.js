// import App from 'next/app'
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultLayout } from "../layouts/DefaultLayout";
import "@fontsource/poppins"
import { theme } from '../theme'
import '../styles/CKEditor.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <DefaultLayout>
          <Component  {...pageProps} />
        </DefaultLayout>
      </ChakraProvider>
      <style jsx global>
        {`
        body {
  overscroll-behavior: contain;
}
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          /* background: #f1f1f1 */
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background: #A3A3A3;
          border-radius: 6px;
          height: 50%;
        }
      `}
      </style>
    </>
  );
}

export default MyApp;
