import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const StartPage = () => {
    const router = useRouter();

    const handleReturn = () => {
        router.push('/mandala');
    };

    const { data: session } = useSession()

    if (!session) {
        return <p>Loading...</p>;
    }



    return (
        <>
            <Box>
                <Text fontSize="2xl">Welcome to StartPage</Text>
            </Box>

            <Flex justifyContent="center" mt="3">
                <Button onClick={handleReturn} colorScheme="customGray" w="120px">
                    マンダラ
                </Button>
            </Flex>
            {session ? (
                <Flex justifyContent="center" mt="3">
                    <Button colorScheme="red" w="120px">
                        <Link href="/">Go back to Home</Link>
                    </Button>
                </Flex>
            ) : null}
        </>
    );
};

export default StartPage;
