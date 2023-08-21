import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';


const FiveW2HChart = () => {
    const questions = ["Who", "What", "When", "Where", "Why", "How", "How much"];

    // かなり作りかけです。バンバン修正してやってください


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
            <Heading as="h1" size="3xl" mb="2" color={'gray.600'}>
                5W2H
            </Heading>
            <Input
                placeholder="タイトルを入力"
                borderColor="gray.500"
                textAlign="center"
                p="2"
                borderRadius="md"
                width="30%"
                mt="2"
                mb="3"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            />
            <Box
                display="grid"
                gridTemplateColumns="1fr"
                gridGap="4px"
                width="50%"
                marginBottom="3" // ボックスの下部にスペースを追加
            >
                {questions.map((question, index) => (
                    <Flex
                        key={index}
                        backgroundColor="gray.200"
                        borderWidth="1px"
                        borderColor="transparent"
                        p="4"
                        alignItems="center"  // 子要素を垂直方向に中央揃え
                        justifyContent="space-between"
                        marginBottom="2" // 各質問間にスペースを追加
                        height="60px" // 各ボックスの縦幅を設定
                        borderRadius="8px" // 各ボックスの角を丸くする
                    >
                        <Box
                            flex="1"
                            display="flex"
                            flexDirection="column"
                            alignItems="center" // 垂直方向に中央揃え
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

            <Flex justifyContent="center" mt="1" flexDirection="row" >
                <Button onClick={handleStartButton} style={{ backgroundColor: "#553C9A", color: 'white' }} w="120px" mr="2">
                    保存
                </Button>
                <Link href="/start">
                    <Button colorScheme="blue" w="120px">
                        戻る
                    </Button>
                </Link>
            </Flex>



        </Box >
    );

};


export default FiveW2HChart;
