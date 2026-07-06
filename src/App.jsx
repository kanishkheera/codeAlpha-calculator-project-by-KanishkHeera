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
import { IoBackspaceOutline } from "react-icons/io5";
import { useState } from "react";
import calculatorItems from "./Components/js/calculatorItems";


function App() {
  return (
    <Center minH="100dvh" bg="#111" p={{ base: 0, sm: 4 }}>
      <Box
        w={"420px"}
        h={"600px"}
        bg="#090d10"
        borderRadius={{ base: 0, sm: "3xl" }}
        p={{ base: 3, sm: 4 }}
        overflow="hidden"
      >
        <VStack h="100%">
          {/* Display */}
          <Box
            bg="#15191d"
            borderRadius="2xl"
            p={{ base: 4, sm: 6 }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            overflow="hidden"
          >
            <Input
              variant="unstyled"
              placeholder="0"
              defaultValue=""
              border="none"
              bg="transparent"
              textAlign="right"
              color="white"
              fontWeight="400"
              fontSize="52px"
              h="auto"
              lineHeight="1.1"
              px={0}
              _placeholder={{ color: "white" }}
              _focus={{ border: "none", boxShadow: "none" }}
              _focusVisible={{ outline: "none", boxShadow: "none" }}
            />
            <IoBackspaceOutline
              color="white"
              cursor={"pointer"}
              size={"20px"}
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
                  fontSize="2xl"
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
