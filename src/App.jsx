import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

const calculatorItems = [
  { id: "1", item: "AC", cols: 2, color: "#33363b" },
  { id: "2", item: "%", cols: 1, color: "#33363b" },
  { id: "3", item: "/", cols: 1, color: "#fc9107" },
  { id: "4", item: "7", cols: 1, color: "#33363b" },
  { id: "5", item: "8", cols: 1, color: "#33363b" },
  { id: "6", item: "9", cols: 1, color: "#33363b" },
  { id: "7", item: "X", cols: 1, color: "#fc9107" },
  { id: "8", item: "4", cols: 1, color: "#33363b" },
  { id: "9", item: "5", cols: 1, color: "#33363b" },
  { id: "10", item: "6", cols: 1, color: "#33363b" },
  { id: "11", item: "-", cols: 1, color: "#fc9107" },
  { id: "12", item: "1", cols: 1, color: "#33363b" },
  { id: "13", item: "2", cols: 1, color: "#33363b" },
  { id: "14", item: "3", cols: 1, color: "#33363b" },
  { id: "15", item: "+", cols: 1, color: "#fc9107" },
  { id: "16", item: "0", cols: 2, color: "#33363b" },
  { id: "17", item: ".", cols: 1, color: "#33363b" },
  { id: "18", item: "=", cols: 1, color: "#fc9107" },
];

function App() {
  return (
    <Center minH="100dvh" bg="#111" p={{ base: 0, sm: 4 }}>
      <Box
        w={{ base: "100%", sm: "380px", md: "420px" }}
        maxW="420px"
        h={{ base: "100dvh", sm: "95dvh", md: "760px" }}
        maxH={{ base: "100dvh", sm: "95dvh" }}
        bg="#090d10"
        borderRadius={{ base: 0, sm: "3xl" }}
        p={{ base: 3, sm: 4 }}
        overflow="hidden"
        sx={{
          "@media (orientation: landscape) and (max-height: 500px)": {
            width: "100vw",
            maxWidth: "100vw",
            height: "100dvh",
            maxHeight: "100dvh",
            borderRadius: 0,
          },
        }}
      >
        <VStack
          h="100%"
          spacing={{ base: 4, md: 6 }}
          sx={{
            "@media (orientation: landscape) and (max-height: 500px)": {
              flexDirection: "row",
              alignItems: "stretch",
            },
          }}
        >
          {/* Display */}
          <Box
            w={{ base: "100%", landscape: "35%" }}
            h={{ base: "20%", md: "170px" }}
            minH={{ base: "100px", md: "120px" }}
            flexShrink={0}
            bg="#15191d"
            borderRadius="2xl"
            p={{ base: 4, sm: 6 }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            overflow="hidden"
            sx={{
              "@media (orientation: landscape) and (max-height: 500px)": {
                width: "35%",
                height: "100%",
                minH: "auto",
              },
            }}
          >
            <Text
              color="gray.500"
              fontSize={{ base: "xs", sm: "sm", md: "lg" }}
              noOfLines={1}
              mb={1}
            >
              123 + 456 × 7
            </Text>

            <Input
              variant="unstyled"
              placeholder="0"
              defaultValue=""
              border="none"
              bg="transparent"
              textAlign="right"
              color="white"
              fontWeight="300"
              fontSize="clamp(28px, 9vw, 60px)"
              h="auto"
              lineHeight="1.1"
              px={0}
              _placeholder={{ color: "white" }}
              _focus={{ border: "none", boxShadow: "none" }}
              _focusVisible={{ outline: "none", boxShadow: "none" }}
            />
          </Box>

          {/* Buttons */}
          <Grid
            flex={1}
            w="100%"
            h="100%"
            templateColumns="repeat(4, 1fr)"
            templateRows="repeat(5, 1fr)"
            gap={{ base: 2, sm: 3 }}
          >
            {calculatorItems.map((ele) => (
              <GridItem key={ele.id} colSpan={ele.cols}>
                <Button
                  w="100%"
                  h="100%"
                  minH={0}
                  bg={ele.color}
                  color="white"
                  borderRadius={{ base: "xl", sm: "2xl" }}
                  fontSize={{ base: "md", sm: "xl", md: "2xl" }}
                  fontWeight="bold"
                  _hover={{ filter: "brightness(110%)" }}
                  _active={{ transform: "scale(0.96)" }}
                >
                  {ele.item}
                </Button>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Box>
    </Center>
  );
}

export default App;