import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

const MandalChart = () => {
  const [topic, setTopic] = useState('');
  const [responses, setResponses] = useState<string[]>(
    Array.from({ length: 9 }, () => 'Data'),
  );
  const [isLoading, setIsLoading] = useState(false); // 新しいisLoadingステート

  const handleStartButton = async () => {
    try {
      setIsLoading(true); // fetch開始時にisLoadingをtrueに設定

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
        >; // Parse the JSON response and specify the type
        const dataValues = Object.values(responseData);
        setResponses(dataValues);
      } else {
        const errorData = await response.json();
        console.error('Error occurred:', errorData.message);
      }
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    } finally {
      setIsLoading(false); // fetch完了時にisLoadingをfalseに設定
    }
  };

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Heading as="h1" size="xl" mb="4">
          Mandala Chart
        </Heading>
        {isLoading && (
          <Heading as="h1" size="xl" mt="4">
            Loading...
          </Heading>
        )}
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
        <Button mt="4" colorScheme="teal" onClick={handleStartButton}>
          Start
        </Button>
      </Flex>
    </ChakraProvider>
  );
};

export default MandalChart;
