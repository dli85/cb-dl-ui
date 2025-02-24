import { AddComicResponse, GetIssuesResponse } from "../models/ComicModels";
import Comic, { Issue } from "../models/ComicModels";

export const parseListOfComicsResponse = (data: any): AddComicResponse => {
  if (Array.isArray(data)) {
    return data as Comic[];
  } else if (
    typeof data === "object" &&
    "error" in data &&
    typeof data.error === "string"
  ) {
    return data as { error: string };
  }

  return { error: "Invalid response format" };
};

export const parseListOfIssuesResponse = (data: any): GetIssuesResponse => {
  if (Array.isArray(data)) {
    return data as Issue[];
  } else if (
    typeof data === "object" &&
    "error" in data &&
    typeof data.error === "string"
  ) {
    return data as { error: string };
  }

  return { error: "Invalid response format" };
};
