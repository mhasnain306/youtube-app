import { useState } from "react";
import ChannelForm, { InputsType } from "./ChannelForm";
import ChannelData from "./ChannelData";
import Videos from "./Videos";
import { Box } from "@chakra-ui/react";

const ChannelContainer = () => {
  const [requestInputs, setRequestInputs] = useState<InputsType>(
    {} as InputsType
  );
  const [playlistId, setPlaylistId] = useState("");
  return (
    <div>
      <ChannelForm
        onSubmit={(inputs) => {
          setRequestInputs(inputs);
          if (
            inputs.channelHandle !== requestInputs.channelHandle
          ) {
            setPlaylistId("");
          }
        }}
      />

      <Box marginBottom={4}>
        <ChannelData
          channelHandle={requestInputs.channelHandle}
          onFetch={(id) => setPlaylistId(id)}
        />
      </Box>
      <Videos queryData={requestInputs} playlistId={playlistId} />
    </div>
  );
};

export default ChannelContainer;
