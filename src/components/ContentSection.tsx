import { useState, useEffect } from "react";
import { useColorMode, Flex, Grid, Button, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { nanoid } from "nanoid";

import CustomSelect from "./ui/Select";
import CustomInput from "./ui/Input";
import Card from "./ui/Card";

import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectQueue,
  queueActions,
  getVideo,
  getAudio,
} from "redux/slices/queueSlice";

const ContentSection = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector(selectQueue);
  const { colorMode } = useColorMode();

  const toast = useToast();

  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");

  const submitHandler = () => {
    try {
      const urlCheck = new URL(url);
      if (format === "mp4") dispatch(getVideo({ url, type: format }));
      else if (format === "mp3") dispatch(getAudio({ url, type: format }));
    } catch {
      toast({
        title: "Error.",
        description: "Please provide valid youtube URL!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    // dispatch(
    //   queueActions.push({ title: "Some random video", url: "", image, id })
    // );
  };
  useEffect(() => {
    if (queue.status === "error") {
      toast({
        title: "Error.",
        description: queue.error || "Something went wrong!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [queue.status]);

  return (
    <Card margin="20px 0px">
      {/* <Flex gridGap={4}> */}
      <Grid templateColumns="2fr 1fr" gap={4}>
        <CustomInput
          label="Youtube URL"
          name="link"
          placeholder="https://youtube.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <CustomSelect
          label="Format"
          name="format"
          width="auto"
          value={format}
          options={[
            { name: "MP4 / Video", value: "mp4" },
            { name: "MP3 / Audio", value: "mp3" },
          ]}
          onChange={(e) => setFormat(e.target.value)}
        />
      </Grid>

      <Button
        width="100%"
        marginTop="20px"
        border="2px solid black"
        onClick={submitHandler}
        loadingText="Loading"
        isLoading={queue.status === "loading"}
        disabled={url.length <= 4}
      >
        Submit
      </Button>
      {/* </Flex> */}
    </Card>
  );
};

export default ContentSection;
