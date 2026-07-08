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
import calculatorItems from "./js/calculatorItems";
import { useState, useEffect, useCallback } from "react";

export default function Calculator() {
  const [inp, setInp] = useState("");
  const [pluse, setPluse] = useState("");

  const handleClick = useCallback((value) => {
    switch (value) {
      case "AC":
        setInp("");
        return;

      case "⌫":
        setInp((prev) => prev.slice(0, -1));
        return;

      case "=":
        try {
          let expression = inp.replace(/×/g, "*").replace(/÷/g, "/");

          // Dynamic percentage
          // 200+10% => 200+(200*10/100)
          // 200-10% => 200-(200*10/100)
          expression = expression.replace(
            /(\d+(\.\d+)?)([+\-])(\d+(\.\d+)?)%/g,
            (_, num1, __, operator, num2) => {
              const percent = (parseFloat(num1) * parseFloat(num2)) / 100;
              return `${num1}${operator}${percent}`;
            },
          );

          // 200*10% => 200*(10/100)
          // 200/10% => 200/(10/100)
          expression = expression.replace(
            /(\d+(\.\d+)?)([*\/])(\d+(\.\d+)?)%/g,
            (_, num1, __, operator, num2) => {
              return `${num1}${operator}(${num2}/100)`;
            },
          );

          // 50% => 0.5
          expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            (_, num) => `(${num}/100)`,
          );

          const result = eval(expression);

          setInp(result.toString());
        } catch {
          setInp("Error");
        }
        return;

      default:
        setInp((prev) => prev + value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inp]);

  // Keyboard support
  useEffect(() => {
    const keyMap = {
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      ".": ".",
      "+": "+",
      "-": "-",
      "*": "×",
      "/": "÷",
      "%": "%",
      "Enter": "=",
      "=": "=",
      "Backspace": "⌫",
      "Delete": "AC",
      "Escape": "AC",
    };

    const handleKeyDown = (e) => {
      const mapped = keyMap[e.key];
      if (mapped === undefined) return;

      // Prevent default browser behavior (e.g. Backspace navigating back,
      // "/" triggering quick find, etc.)
      e.preventDefault();

      handleClick(mapped);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClick]);

  return (
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
            readOnly
            // type="number"
            variant="unstyled"
            placeholder="0"
            // defaultValue={inp}
            value={inp}
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
            // onChange={(e) => console.log(inp)}
          />
          <IoBackspaceOutline
            color="white"
            cursor={"pointer"}
            size={"20px"}
            onClick={() => handleClick("⌫")}
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
                onClick={() => handleClick(ele.item)}
              >
                {ele.item}
              </Button>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
}