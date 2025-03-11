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
import Comic, { Issue } from "../../models/ComicModels";
import IssueItem from "./IssueItem";
import { ViewIssueItem } from "../../hooks/useViewComic";
import { useNavigate } from "react-router-dom";
import BookmarkItem from "./BookmarkItem";

export interface ViewComicProps {
  url: string;
  setUrl: (s: string) => void;
  comic: Comic | undefined;
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
  clearIssues: () => void;
  bookmarks: Comic[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  getBookmarkById: (id: number) => Comic | undefined;
  containsBookmark: (id: number) => boolean;
  getIssuesById: (id: number, link: string) => void;
  hq: boolean;
  setHq: (n: boolean) => void;
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
    bookmarks,
    clearIssues,
    comic,
    addBookmark,
    removeBookmark,
    containsBookmark,
    getIssuesById,
    hq,
    setHq,
  } = props;
  const navigate = useNavigate();

  return (
    <>
      <Box
        className="centered-container-search"
        p={4}
        position="fixed"
        top="25px"
        left="400px"
        width="800px"
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
          <Button bg="red" onClick={clearIssues}>
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
          {hq ? (
            <Button
              onClick={() => {
                setHq(false);
                updateAllIssueItems({ hq: false });
              }}
            >
              All low quality
            </Button>
          ) : (
            <Button
              onClick={() => {
                setHq(true);
                updateAllIssueItems({ hq: true });
              }}
            >
              All high quality
            </Button>
          )}

          {comic &&
            (containsBookmark(comic.id) ? (
              <Button bg="red" onClick={() => removeBookmark(comic.id)}>
                Remove bookmark
              </Button>
            ) : (
              <Button bg="green" onClick={() => addBookmark(comic.id)}>
                Add Bookmark
              </Button>
            ))}
        </HStack>
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
          {issues.map((issue: ViewIssueItem) => (
            <IssueItem
              key={issue.id}
              issue={issue}
              title={comic!.title}
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
      <Box
        mt={4}
        maxHeight="600px"
        bg="white"
        borderRadius="md"
        p={4}
        position="fixed"
        top="25px"
        right="50px"
        width="500px"
        maxWidth="1000px"
      >
        <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
          Bookmarks
        </Text>

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
          {bookmarks.map((bookmark: Comic) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              getIssuesById={getIssuesById}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ViewComic;
