import { useState } from "react";
import {
  Box,
  useColorMode,
  Flex,
  Grid,
  IconButton,
  Heading,
  Text,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscClearAll } from "react-icons/vsc";
import { MdFileDownload, MdDelete } from "react-icons/md";

import CustomSelect from "./ui/Select";
import CustomInput from "./ui/Input";
import Card from "./ui/Card";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectQueue, queueActions } from "redux/slices/queueSlice";
import { trimText } from "utils";

const convertQuality = (data: Array<any>) => {
  data = data.filter((d) => d.qualityLabel !== "");
  const filteredData = data.map((d) => ({
    value: d.qualityLabel,
    name: d.qualityLabel,
    id: d.itag,
  }));
  return filteredData;
};

const ContentSection = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector(selectQueue);

  const [quality, setQuality] = useState("");

  const { colorMode } = useColorMode();

  const deleteHandler = (id: string) => {
    dispatch(queueActions.pop(id));
  };
  console.log(queue);
  return (
    <Card margin="20px 0px" backgroundColor="orange.600">
      <Flex flexDirection="column">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h3" fontSize="xl">
            Download
          </Heading>
          <IconButton
            aria-label="clear all"
            backgroundColor="transparent"
            _hover={{ backgroundColor: "orange.500" }}
          >
            <VscClearAll />
          </IconButton>
        </Flex>
        <Flex justifyContent="flex-start" flexWrap="wrap">
          {queue.videos.map((vid) => (
            <Flex key={vid.videoId} sx={{ margin: "10px 0px", width: "100%" }}>
              <Box
                sx={{
                  marginRight: "10px",
                  maxWidth: "700px",
                  maxHeight: "171px",
                  minWidth: "320px",
                  minHeight: "180px",
                }}
              >
                {vid.image && (
                  <Image
                    aria-label="video thumbnail"
                    src={vid.image}
                    alt="thumbnail"
                    height={180}
                    width={320}
                    className="vid-img"
                  />
                )}
              </Box>
              <Box width="100%">
                <Text as="p">{trimText(vid.title, 45)}</Text>
                <CustomSelect
                  label="Download Quality"
                  name="quality"
                  width="auto"
                  options={convertQuality(vid.itag)}
                />
                <Flex>
                  <Button
                    width="50%"
                    margin="10px 10px 0 0"
                    border="2px solid black"
                  >
                    Download
                  </Button>
                  <Button
                    width="50%"
                    marginTop="10px"
                    onClick={() => deleteHandler(vid.videoId)}
                    border="2px solid black"
                  >
                    Remove
                  </Button>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default ContentSection;
