import { useState } from "react";
import {
  getComicById,
  getComicByLink,
  getIssuesByComicId,
  getIssuesByComicLink,
} from "../services/ComicService";
import { parseListOfIssuesResponse } from "../Util/ComicUtil";
import Comic, { Issue } from "../models/ComicModels";

export interface ViewIssueItem extends Issue {
  checked: boolean;
  hq: boolean;
  comic_title: string;
}

const useViewComic = () => {
  const [url, setUrl] = useState<string>("");
  const [comic, setComic] = useState<Comic | undefined>(undefined);
  const [issues, setIssues] = useState<ViewIssueItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorType, setErrorType] = useState<"failure" | "success">("failure");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [hq, setHq] = useState<boolean>(false);

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
        checked: false,
        hq: false,
        comic_title: comic.title,
      }));

      setIssues(issueItems);
      setUrl(link);
      setComic(comic);

      updateAllIssueItems({ hq: hq });
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
        checked: false,
        hq: false,
        comic_title: comic.title,
      }));

      setIssues(issueItems);
      setUrl(link);
      setComic(comic);

      updateAllIssueItems({ hq: hq });
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

  const clearIssues = () => {
    setIssues([]);
    setUrl("");
    setComic(undefined);
  };

  return {
    url,
    setUrl,
    comic,
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
    clearIssues,
    hq,
    setHq,
  };
};

export default useViewComic;
