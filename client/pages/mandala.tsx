import { Box, Button, ChakraProvider, Flex, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';

interface MandalChartProps {
    initialResponses: string[];
}

const MandalChart: React.FC<MandalChartProps> = ({ initialResponses }) => {
    const [topic, setTopic] = useState('');
    const [responses, setResponses] = useState(initialResponses);

    const handleStartButton = async () => {
        // サーバーへPOSTリクエストを送信
        const response = await fetch('/api/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic }),
        });

        if (response.ok) {
            const data = await response.json();
            // サーバーサイドからのレスポンスを更新
            setResponses(data.responses);
        }
    };

    return (
        <ChakraProvider>
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Heading as="h1" size="xl" mb="4">
                    Mandala Chart
                </Heading>
                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap="4px">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <Box
                            key={index}
                            backgroundColor="gray.200"
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
                                // 各マスに表示する
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

export async function getServerSideProps() {
    // サーバー側で必要なデータを取得する
    const initialResponses = Array.from({ length: 9 }, () => "Data");
    return { props: { initialResponses } };
}

export default MandalChart;
