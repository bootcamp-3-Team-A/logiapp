import { Box, Button, ChakraProvider, Flex, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';

const FiveW2HChart = () => {
    const questions = ["Who", "What", "When", "Where", "Why", "How", "How much"];

    // 初期の入力内容を保存するためのstate
    const [inputs, setInputs] = useState(Array(7).fill(''));

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleStartButton = () => {
        // ここで何かの処理をする場合は追加する
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
                    5W2H Framework
                </Heading>
                <Box display="grid" gridTemplateColumns="1fr" gridGap="4px" width="50%">
                    {questions.map((question, index) => (
                        <Flex
                            key={index}
                            backgroundColor="gray.200"
                            borderWidth="1px"
                            borderColor="transparent"
                            p="4"
                            alignItems="stretch" // ここで子要素が全高になるように設定
                            justifyContent="space-between"
                            height="100px"
                        >
                            <Box
                                flex="1"
                                marginRight="15px"
                                paddingRight="15px"
                                borderRight="2px solid white" // ここで境界線の色を白に設定
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
