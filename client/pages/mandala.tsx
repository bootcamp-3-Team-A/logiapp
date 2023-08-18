import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react';
<<<<<<< HEAD
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MandalaChart = () => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [responses, setResponses] = useState<string[]>(
    Array.from({ length: 81 }, () => 'Data'),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedResponses, setEditedResponses] = useState<string[]>(responses);
  const [showSaveButton, setShowSaveButton] = useState(false);
  useEffect(() => {
    if (isEditMode) {
      setEditedResponses([...responses]);
    }
  }, [isEditMode, responses]);
  const router = useRouter();

  const handleStartButton = async () => {
    if (topic.trim() === '') {
      return;
    }

    try {
      setIsLoading(true);

=======
import { useState } from 'react';

const MandalChart = () => {
  const [topic, setTopic] = useState('');
  const [responses, setResponses] = useState<string[]>(
    Array.from({ length: 9 }, () => 'Data'),
  );

  const handleStartButton = async () => {
    try {
>>>>>>> 6685d4c (Initial commit)
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
<<<<<<< HEAD
        >;
        const dataValues = Object.values(responseData);
        setEditedResponses([...responses]);

        setResponses((prevResponses) => {
          const newResponses = [...prevResponses];
          newResponses[40] = topic;
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
=======
        >; // Parse the JSON response and specify the type
        const dataValues = Object.values(responseData);
        setResponses(dataValues);
>>>>>>> 6685d4c (Initial commit)
      } else {
        const errorData = await response.json();
        console.error('Error occurred:', errorData.message);
      }
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
<<<<<<< HEAD
    } finally {
      setIsLoading(false);
      setIsEditMode(false);
    }
  };

  const handleMandalaButton = () => {
    setResponses([...editedResponses]);
    setIsEditMode(false);
    createNewGridAroundCenter();
    postAndReceiveResponses();
  };

  const postAndReceiveResponses = async () => {
    try {
      setIsLoading(true);

      for (const gridIndex of [30, 31, 32, 39, 41, 48, 49, 50]) {
        const word = editedResponses[gridIndex];
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
                newResponses[77] = dataValues[7];
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
      setShowSaveButton(true);
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

  const handleSaveButton = async () => {
    try {
      const mandalaData: Record<string, string> = {
        mandala_title: title,
      };

      const gridIndicesMap: Record<number, string> = {
        10: 'mandala1_1',
        0: 'mandala1_2',
        1: 'mandala1_3',
        2: 'mandala1_4',
        9: 'mandala1_5',
        11: 'mandala1_6',
        18: 'mandala1_7',
        19: 'mandala1_8',
        20: 'mandala1_9',
        13: 'mandala2_1',
        3: 'mandala2_2',
        4: 'mandala2_3',
        5: 'mandala2_4',
        12: 'mandala2_5',
        14: 'mandala2_6',
        21: 'mandala2_7',
        22: 'mandala2_8',
        23: 'mandala2_9',
        16: 'mandala3_1',
        6: 'mandala3_2',
        7: 'mandala3_3',
        8: 'mandala3_4',
        15: 'mandala3_5',
        17: 'mandala3_6',
        24: 'mandala3_7',
        25: 'mandala3_8',
        26: 'mandala3_9',
        37: 'mandala4_1',
        27: 'mandala4_2',
        28: 'mandala4_3',
        29: 'mandala4_4',
        36: 'mandala4_5',
        38: 'mandala4_6',
        45: 'mandala4_7',
        46: 'mandala4_8',
        47: 'mandala4_9',
        40: 'mandala5_1',
        30: 'mandala5_2',
        31: 'mandala5_3',
        32: 'mandala5_4',
        39: 'mandala5_5',
        41: 'mandala5_6',
        48: 'mandala5_7',
        49: 'mandala5_8',
        50: 'mandala5_9',
        43: 'mandala6_1',
        33: 'mandala6_2',
        34: 'mandala6_3',
        35: 'mandala6_4',
        42: 'mandala6_5',
        44: 'mandala6_6',
        51: 'mandala6_7',
        52: 'mandala6_8',
        53: 'mandala6_9',
        64: 'mandala7_1',
        54: 'mandala7_2',
        55: 'mandala7_3',
        56: 'mandala7_4',
        63: 'mandala7_5',
        65: 'mandala7_6',
        72: 'mandala7_7',
        73: 'mandala7_8',
        74: 'mandala7_9',
        67: 'mandala8_1',
        57: 'mandala8_2',
        58: 'mandala8_3',
        59: 'mandala8_4',
        66: 'mandala8_5',
        68: 'mandala8_6',
        75: 'mandala8_7',
        76: 'mandala8_8',
        77: 'mandala8_9',
        70: 'mandala9_1',
        60: 'mandala9_2',
        61: 'mandala9_3',
        62: 'mandala9_4',
        69: 'mandala9_5',
        71: 'mandala9_6',
        78: 'mandala9_7',
        79: 'mandala9_8',
        80: 'mandala9_9',
      };

      for (const gridIndex in gridIndicesMap) {
        mandalaData[gridIndicesMap[gridIndex]] = editedResponses[gridIndex];
        mandalaData[gridIndicesMap[40]] = editedResponses[40];
      }

      const response = await fetch('http://localhost:8000/mandala_core', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mandalaData),
      });

      if (response.ok) {
        console.log('データが正常に保存されました');
        router.push('/logical_list');
      } else {
        const errorData = await response.json();
        console.error('エラーが発生しました:', errorData.message);
      }
    } catch (error) {
      console.error('データの保存中にエラーが発生しました:', error);
=======
>>>>>>> 6685d4c (Initial commit)
    }
  };

  return (
    <ChakraProvider>
<<<<<<< HEAD
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
=======
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Heading as="h1" size="xl" mb="4">
          Mandala Chart
        </Heading>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="4px">
          {Array.from({ length: 9 }).map((_, index) => (
            <Box
              key={index}
              backgroundColor="gray.200"
>>>>>>> 6685d4c (Initial commit)
              borderWidth="1px"
              borderColor="transparent"
              p="4"
              textAlign="center"
              minHeight="100px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
<<<<<<< HEAD
              {index === 40 ? (
=======
              {index === 4 ? (
>>>>>>> 6685d4c (Initial commit)
                <Input
                  placeholder="トピックを入力"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  borderColor="transparent"
                  textAlign="center"
                  minHeight="unset"
                />
              ) : (
<<<<<<< HEAD
                <Input
                  value={isEditMode ? editedResponses[index] : responses[index]}
                  onChange={(e) => handleCellEdit(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (isEditMode && e.keyCode === 8) {
                      handleCellEdit(index, '');
                    }
                  }}
                  textAlign="center"
                  minHeight="unset"
                  readOnly={!isEditMode}
                />
=======
                responses[index]
>>>>>>> 6685d4c (Initial commit)
              )}
            </Box>
          ))}
        </Box>
<<<<<<< HEAD
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
              onClick={handleMandalaButton}
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
          {showSaveButton && (
            <Button
              flex="1"
              colorScheme="teal"
              onClick={handleSaveButton}
              ml="2"
              disabled={isLoading}
            >
              Save
            </Button>
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
=======
        <Button mt="4" colorScheme="teal" onClick={handleStartButton}>
          Start
        </Button>
      </Flex>
>>>>>>> 6685d4c (Initial commit)
    </ChakraProvider>
  );
};

<<<<<<< HEAD
export default MandalaChart;
=======
export default MandalChart;
>>>>>>> 6685d4c (Initial commit)
