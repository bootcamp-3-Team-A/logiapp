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
      setIsEditMode(false);
    }
  };

  const handleSaveButton = () => {
    const newResponses = [...responses];

    editedResponses.forEach((value, index) => {
      if (value !== responses[index]) {
        // Update the response if it has been edited
        newResponses[index] = value;
      }
    });

    setResponses(newResponses);
    setIsEditMode(false);
    createNewGridAroundCenter();
    postAndReceiveResponses();
  };

  const postAndReceiveResponses = async () => {
    try {
      setIsLoading(true);

      for (const gridIndex of [30, 31, 32, 39, 41, 48, 49, 50]) {
        const word = responses[gridIndex];
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product: word }),
        });

        if (response.ok) {
          const data = await response.json();
          const responseData = JSON.parse(data.response) as Record<
            string,
            string
          >;
          const dataValues = Object.values(responseData);
          setResponses((prevResponses) => {
            const newResponses = [...prevResponses];
            switch (gridIndex) {
              case 30:
                newResponses[0] = dataValues[0];
                newResponses[1] = dataValues[1];
                newResponses[2] = dataValues[2];
                newResponses[9] = dataValues[3];
                newResponses[11] = dataValues[4];
                newResponses[18] = dataValues[5];
                newResponses[19] = dataValues[6];
                newResponses[20] = dataValues[7];
                break;
              case 31:
                newResponses[3] = dataValues[0];
                newResponses[4] = dataValues[1];
                newResponses[5] = dataValues[2];
                newResponses[12] = dataValues[3];
                newResponses[14] = dataValues[4];
                newResponses[21] = dataValues[5];
                newResponses[22] = dataValues[6];
                newResponses[23] = dataValues[7];
                break;
              case 32:
                newResponses[6] = dataValues[0];
                newResponses[7] = dataValues[1];
                newResponses[8] = dataValues[2];
                newResponses[15] = dataValues[3];
                newResponses[17] = dataValues[4];
                newResponses[24] = dataValues[5];
                newResponses[25] = dataValues[6];
                newResponses[26] = dataValues[7];
                break;
              case 39:
                newResponses[27] = dataValues[0];
                newResponses[28] = dataValues[1];
                newResponses[29] = dataValues[2];
                newResponses[36] = dataValues[3];
                newResponses[38] = dataValues[4];
                newResponses[45] = dataValues[5];
                newResponses[46] = dataValues[6];
                newResponses[47] = dataValues[7];
                break;
              case 41:
                newResponses[33] = dataValues[0];
                newResponses[34] = dataValues[1];
                newResponses[35] = dataValues[2];
                newResponses[42] = dataValues[3];
                newResponses[44] = dataValues[4];
                newResponses[51] = dataValues[5];
                newResponses[52] = dataValues[6];
                newResponses[53] = dataValues[7];
                break;
              case 48:
                newResponses[54] = dataValues[0];
                newResponses[55] = dataValues[1];
                newResponses[56] = dataValues[2];
                newResponses[63] = dataValues[3];
                newResponses[65] = dataValues[4];
                newResponses[72] = dataValues[5];
                newResponses[73] = dataValues[6];
                newResponses[74] = dataValues[7];
                break;
              case 49:
                newResponses[57] = dataValues[0];
                newResponses[58] = dataValues[1];
                newResponses[59] = dataValues[2];
                newResponses[66] = dataValues[3];
                newResponses[68] = dataValues[4];
                newResponses[75] = dataValues[5];
                newResponses[76] = dataValues[6];
                newResponses[78] = dataValues[7];
                break;
              case 50:
                newResponses[60] = dataValues[0];
                newResponses[61] = dataValues[1];
                newResponses[62] = dataValues[2];
                newResponses[69] = dataValues[3];
                newResponses[71] = dataValues[4];
                newResponses[78] = dataValues[5];
                newResponses[79] = dataValues[6];
                newResponses[80] = dataValues[7];
                break;
              default:
                break;
            }
            return newResponses;
          });
        } else {
          const errorData = await response.json();
          console.error('Error occurred:', errorData.message);
        }
      }
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewGridAroundCenter = () => {
    const newResponses = [...responses];

    newResponses[10] = responses[30];
    newResponses[13] = responses[31];
    newResponses[16] = responses[32];
    newResponses[37] = responses[39];
    newResponses[43] = responses[41];
    newResponses[64] = responses[48];
    newResponses[67] = responses[49];
    newResponses[70] = responses[50];

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
                  : [
                      10, 13, 16, 30, 31, 32, 37, 39, 41, 43, 48, 49, 50, 64,
                      67, 70,
                    ].includes(index)
                  ? 'red.50'
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
