import { useState } from "react";
import {
  getComicById,
  getComicByLink,
  getIssuesByComicId,
  getIssuesByComicLink,
} from "../services/ComicService";
import { parseListOfIssuesResponse } from "../Util/ComicUtil";
import { Issue } from "../models/ComicModels";

export interface ViewIssueItem extends Issue {
  checked: boolean;
  hq: boolean;
  comic_title: string;
}

const useViewComic = () => {
  const [url, setUrl] = useState<string>("");
  const [issues, setIssues] = useState<ViewIssueItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorType, setErrorType] = useState<"failure" | "success">("failure");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const getIssuesById = async (id: number, link: string) => {
    const response = parseListOfIssuesResponse(await getIssuesByComicId(id));
    const comic = await getComicById(id);

    if ("error" in comic) {
      setErrorMessage("Error: " + comic.error);
      setErrorType("failure");
      setIsVisible(true);
    }

    if ("error" in response) {
      setErrorMessage("Error: " + response.error);
      setErrorType("failure");
      setIsVisible(true);
    } else {
      const issueItems: ViewIssueItem[] = response.map((issue: Issue) => ({
        ...issue,
        checked: true,
        hq: false,
        comic_title: comic.title,
      }));

      setIssues(issueItems);
      setUrl(link);
    }
  };

  const getIssuesByLink = async (link: string) => {
    const response = parseListOfIssuesResponse(
      await getIssuesByComicLink(link)
    );
    const comic = await getComicByLink(link);

    if ("error" in comic) {
      setErrorMessage("Error: " + comic.error);
      setErrorType("failure");
      setIsVisible(true);
    }

    if ("error" in response) {
      setErrorMessage("Error: " + response.error);
      setErrorType("failure");
      setIsVisible(true);
    } else {
      const issueItems: ViewIssueItem[] = response.map((issue: Issue) => ({
        ...issue,
        checked: true,
        hq: false,
        comic_title: comic.title,
      }));

      setIssues(issueItems);
      setUrl(link);
    }
  };

  const updateIssueItem = (id: number, updates: Partial<ViewIssueItem>) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, ...updates } : issue
      )
    );
  };

  const updateAllIssueItems = (updates: Partial<ViewIssueItem>) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) => ({
        ...issue,
        ...updates,
      }))
    );
  };

  return {
    url,
    setUrl,
    issues,
    setIssues,
    getIssuesById,
    errorMessage,
    errorType,
    isVisible,
    setIsVisible,
    updateIssueItem,
    updateAllIssueItems,
    getIssuesByLink,
  };
};

export default useViewComic;
