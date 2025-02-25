import { Box, Text, CloseButton, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DownloadJob, Issue } from "../../models/ComicModels";
import {
  deleteDownloadJob,
  getDownloadJobs,
  retryDownloadJob,
} from "../../services/ComicService";
import { parseGetDownloadJobs } from "../../Util/ComicUtil";
import DownloadJobItem from "./DownloadJobItem";

const DownloadJobs = () => {
  const [downloadJobs, setDownloadJobs] = useState<DownloadJob[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorType, setErrorType] = useState<"failure" | "success">("failure");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const populateDownloadJobs = async () => {
    const response = parseGetDownloadJobs(await getDownloadJobs());
    if ("error" in response) {
    } else {
      setDownloadJobs([...response.incomplete, ...response.complete]);
    }
  };

  const handleRetryDownload = async (id: number) => {
    const response = await retryDownloadJob(id);
    if ("error" in response) {
      setErrorMessage("error: " + response.error);
      setErrorType("failure");
      setIsVisible(true);
      return;
    }
    populateDownloadJobs();
  };

  const handleDeleteDownload = async (id: number) => {
    const response = await deleteDownloadJob(id);
    if ("error" in response) {
      setErrorMessage("error: " + response.error);
      setErrorType("failure");
      setIsVisible(true);
      return;
    }
    populateDownloadJobs();
  };

  useEffect(() => {
    populateDownloadJobs();
  }, []);

  return (
    <Box
      className="centered-container-search"
      p={4}
      position="fixed"
      top="25px"
      left="400px"
      width="1000px"
      maxWidth="1000px"
    >
      {isVisible && (
        <Box
          bg={errorType === "success" ? "green.200" : "red.200"}
          p={3}
          mt={4}
          borderRadius="md"
          position="relative"
        >
          <Text fontWeight="bold">{errorMessage}</Text>
          <CloseButton
            position="absolute"
            size="sm"
            right="1px"
            top="1px"
            onClick={() => setIsVisible(false)}
          />
        </Box>
      )}
      <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
        Download Jobs
      </Text>
      <Button mt={4} onClick={populateDownloadJobs}>
        Refresh list
      </Button>
      <Box
        mt={4}
        maxHeight="600px"
        overflowY="auto"
        width="100%"
        bg="white"
        p={2}
        borderRadius="md"
        position="relative"
      >
        {downloadJobs.map((downloadJob: DownloadJob) => (
          <DownloadJobItem
            key={downloadJob.id}
            downloadJob={downloadJob}
            handleRetryDownload={handleRetryDownload}
            handleDeleteDownload={handleDeleteDownload}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DownloadJobs;
