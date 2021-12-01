import { Box, Flex, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

import ThemeToggle from "./ThemeToggle";

const Header = () => (
  <Flex as="header" width="full" align="center">
    <Heading as="h1" size="md">
      <Link href="/" passHref>
        <ChakraLink _hover={undefined}>
          <Flex alignItems="center" gridGap={4}>
            <Box>
              <Flex>
                <Image src="/logo.svg" alt="YTL logo" width={50} height={50} />
                <Heading as="h3" marginLeft="10px">
                  YTLoader
                </Heading>
              </Flex>
              <Text as="p">Free youtube downloader</Text>
            </Box>
          </Flex>
        </ChakraLink>
      </Link>
    </Heading>

    <Box marginLeft="auto">
      <ThemeToggle />
    </Box>
  </Flex>
);

export default Header;
