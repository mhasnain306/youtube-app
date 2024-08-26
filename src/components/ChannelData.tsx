import {
  Box,
  HStack,
  Image,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useChannel from "../hooks/useChannel";

interface Props {
  channelHandle: string;
  onFetch: (id: string) => void;
}

const ChannelData = ({ channelHandle = "", onFetch }: Props) => {
  const { data, error, isLoading } = useChannel(
    channelHandle,
    onFetch
  );

  if (!channelHandle) return null;

  if (isLoading) return <Spinner size="lg" color="white" />;

  if (error)
    return (
      <Alert status="error" colorScheme="red">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <>
      {data.length !== 0 && (
        <Box
          backgroundColor="black"
          color="white"
          padding={4}
          borderRadius="md"
          boxShadow="md"
        >
          <HStack spacing={4}>
            <Image
              boxSize="60px"
              src={
                data ? data[0].snippet.thumbnails.default.url : ""
              }
              alt={
                data ? data[0].snippet.title : "Channel Thumbnail"
              }
              borderRadius="md"
              objectFit="cover"
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                {data ? data[0].snippet.title : ""}
              </Text>
              <Text color="gray.400">
                {data ? data[0].statistics.subscriberCount : ""}{" "}
                subscribers
              </Text>
            </Box>
          </HStack>
          <Box paddingTop={2}>
            <Text>{data ? data[0].snippet.description : ""}</Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChannelData;
