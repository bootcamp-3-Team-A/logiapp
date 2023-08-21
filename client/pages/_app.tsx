import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app'; // AppProps型をインポート
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  //分割代入 AppProps型でPropsを受け取る
  // Componentページコンポーネント自体　pagePropsページコンポーネントに渡されるPropsのオブジェクト

  // pagePropsからsessionを分割代入して取得
  const { session, ...restPageProps } = pageProps;

  return (
    <ChakraProvider theme={theme}>
      {/* sessionをSessionProviderに渡し、残りのpagePropsをそのままComponentに渡す */}
      <SessionProvider session={session}>
        <Component {...restPageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
