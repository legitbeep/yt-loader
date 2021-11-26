import {
  Box,
  Heading,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";

const TextSection = () => {
  const { colorMode } = useColorMode();
  const textSize = useBreakpointValue({
    base: "xs",
    sm: "md",
  });
  return (
    <>
      <Heading as="h2" fontSize="3xl">
        Welcome
      </Heading>
    </>
  );
};

export default TextSection;
