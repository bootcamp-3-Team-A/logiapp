import { Box, Button, ChakraProvider, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const LogicalList = () => {
  const router = useRouter();

  const handleBackButton = () => {
    router.push('/mandala');
  };

  return (
    <ChakraProvider>
      <Box display="grid" placeItems="center" height="100vh">
        <Heading as="h2" size="md" mb="4">
          保存しました！
        </Heading>
        <Button flex="1" colorScheme="teal" onClick={handleBackButton} ml="2">
          戻る
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default LogicalList;
