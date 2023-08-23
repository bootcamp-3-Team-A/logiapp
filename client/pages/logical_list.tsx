import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, List, ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Idea5w2hData } from './idea_5w2h_types';
import { MandalaData } from './mandala_types';

function MandalaListPage() {
  const [mandalaDataList, setMandalaDataList] = useState<MandalaData[]>([]);
  const [idea5w2hDataList, setIdea5w2hDataList] = useState<Idea5w2hData[]>([]);

  useEffect(() => {
    async function fetchMandalaData() {
      try {
        const response = await fetch('http://localhost:8000/mandala_list');
        const data = await response.json();
        setMandalaDataList(data);
      } catch (error) {
        console.error('Mandalaデータの取得中にエラーが発生しました:', error);
      }
    }

    async function fetchIdea5w2hData() {
      try {
        const response = await fetch('http://localhost:8000/5w2h_list');
        const data = await response.json();
        setIdea5w2hDataList(data);
      } catch (error) {
        console.error('5w2hデータの取得中にエラーが発生しました:', error);
      }
    }

    fetchMandalaData();
    fetchIdea5w2hData();
  }, []);

  return (
    <Box
      backgroundImage="url('/images/mandala.png')" // 画像のパスを指定
      backgroundSize="cover" // 画像のサイズを調整
      backgroundPosition="center" // 画像の位置を調整
      width="100%" // ボックスの幅
      height="100vh" // ボックスの高さ
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Flex>
        <Box
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          mr={20} // ボックス間の横のマージン
        >
          <Heading as="h1" size="3xl" color="gray.600">
            Mandala List
          </Heading>
          <List>
            {mandalaDataList.map((mandalaData) => (
              <ListItem key={mandalaData.mandala_id} mb={2}>
                <Link href={`/mandala/${mandalaData.mandala_id}`}>
                  {mandalaData.mandala_title}
                  <ChevronRightIcon ml={1} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          ml={6} // ボックス間の横のマージン
        >
          <Heading as="h1" size="3xl" color="gray.600">
            5w2h List
          </Heading>
          <List>
            {idea5w2hDataList.map((idea5w2hData) => (
              <ListItem key={idea5w2hData.idea_5w2h_id} mb={2}>
                <Link
                  href={`idea_5w2h/${idea5w2hData.idea_5w2h_id}`}
                  color="blue.500"
                >
                  {idea5w2hData.idea_5w2h_title}
                  <ChevronRightIcon ml={1} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
      <Link href="/start">
        <Button colorScheme="blue" w="120px" ml="16" mt={10}>
          戻る
        </Button>
      </Link>
    </Box>
  );
}

export default MandalaListPage;
