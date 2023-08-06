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
    Array.from({ length: 81 }, () => 'Data'),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedResponses, setEditedResponses] = useState<string[]>(responses);

  const handleStartButton = async () => {
    if (topic.trim() === '') {
      // If the topic input is empty or contains only whitespaces, prevent starting
      return;
    }

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

        // Store the received data in the specified grid cells (30, 31, 32, 39, 41, 48, 49, 50)
        setResponses((prevResponses) => {
          const newResponses = [...prevResponses];
          newResponses[30] = dataValues[0];
          newResponses[31] = dataValues[1];
          newResponses[32] = dataValues[2];
          newResponses[39] = dataValues[3];
          newResponses[41] = dataValues[4];
          newResponses[48] = dataValues[5];
          newResponses[49] = dataValues[6];
          newResponses[50] = dataValues[7];
          return newResponses;
        });

        setEditedResponses(dataValues);
      } else {
        const errorData = await response.json();
        console.error('Error occurred:', errorData.message);
      }
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    } finally {
      setIsLoading(false);
      setIsEditMode(false); // Reset edit mode to false when loading is complete
    }
  };

  const handleSaveButton = () => {
    setResponses([...editedResponses]);
    setIsEditMode(false);
    createNewGridAroundCenter();
  };

  const createNewGridAroundCenter = () => {
    const newResponses = Array.from({ length: 81 }, () => ''); // 81 cells for 9 9x9 grids (81 total)
    const centerIndex = 40; // Central cell index of the 9x9 grid
    const surroundingIndices = [
      // Indices for the surrounding 8 9x9 grids
      0, 1, 2, 9, 10, 11, 18, 19, 20, 72, 73, 74, 81, 82, 83, 90, 91, 92, 144,
      145, 146, 153, 154, 155, 162, 163, 164, 576, 577, 578, 585, 586, 587, 594,
      595, 596, 648, 649, 650, 657, 658, 659, 666, 667, 668, 720, 721, 722, 729,
      730, 731, 738, 739, 740, 792, 793, 794, 801, 802, 803, 810, 811, 812, 864,
      865, 866, 873, 874, 875, 882, 883, 884,
    ];

    for (let i = 0; i < surroundingIndices.length; i++) {
      newResponses[surroundingIndices[i]] =
        editedResponses[centerIndex - 41 + i]; // 41 is the offset to get the surrounding grid data from the central grid data
    }

    setResponses(newResponses);
    setEditedResponses(newResponses);
  };

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleCellEdit = (index: number, value: string) => {
    const newEditedResponses = [...editedResponses];
    newEditedResponses[index] = value;
    setEditedResponses(newEditedResponses);
  };

  return (
    <ChakraProvider>
      <Box display="grid" placeItems="center" height="100vh">
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
          readOnly={!isEditMode} // Disable editing of the chart title when not in edit mode
        />
        <Box display="grid" gridTemplateColumns="repeat(9, 1fr)" gridGap="4px">
          {Array.from({ length: 81 }).map((_, index) => (
            <Box
              key={index}
              backgroundColor={
                index === 40
                  ? 'red.200'
                  : [10, 13, 16, 37, 43, 64, 67, 70].includes(index)
                  ? 'red.200'
                  : 'gray.200'
              }
              borderWidth="1px"
              borderColor="transparent"
              p="4"
              textAlign="center"
              minHeight="100px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {index === 40 ? (
                <Input
                  placeholder="トピックを入力"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  borderColor="transparent"
                  textAlign="center"
                  minHeight="unset"
                  readOnly={!isEditMode} // Disable editing of the topic when not in edit mode
                />
              ) : (
                <Input
                  value={isEditMode ? editedResponses[index] : responses[index]}
                  onChange={(e) => handleCellEdit(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (isEditMode && e.keyCode === 8) {
                      // Handle delete key (Backspace) to clear the input
                      handleCellEdit(index, '');
                    }
                  }}
                  textAlign="center"
                  minHeight="unset"
                  readOnly={!isEditMode} // Disable editing of the responses when not in edit mode
                />
              )}
            </Box>
          ))}
        </Box>
        <Flex mt="4" w="20%">
          {!isLoading && !isEditMode && (
            <Button flex="1" colorScheme="teal" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
          {isEditMode && (
            <Button
              flex="1"
              colorScheme="teal"
              onClick={handleSaveButton}
              ml="2"
            >
              Let's Mandala
            </Button>
          )}
          <Button
            flex="1"
            colorScheme="teal"
            onClick={handleStartButton}
            ml="2"
            disabled={isLoading}
          >
            Start
          </Button>
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
