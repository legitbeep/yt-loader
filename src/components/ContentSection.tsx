import { useState, useEffect } from "react";
import { useColorMode, Flex, Grid, Button } from "@chakra-ui/react";
import Image from "next/image";
import { nanoid } from "nanoid";

import CustomSelect from "./ui/Select";
import CustomInput from "./ui/Input";
import Card from "./ui/Card";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectQueue, queueActions, getVideo } from "redux/slices/queueSlice";

const ContentSection = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector(selectQueue);
  const { colorMode } = useColorMode();

  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");

  const submitHandler = () => {
    try {
      const urlCheck = new URL(url);
      if (format === "mp3" || format === "mp4")
        dispatch(getVideo({ url, type: format }));
    } catch {
      console.log("NOT URL");
    }
    // dispatch(
    //   queueActions.push({ title: "Some random video", url: "", image, id })
    // );
  };
  useEffect(() => {
    console.log(queue);
  }, [queue]);

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
          onChange={(e) => setFormat(e.target.value)}
        />
      </Grid>

      <Button
        width="100%"
        marginTop="20px"
        border="2px solid black"
        onClick={submitHandler}
        disabled={url.length <= 3}
      >
        Submit
      </Button>
      {/* </Flex> */}
    </Card>
  );
};

export default ContentSection;
