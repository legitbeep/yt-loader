import { Box } from "@chakra-ui/react";

import TextSection from "components/TextSection";
import QueueSection from "components/QueueSection";
import ContentSection from "components/ContentSection";
import AnimateWrapper from "components/AnimateWrapper";

const Home = () => {
  return (
    <AnimateWrapper>
      <Box mb={8} w="full">
        <TextSection />
        <ContentSection />
        <QueueSection />
      </Box>
    </AnimateWrapper>
  );
};

export default Home;
