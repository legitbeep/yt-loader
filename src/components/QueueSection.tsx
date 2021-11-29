import { useState } from "react";
import {
  useColorMode,
  Flex,
  Grid,
  IconButton,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscClearAll } from "react-icons/vsc";
import { MdFileDownload, MdDelete } from "react-icons/md";

import CustomSelect from "./ui/Select";
import CustomInput from "./ui/Input";
import Card from "./ui/Card";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectQueue, queueActions } from "redux/slices/queueSlice";

const ContentSection = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector(selectQueue);

  const { colorMode } = useColorMode();

  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");

  const deleteHandler = (id: string) => {
    dispatch(queueActions.pop(id));
  };

  return (
    <Card margin="20px 0px" backgroundColor="green.700" color="white">
      <Flex flexDirection="column">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h3" fontSize="xl">
            Download
          </Heading>
          <IconButton
            aria-label="clear all"
            backgroundColor="transparent"
            _hover={{ backgroundColor: "green.600" }}
          >
            <VscClearAll />
          </IconButton>
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          {queue.videos.map((vid) => (
            <Grid key={vid.id}>
              {vid.image && (
                <Image
                  aria-label="video thumbnail"
                  src={vid.image}
                  alt="thumbnail"
                  height="160px"
                  width="90px"
                />
              )}
              <Text as="p">{vid.title}</Text>
              <IconButton aria-label="download">
                <MdFileDownload />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => deleteHandler(vid.id)}
              >
                <MdDelete />
              </IconButton>
            </Grid>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default ContentSection;
