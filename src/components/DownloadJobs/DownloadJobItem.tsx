import { Box, HStack, Button } from "@chakra-ui/react";
import Checkbox from "@mui/material/Checkbox";
import { DownloadJob } from "../../models/ComicModels";

interface DownloadJobItemProps {
  downloadJob: DownloadJob;
  handleRetryDownload: (id: number) => void;
  handleDeleteDownload: (id: number) => void;
}

const DownloadJobItem = (props: DownloadJobItemProps) => {
  const { downloadJob, handleRetryDownload, handleDeleteDownload } = props;
  const completePercentage = (
    (downloadJob.downloaded_pages / downloadJob.total_pages) *
    100
  ).toFixed(1);
  return (
    <Box
      border="2px solid #000"
      maxWidth="100%"
      borderRadius="8px"
      my="10px"
      p="8px"
      bg={downloadJob.complete ? "green" : "yellow"}
    >
      <HStack justifyContent="space-between" width="100%">
        <HStack ml="10px">
          <Box>{downloadJob.name}</Box>
        </HStack>
        <HStack>
          <Box
            border="2px solid #000"
            maxWidth="100%"
            borderRadius="8px"
            my="10px"
            p="8px"
            bg={downloadJob.complete ? "green" : "yellow"}
          >
            {completePercentage}% complete
          </Box>
          <Button bg="blue" onClick={() => handleRetryDownload(downloadJob.id)}>
            Retry download
          </Button>
          <Button bg="red" onClick={() => handleDeleteDownload(downloadJob.id)}>
            Delete Job (and all related files)
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default DownloadJobItem;
