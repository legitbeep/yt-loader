import { Box } from "@chakra-ui/react";

import TextSection from "components/TextSection";
import CTASection from "components/CTASection";
import ContentSection from "components/ContentSection";
import AnimateWrapper from "components/AnimateWrapper";

const Home = () => {
  return (
    <AnimateWrapper>
      <Box mb={8} w="full">
        <TextSection />
        <ContentSection />
      </Box>
    </AnimateWrapper>
  );
};

export default Home;
