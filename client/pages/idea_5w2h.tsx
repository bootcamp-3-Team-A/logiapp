import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react';
import router from 'next/router';
import { useState } from 'react';

const FiveW2HChart = () => {
  const questions = ['Who', 'What', 'When', 'Where', 'Why', 'How', 'How much'];

  const [inputs, setInputs] = useState(Array(7).fill(''));

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleStartButton = async () => {
    const formData = {
      why: inputs[4], // Make sure the index matches the order of questions
      when: inputs[2],
      where: inputs[3],
      who: inputs[0],
      what: inputs[1],
      how: inputs[5],
      how_much: inputs[6],
      idea_5w2h_title: inputs[7],
    };

    try {
      const response = await fetch('http://localhost:8000/5w2h', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response from server:', responseData);
        router.push('/logical_list');
      } else {
        const errorData = await response.json();
        console.error('エラーが発生しました:', errorData.message);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        marginTop="20px" // Headingの上にマージンを追加
      >
        <Heading as="h1" size="xl" mb="4">
          5W2H Framework
        </Heading>
        <Box width="50%" mb="4">
          <Input
            placeholder="Enter title"
            value={inputs[7]}
            onChange={(e) => handleInputChange(7, e.target.value)}
            borderColor="transparent"
            textAlign="center"
          />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr" gridGap="4px" width="50%">
          {questions.map((question, index) => (
            <Flex
              key={index}
              backgroundColor="gray.200"
              borderWidth="1px"
              borderColor="transparent"
              p="4"
              alignItems="stretch"
              justifyContent="space-between"
              height="100px"
            >
              <Box
                flex="1"
                marginRight="15px"
                paddingRight="15px"
                borderRight="2px solid white"
              >
                <span>{question}</span>
              </Box>
              <Box flex="2">
                <Input
                  placeholder={`Enter ${question}`}
                  value={inputs[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  borderColor="transparent"
                  textAlign="center"
                />
              </Box>
            </Flex>
          ))}
        </Box>
        <Button mt="4" colorScheme="teal" onClick={handleStartButton}>
          保存
        </Button>
      </Flex>
    </ChakraProvider>
  );
};

export default FiveW2HChart;
