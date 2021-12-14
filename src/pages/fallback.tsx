import { Box, Text, useColorMode, Heading, Button } from "@chakra-ui/react";
import Image from "next/image";

import MotionBox from "components/motion/Box";
import AnimateWrapper from "components/AnimateWrapper";

const Fallback = () => {
  return (
    <AnimateWrapper>
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "95%", "70%", "60%", "58%"]}
        margin="0 auto"
      >
        <Image
          src="/offline.svg"
          alt="offline"
          width={600}
          height={600}
          objectFit="cover"
          className="vid-img"
        />
      </MotionBox>
      <Heading as="h1">
        It seems you are offline. Please connect to internet to access this app.
      </Heading>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </AnimateWrapper>
  );
};

export default Fallback;
