import { useColorMode, Flex, Grid } from "@chakra-ui/react";
import Image from "next/image";

import CustomSelect from "./ui/Select";
import CustomInput from "./ui/Input";
import Card from "./ui/Card";

const ContentSection = () => {
  const { colorMode } = useColorMode();

  return (
    <Card>
      {/* <Flex gridGap={4}> */}
      <Grid templateColumns="2fr 1fr" gap={4}>
        <CustomInput
          label="Youtube URL"
          name="link"
          placeholder="https://youtube.com/..."
        />
        <CustomSelect label="Format" name="format" width="auto" />
      </Grid>
      {/* </Flex> */}
    </Card>
  );
};

export default ContentSection;
