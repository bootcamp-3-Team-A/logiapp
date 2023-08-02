// import '../styles/globals.css';
// import type { AppProps } from 'next/app';

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;



import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app'; // AppProps型をインポート

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
