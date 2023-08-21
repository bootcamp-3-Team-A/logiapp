import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, Text, useDisclosure } from '@chakra-ui/react';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Link as ScrollLink } from 'react-scroll';
import TopButton from "../components/IconButton";


// スクロールをページの一番上に移動する関数
const scrollToTop = () => {
  window.scroll({ top: 0, behavior: 'smooth' });
};

const LogoutButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    if (!session) {
      router.push('/'); // ログアウト後にTop Pageに遷移
    }
  };

  return (
    <MenuItem _focus={{ bg: 'black' }} onClick={handleLogout}>
      Logout ログアウト
    </MenuItem>
  );
};


const TopPage = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();



  // メニューを開く関数
  const openMenu = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  // メニューを閉じる関数
  const closeMenu = () => {
    onClose();
  };



  // メニューをトグルする関数
  const toggleMenu = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }


  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="unstyled"
          ml="auto"
          position="fixed"
          right="1rem"
          onClick={openMenu}
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={() => {
            toggleMenu(); // メニューを閉じるときにもトグルする
          }}
          initialFocusRef={undefined}
        >
          <DrawerOverlay />
          <DrawerContent bg="gray" color="white" >
            <DrawerCloseButton />
            <DrawerHeader>Welcome to LOGI</DrawerHeader>


            <MenuItem _focus={{ bg: 'black' }} onClick={() => {
              closeMenu();
              scrollToTop(); // メニュー項目をクリックした際もスクロールをトップに戻す
            }}>
              Top トップページ
            </MenuItem>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              duration={500}
            >
              <MenuItem _focus={{ bg: 'black' }}>
                About アプリについて
              </MenuItem>
            </ScrollLink>
            <MenuItem _focus={{ bg: 'black' }}>
              Open File...
            </MenuItem>
            <MenuItem _focus={{ bg: 'black' }}>
              Login ログイン
            </MenuItem>
            {session && <LogoutButton />}

          </DrawerContent>
        </Drawer>
      </Menu>


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
        <Text ml="5" mb="80" width="70%" style={{ fontSize: "1.2rem", textAlign: "center" }}>
          LOGIは,タスクを効率的に進め,解決策を見つけるサポートをするサービスです。<br />
          状況に応じてさまざまなロジカルシンキングのフレームワークを選択することができ,<br />
          複雑な問題に対して、スムーズかつ最適なプロセスを提供します。<br />
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
        <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%" py="50px">
          <Heading as="h2" mb="5" style={{ fontSize: "4rem" }}>
            Analysis
          </Heading>
          <Heading as="h2" mb="5" style={{ fontSize: "2rem" }}>
            5W2H
          </Heading>
          <Text>
            状況や事実を「5W2H」の問いかけに答えることで、整理し視覚化することで、新しい視点から問題を分析できます。
          </Text>
          <Image src="/images/What-2.png" alt="Idea Image" mt="20" maxW="800px" mb="100" />
        </Flex>
        {/* Analysisページ */}
        <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%" py="50px">
          <Heading as="h2" mb="5" style={{ fontSize: "4rem" }}>
            Analysis
          </Heading>
          <Heading as="h2" mb="5" style={{ fontSize: "2rem" }}>
            ロジックツリー
          </Heading>
          <Text>
            情報を整理し視覚的に理解しやすくすることで、特定のトピックや問題を解決します。
          </Text>
          <Image src="/images/logicTree.png" alt="Idea Image" mt="50" maxW="600px" mb="20" />
        </Flex>

        <Text>FULLOW US</Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Image src="/images/Instagram.png" mt="10" mb="100" alt="Instagram Icon" maxW="20px" mr="10px" />
          <Image src="/images/Twitter.png" mt="10" mb="100" alt="Twitter Icon" maxW="20px" />
        </Box>

        <Text>Team LOGI 2023</Text>

      </Flex>
      <TopButton />
    </>
  );
};

export default TopPage;
