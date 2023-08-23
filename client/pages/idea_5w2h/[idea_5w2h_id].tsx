import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Idea5w2hData } from '../idea_5w2h_types';

function Idea5w2hPage() {
  const router = useRouter();
  const { idea_5w2h_id } = router.query;

  const [idea5w2hData, setIdea5w2hData] = useState<Idea5w2hData | null>(null);
  const [editable, setEditable] = useState(false);
  const [saveMessageVisible, setSaveMessageVisible] = useState(false);

  const handleSaveSuccess = () => {
    setSaveMessageVisible(true);
    setTimeout(() => {
      setSaveMessageVisible(false);
      setEditable(false);
    }, 2000);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:8000/5w2h?idea_5w2h_id=${idea_5w2h_id}`,
        );
        const data = await response.json();
        setIdea5w2hData(data);
      } catch (error) {
        console.error('5w2hデータの取得中にエラーが発生しました:', error);
      }
    }

    if (idea_5w2h_id) {
      fetchData();
    }
  }, [idea_5w2h_id]);

  const handleEditToggle = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/5w2h/${idea_5w2h_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(idea5w2hData),
        },
      );

      if (response.ok) {
        handleSaveSuccess();
      } else {
        console.error('5w2hデータの保存中にエラーが発生しました');
      }
    } catch (error) {
      console.error('5w2hデータの保存中にエラーが発生しました:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/5w2h/${idea_5w2h_id}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        router.push('/logical_list');
      } else {
        console.error('Mandalaデータの削除中にエラーが発生しました');
      }
    } catch (error) {
      console.error('Mandalaデータの削除中にエラーが発生しました:', error);
    }
  };

  const handleBack = () => {
    router.push('/logical_list');
  };

  if (!idea5w2hData) {
    return <div>ロード中...</div>;
  }

  return (
    <Box
      backgroundImage="url('/images/mandala.png')" // 画像のパスを指定
      backgroundSize="cover" // 画像のサイズを調整
      backgroundPosition="center" // 画像の位置を調整
      minHeight="100vh" // 最小の高さを画面の高さに設定
      display="flex"
      flexDirection="column" // コンテンツを縦方向に配置
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        {saveMessageVisible && <Text color="green">保存しました</Text>}
        <Heading as="h1" size="3xl" mb="10" color={'gray.600'}>
          5w2h: {idea5w2hData.idea_5w2h_title}
        </Heading>
        <div className="grid-container">
          <div className="grid-item">
            Why:{' '}
            {editable ? (
              <Input
                value={idea5w2hData.why}
                onChange={(e) =>
                  setIdea5w2hData({ ...idea5w2hData, why: e.target.value })
                }
              />
            ) : (
              idea5w2hData.why
            )}
          </div>
          <div className="grid-item">
            When:{' '}
            {editable ? (
              <Input
                value={idea5w2hData.when}
                onChange={(e) =>
                  setIdea5w2hData({ ...idea5w2hData, when: e.target.value })
                }
              />
            ) : (
              idea5w2hData.when
            )}
          </div>
          <div className="grid-item">
            Where:{' '}
            {editable ? (
              <Input
                value={idea5w2hData.where}
                onChange={(e) =>
                  setIdea5w2hData({ ...idea5w2hData, where: e.target.value })
                }
              />
            ) : (
              idea5w2hData.where
            )}
          </div>
          <div className="grid-item">
            Who:{' '}
            {editable ? (
              <Input
                value={idea5w2hData.who}
                onChange={(e) =>
                  setIdea5w2hData({ ...idea5w2hData, who: e.target.value })
                }
              />
            ) : (
              idea5w2hData.who
            )}
          </div>
          <div className="grid-item">
            What:{' '}
            {editable ? (
              <Input
                value={idea5w2hData.what}
                onChange={(e) =>
                  setIdea5w2hData({ ...idea5w2hData, what: e.target.value })
                }
              />
            ) : (
              idea5w2hData.what
            )}
          </div>
          <div className="grid-item">
            How:{' '}
            {editable ? (
              <Input
                value={idea5w2hData.how}
                onChange={(e) =>
                  setIdea5w2hData({ ...idea5w2hData, how: e.target.value })
                }
              />
            ) : (
              idea5w2hData.how
            )}
          </div>
          <div className="grid-item">
            How Much:{' '}
            {editable ? (
              <Input
                value={idea5w2hData.how_much}
                onChange={(e) =>
                  setIdea5w2hData({ ...idea5w2hData, how_much: e.target.value })
                }
              />
            ) : (
              idea5w2hData.how_much
            )}
          </div>
        </div>
        <Flex justifyContent="center" mt="10" flexDirection="row">
          <Button
            colorScheme="customGray"
            mr="2"
            w="120px"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button colorScheme="blue" mr="2" w="120px" onClick={handleBack}>
            戻る
          </Button>
          {!editable ? (
            <Button
              w="120px"
              style={{ backgroundColor: '#553C9A', color: 'white' }}
              onClick={handleEditToggle}
            >
              編集
            </Button>
          ) : (
            <Button
              w="120px"
              style={{ backgroundColor: '#553C9A', color: 'white' }}
              onClick={handleSave}
            >
              保存
            </Button>
          )}
        </Flex>
        <style jsx>{`
          .grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 10px;
            margin-top: 20px;
          }

          .grid-item {
            border: 1px solid #ccc;
            padding: 10px;
          }
        `}</style>
      </Box>
    </Box>
  );
}

export default Idea5w2hPage;
