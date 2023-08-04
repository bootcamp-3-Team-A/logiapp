import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from 'next/app'; // AppProps型をインポート
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) { //分割代入 AppProps型でPropsを受け取る
  // Componentページコンポーネント自体　pagePropsページコンポーネントに渡されるPropsのオブジェクト
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
