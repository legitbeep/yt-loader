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
  Tag,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscClearAll } from "react-icons/vsc";
import { MdFileDownload, MdDelete } from "react-icons/md";

import CustomSelect from "./ui/Select";
import CustomInput from "./ui/Input";
import Card from "./ui/Card";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectQueue, queueActions, download } from "redux/slices/queueSlice";
import { trimText } from "utils";

const convertQuality = (data: Array<any>, format?: string) => {
  if (format === "mp4") {
    data = data.filter((d) => d.hasAudio);
    const filteredData = data.map((d) => ({
      value: d.itag,
      name: d.qualityLabel
        ? d.qualityLabel
        : d.mimeType.split(";")[0] === "audio/mp4"
        ? "audio/mp3"
        : d.mimeType.split(";")[0].split("/")[1],
      id: d.itag,
    }));
    return filteredData;
  }
  const filteredData = data.map((d, index) => ({
    value: d.itag,
    name: d.audioQuality,
    id: d.itag,
  }));
  return filteredData;
};

const QueueSection = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector(selectQueue);

  const [quality, setQuality] = useState("");

  const { colorMode } = useColorMode();

  const deleteHandler = (vid: IVideo) => {
    dispatch(queueActions.pop(vid));
  };

  const downloadHandler = (vid: IVideo) => {
    //const video = dispatch(download(vid));
    window.open(
      `http://localhost:3000/api/download?title=${vid.title}&videoId=${vid.videoId}&format=${vid.format}&quality=${vid.quality}`
    );
  };

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
            onClick={() => dispatch(queueActions.clear())}
          >
            <VscClearAll />
          </IconButton>
        </Flex>
        <Flex justifyContent="flex-start" flexWrap="wrap">
          {queue.status === "loading" && (
            <Flex
              width="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              marginBottom="20px"
            >
              <CircularProgress
                isIndeterminate
                trackColor="orange.500"
                color="white"
              />
              <Text as="p">Loading...</Text>
            </Flex>
          )}
          {queue.videos.length > 0
            ? queue.videos.map((vid) => (
                <Flex
                  key={vid.videoId + "" + vid.format}
                  sx={{ margin: "10px 0px", width: "100%" }}
                >
                  <Box
                    sx={{
                      marginRight: "10px",
                      maxWidth: "700px",
                      maxHeight: "180px",
                      minWidth: "320px",
                      minHeight: "180px",
                    }}
                  >
                    {vid.image && (
                      <Image
                        aria-label="video thumbnail"
                        src={vid.image}
                        alt="video thumbnail"
                        height={180}
                        width={320}
                        objectFit="cover"
                        className="vid-img"
                      />
                    )}
                  </Box>
                  <Box width="100%">
                    <Text as="p">{trimText(vid.title, 45)}</Text>
                    <Tag size="sm" variant="solid" colorScheme="red">
                      {vid.format === "mp4" ? "Video" : "Audio"}
                    </Tag>
                    <Flex alignItems="flex-end">
                      <CustomSelect
                        label="Download Quality"
                        name="quality"
                        width="auto"
                        options={convertQuality(vid.itag, vid.format)}
                        marginRight="10px"
                        value={vid.quality}
                        onChange={(e) =>
                          dispatch(
                            queueActions.changeQuality({
                              vid,
                              quality: e.target.value,
                            })
                          )
                        }
                      />
                      {/* <IconButton aria-label="download" marginRight="10px">
                        <MdFileDownload />
                      </IconButton>
                      <IconButton aria-label="download">
                        <MdDelete />
                      </IconButton> */}
                    </Flex>
                    <Flex>
                      <Button
                        width="50%"
                        margin="10px 10px 0 0"
                        border="2px solid black"
                        onClick={() => downloadHandler(vid)}
                        isLoading={queue.status === "loading"}
                      >
                        Download
                      </Button>
                      <Button
                        width="50%"
                        marginTop="10px"
                        onClick={() => deleteHandler(vid)}
                        border="2px solid black"
                        isLoading={queue.status === "loading"}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              ))
            : queue.status !== "loading" && (
                <Flex width="100%" justifyContent="center" alignItems="center">
                  Please search any url above
                </Flex>
              )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default QueueSection;
