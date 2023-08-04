import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

const MandalaChart = () => {
  const [topic, setTopic] = useState('');
  const [responses, setResponses] = useState<string[]>(
    Array.from({ length: 9 }, () => 'Data'),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // 新しいステート

  const handleStartButton = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: topic }),
      });

      if (response.ok) {
        const data = await response.json();
        const responseData = JSON.parse(data.response) as Record<
          string,
          string
        >;
        const dataValues = Object.values(responseData);
        setResponses(dataValues);
      } else {
        const errorData = await response.json();
        console.error('Error occurred:', errorData.message);
      }
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    } finally {
      setIsLoading(false);
      setIsEditMode(true);
      setIsSaving(true); // データのフェッチが終わったら保存可能として「保存」ボタンを表示
    }
  };

  const handleSaveButton = () => {
    // 保存処理をここに実装する
    console.log('Saving data:', responses);
    setIsSaving(false); // 保存が完了したら「保存」ボタンを非表示にする
  };

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
    setIsSaving(false); // 「編集」ボタンをクリックしたら「保存」ボタンを非表示にする
  };

  return (
    <ChakraProvider>
      <Box
        display="grid"
        placeItems="center" // ここで全体を中央に配置します
        height="100vh"
      >
        <Heading as="h1" size="xl" mb="4">
          Mandala Chart
        </Heading>
        <Input
          placeholder="Mandala Chartのタイトルを入力"
          borderColor="teal.500"
          textAlign="center"
          fontSize="xl"
          p="4"
          borderRadius="md"
          width="30%"
          mt="2"
          mb="6"
        />
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="4px">
          {Array.from({ length: 9 }).map((_, index) => (
            <Box
              key={index}
              backgroundColor={index === 4 ? 'red.200' : 'gray.200'}
              borderWidth="1px"
              borderColor="transparent"
              p="4"
              textAlign="center"
              minHeight="100px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {index === 4 ? (
                <Input
                  placeholder="トピックを入力"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  borderColor="transparent"
                  textAlign="center"
                  minHeight="unset"
                />
              ) : (
                responses[index]
              )}
            </Box>
          ))}
        </Box>
        <Flex mt="4" w="10%">
          <Button flex="1" colorScheme="teal" onClick={handleStartButton}>
            Start
          </Button>
          {!isLoading && isEditMode && (
            <>
              <Button
                flex="1"
                colorScheme="teal"
                w="10%"
                onClick={toggleEditMode}
                ml="2"
              >
                Edit
              </Button>
              {isSaving && (
                <Button
                  flex="1"
                  colorScheme="teal"
                  w="10%"
                  onClick={handleSaveButton}
                  ml="2"
                >
                  Save
                </Button>
              )}
            </>
          )}
        </Flex>
        {isLoading && (
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="rgba(255, 255, 255, 0.7)"
            p="4"
            zIndex="9999"
            borderRadius="md"
          >
            <Heading as="h1" size="xl">
              Loading...
            </Heading>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default MandalaChart;
