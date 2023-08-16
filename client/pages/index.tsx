<<<<<<< HEAD
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import TopButton from "../components/IconButton";


// スクロールをページの一番上に移動する関数
const scrollToTop = () => {
  window.scroll({ top: 0, behavior: 'smooth' });
};

const LogoutButton = () => {

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <MenuItem onClick={handleLogout}>
      Logout ログアウト
    </MenuItem>
  );
};


const TopPage = () => {

  const { data: session } = useSession();

  const handleGoBack = () => {
    if (session) {
      // ログイン状態であればトップページにリダイレクト
      window.location.href = '/';
    }
  };

  return (
    <>
      {/* ハンバーガーメニュー */}
      <Box position="fixed" top="10px" right="10px">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant="unstyled"
          />
          <MenuList color="gray" >
            <MenuItem onClick={scrollToTop}>
              Top トップページ
            </MenuItem>
            <ScrollLink
              to="about" // スクロール先の要素のIDを指定
              spy={true}
              smooth={true}
              duration={500} //スクロールアニメーションの実行500ミリ秒
            >
              <MenuItem>
                About アプリについて
              </MenuItem>
            </ScrollLink>
            <MenuItem>
              Open File...
            </MenuItem>
            <MenuItem>
              SignUp 新規登録
            </MenuItem>
            <MenuItem>
              Login ログイン
            </MenuItem>
            {session && (
              <LogoutButton />
            )}
          </MenuList>
        </Menu>
      </Box>

      <Box
        position="fixed"
        top="10px"
        left="10px"
        backgroundImage="url('/images/background.png')"
        backgroundSize="cover" // 画像をコンテナに合わせて調整
        backgroundRepeat="no-repeat"
        width="100vw"
        height="100vh"
        zIndex="-1" // 背景画像は他の要素よりも背面に表示
      >
      </Box>

      {/* トップページ */}
      <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Heading colorScheme="customGray" as="h1" mb="5" style={{ fontSize: "6rem" }} >
          LOGI
        </Heading>
        <p>ロジカルシンキングをサポートし、作業効率をUPアップさせます</p>
        <Flex mt="20">
          {!session ? (
            <Button onClick={() => signIn()} colorScheme="customGray" mr="2" w="120px">
              サインイン
            </Button>
          ) : (
            <Link href="/start">
              <Button colorScheme="customGray" mr="2" w="120px">
                Start
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
      {/* Aboutページ */}
      <Flex flexDirection="column" alignItems="center" justifyContent="flex-start" height="100vh" id="about">
        <Heading as="h1" mt="15" ml="5" mb="20" >
          About us...
        </Heading>
        <Text ml="5" mb="80" width="70%" style={{ fontSize: "1.2rem" }}>
          LOGIは、タスクを効率的に進めることをサポートするサービスです。<br />
          状況に応じてさまざまなロジカルシンキングのフレームワークを選択することができます。<br />
          それにより、異なる問題に対して最適なアプローチを見つけます。<br />
          複雑な問題を整理し、解決策を見つける際に、よりスムーズかつ効果的なプロセスを経ることができるでしょう。<br />
        </Text>

        <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%">
          <Heading as="h2" mb="5" style={{ fontSize: "4rem" }}>
            Idea
          </Heading>
          <Heading as="h2" mb="5" style={{ fontSize: "2rem" }}>
            マンダラチャート
          </Heading>
          <Text>
            マンダラチャートを使用し、一つのトピックに対して自動で関連するアイデアを出してくれます。
          </Text>
          <Image src="/images/mandala-chart.jpg" alt="Idea Image" mt="20" maxW="400px" mb="80" />

        </Flex>

        {/* Analysisページ */}
        <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%" height="100vh">
          <Heading as="h2" mb="5" style={{ fontSize: "4rem" }}>
            Analysis
          </Heading>
          <Heading as="h2" mb="5" style={{ fontSize: "2rem" }}>
            5W2H
          </Heading>
          <Text>
            状況や事実を「5W2H」の問いかけに答えることで、整理し視覚化することで、新しい視点から問題を分析できます。
          </Text>
          <Image src="/images/What-2.png" alt="Idea Image" mt="20" maxW="800px" mb="80" />
        </Flex>
        {/* Analysisページ */}
        <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%" height="100vh">
          <Heading as="h2" mb="5" style={{ fontSize: "4rem" }}>
            Analysis
          </Heading>
          <Heading as="h2" mb="5" style={{ fontSize: "2rem" }}>
            ロジックツリー
          </Heading>
          <Text>
            情報を整理し視覚的に理解しやすくすることで、特定のトピックや問題を解決します。
          </Text>
          <Image src="/images/logicTree.png" alt="Idea Image" mt="20" maxW="600px" mb="20" />
        </Flex>


        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          height="30%"
          width="100%"
          backgroundColor="blue.100"
        >
          <Image src="/images/Instagram.png" alt="Instagram Icon" maxW="20px" mr="10px" />
          <Image src="/images/Twitter.png" alt="Twitter Icon" maxW="20px" />
        </Flex>


      </Flex>
      <TopButton />
    </>
  );
};

export default TopPage;
=======
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
>>>>>>> 6685d4c (Initial commit)
