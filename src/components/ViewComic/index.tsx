import {
  Box,
  Text,
  Input,
  Button,
  HStack,
  List,
  ListItem,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Issue } from "../../models/ComicModels";
import IssueItem from "./IssueItem";
import { ViewIssueItem } from "../../hooks/useViewComic";
import { useNavigate } from "react-router-dom";

export interface ViewComicProps {
  url: string;
  setUrl: (s: string) => void;
  issues: ViewIssueItem[];
  setIssues: (i: ViewIssueItem[]) => void;
  errorMessage: string;
  errorType: string;
  isVisible: boolean;
  setIsVisible: (n: boolean) => void;
  updateIssueItem: (id: number, updates: Partial<ViewIssueItem>) => void;
  updateAllIssueItems: (updates: Partial<ViewIssueItem>) => void;
  getIssuesByLink: (link: string) => void;
  addIssuesToJob: (issues: ViewIssueItem[]) => void;
}

const ViewComic = (props: ViewComicProps) => {
  const {
    url,
    setUrl,
    issues,
    setIssues,
    errorMessage,
    errorType,
    isVisible,
    setIsVisible,
    updateIssueItem,
    updateAllIssueItems,
    getIssuesByLink,
    addIssuesToJob,
  } = props;
  const navigate = useNavigate();
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
        View/add comic issues
      </Text>

      <HStack mt={4} gap={4} width="100%">
        <Input
          placeholder="Search by URL"
          bg="white"
          color="black"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={() => getIssuesByLink(url)}>Search</Button>
        <Button
          bg="red"
          onClick={() => {
            setIssues([]);
            setUrl("");
          }}
        >
          Clear issues
        </Button>
      </HStack>
      <HStack mt={4} gap={4}>
        <Button onClick={() => updateAllIssueItems({ checked: true })}>
          Check All
        </Button>
        <Button onClick={() => updateAllIssueItems({ checked: false })}>
          Uncheck All
        </Button>
        <Button onClick={() => updateAllIssueItems({ hq: true })}>
          All high quality
        </Button>
        <Button onClick={() => updateAllIssueItems({ hq: false })}>
          All low quality
        </Button>
      </HStack>
      <Box
        mt={4}
        maxHeight="600px"
        overflowY="auto"
        width="100%"
        bg="gray.50"
        p={2}
        borderRadius="md"
        position="relative"
      >
        {issues.map((issue: ViewIssueItem) => (
          <IssueItem
            key={issue.id}
            issue={issue}
            updateIssueItem={updateIssueItem}
          />
        ))}
      </Box>
      <Button
        mt="10px"
        bg="green"
        onClick={() => {
          if (issues) {
            addIssuesToJob(issues);
            navigate("/create-job");
          }
        }}
      >
        Add to Download Job
      </Button>
    </Box>
  );
};

export default ViewComic;
