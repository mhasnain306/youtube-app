import { useState } from "react";
import useChannel from "../hooks/useChannel";
import { Box, HStack, Image, Text } from "@chakra-ui/react";

const HomePage = () => {
  const { data, getChannel } = useChannel();
  const [channel, setChannel] = useState("");

  return (
    <>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setChannel(e.target.value)}
      />
      <button
        className="btn btn-primary my-3"
        onClick={() => getChannel(channel)}
      >
        Get Channel
      </button>

      {data && (
        <>
          <HStack>
            <Image
              boxSize={"60px"}
              src={data ? data.items[0].snippet.thumbnails.default.url : ""}
            />
            <Box>
              <Text marginBottom={0} fontWeight={"bold"}>
                {data ? data.items[0].snippet.title : ""}
              </Text>
              <Text marginBottom={0} color={"gray.500"}>
                {data ? data.items[0].statistics.subscriberCount : ""}{" "}
                subscribers
              </Text>
            </Box>
          </HStack>
          <Box paddingY={2}>
            <Text>{data ? data.items[0].snippet.description : ""}</Text>
          </Box>
        </>
      )}
    </>
  );
};

export default HomePage;
