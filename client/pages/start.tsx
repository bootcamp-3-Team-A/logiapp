import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const StartPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleMandalaReturn = () => {
        router.push('/mandala');
    };
    const handle5W2HReturn = () => {
        router.push('/5w2h'); // ５W2Hページへ遷移
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Box
                position="fixed"
                top="10px"
                left="10px"
                backgroundImage="url('/images/blue.png')"
                backgroundSize="cover" // 画像をコンテナに合わせて調整
                backgroundRepeat="no-repeat"
                width="100vw"
                height="100vh"
                zIndex="-1" // 背景画像は他の要素よりも背面に表示
            >
            </Box>
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Heading colorScheme="customGray" as="h1" mb="5" fontSize="4rem">
                    <Text >Welcome to LOGI</Text>
                </Heading>

                <Flex flexDirection="row"> {/* マンダラボタンと５W２Hボタンを並列に */}
                    <Flex flexDirection="column" alignItems="center" mt="20" mr="10">
                        <p>アイデアを膨らまそう！</p>
                        <Flex justifyContent="center" mt="3">
                            <Button onClick={handleMandalaReturn} colorScheme="customGray" w="120px">
                                マンダラ
                            </Button>
                        </Flex>
                    </Flex>

                    <Flex flexDirection="column" alignItems="center" mt="20" mr="10">
                        <p>思考を整理しよう！</p>
                        <Flex justifyContent="center" mt="3">
                            <Button onClick={handle5W2HReturn} colorScheme="customGray" w="120px">
                                ５W2H
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>

                {session && (
                    <Flex justifyContent="center" mt="50">
                        <Link href="/">
                            <Button colorScheme="blue" w="120px">
                                戻る
                            </Button>
                        </Link>
                    </Flex>
                )}
            </Flex>
        </>
    );
};

export default StartPage;
