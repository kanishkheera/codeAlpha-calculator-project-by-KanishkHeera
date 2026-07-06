import { Center } from "@chakra-ui/react";
import Calculator from "./components/Calculator";

function App() {
  return <Center minH="100dvh" bg="#111" p={{ base: 0, sm: 4 }}>
    <Calculator/>
  </Center>;
}

export default App;
