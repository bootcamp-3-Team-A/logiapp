import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';

// スクロールをページの一番下に移動する関数
const scrollToBottom = () => {
  window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
};
// スクロールをページの一番上に移動する関数
const scrollToTop = () => {
  window.scroll({ top: 0, behavior: 'smooth' });
};

const TopPage = () => {
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
          <MenuList>
            <MenuItem icon={<AddIcon />} command='⌘T'>
              New Tab
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
              New Window
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
              Open Closed Tab
            </MenuItem>
            <MenuItem icon={<EditIcon />} command='⌘O'>
              Open File...
            </MenuItem>
            <MenuItem onClick={scrollToBottom} icon={<EditIcon />} command='⌘O'>
              Scroll to Bottom
            </MenuItem>
            <MenuItem onClick={scrollToTop} icon={<EditIcon />} command='⌘O'>
              Scroll to Top
            </MenuItem>
            <ScrollLink
              to="about" // スクロール先の要素のIDを指定
              spy={true}
              smooth={true}
              duration={500}
            >
              <MenuItem icon={<EditIcon />} command='⌘A'>
                About
              </MenuItem>
            </ScrollLink>
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
        <Heading as="h1" mb="5" style={{ fontSize: "6rem" }}>
          LOGI
        </Heading>
        <p>ロジカルシンキングをサポートし、作業効率をUPアップさせます</p>
        <Flex mt="20">
          <Button colorScheme="customGray" mr="2" w="120px">
            サインイン
          </Button>
          <Button colorScheme="customGray" w="120px">
            サインアップ
          </Button>
        </Flex>
      </Flex>
      {/* Aboutページ */}
      <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100vh" id="about">
        <Heading as="h1" mb="5" style={{ fontSize: "6rem" }}>
          About
        </Heading>
        <p>aaaaaaaaaaaaaaaa</p>
      </Flex>
    </>
  );
};

export default TopPage;
