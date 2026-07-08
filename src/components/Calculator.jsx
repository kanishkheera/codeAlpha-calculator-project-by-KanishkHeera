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
import { useState, useEffect, useCallback, useRef } from "react";

export default function Calculator() {
  const [inp, setInp] = useState("");
  const [pluse, setPluse] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);
  const buttonRefs = useRef({});

  const handleClick = useCallback((value) => {
    switch (value) {
      case "AC":
        setInp("");
        setJustCalculated(false);
        return;

      case "⌫":
        setInp((prev) => (prev === "Error" ? "" : prev.slice(0, -1)));
        setJustCalculated(false);
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
          setJustCalculated(true);
        } catch {
          setInp("Error");
          setJustCalculated(false);
        }
        return;

      default:
        setInp((prev) => {
          if (prev === "Error") return value;

          if (justCalculated) {
            // If the display is showing a freshly computed result,
            // digits/decimal start a brand new number (replacing the
            // result), while operators continue the calculation from
            // the result — e.g. "0" then "+" => "0+", but "0" then "5"
            // => "5" (not "05", which would break eval as an invalid
            // legacy octal literal).
            const operators = ["+", "-", "×", "÷", "%"];
            return operators.includes(value) ? prev + value : value;
          }

          return prev + value;
        });
        setJustCalculated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inp, justCalculated]);

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

    const pressStyle = (el) => {
      if (!el) return;
      el.style.transform = "scale(0.96)";
      el.style.filter = "brightness(110%)";
    };

    const releaseStyle = (el) => {
      if (!el) return;
      el.style.transform = "";
      el.style.filter = "";
    };

    const handleKeyDown = (e) => {
      const mapped = keyMap[e.key];
      if (mapped === undefined) return;

      // Prevent default browser behavior (e.g. Backspace navigating back,
      // "/" triggering quick find, etc.)
      e.preventDefault();

      pressStyle(buttonRefs.current[mapped]);
      handleClick(mapped);
    };

    const handleKeyUp = (e) => {
      const mapped = keyMap[e.key];
      if (mapped === undefined) return;

      releaseStyle(buttonRefs.current[mapped]);
    };

    const handleBlur = () => {
      Object.values(buttonRefs.current).forEach(releaseStyle);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
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
                ref={(el) => {
                  buttonRefs.current[ele.item] = el;
                }}
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
                transition="transform 0.1s ease, filter 0.1s ease"
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