import {
  AddComicResponse,
  GetDownloadJobsResponse,
  GetIssuesResponse,
} from "../models/ComicModels";
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

export const validateAddMissingPagesResponse = (data: any) => {
  if ("error" in data) {
    return { error: data.error };
  } else if ("successes" in data && "failures" in data) {
    return data;
  } else {
    return { error: "unrecognized response add missing pages response format" };
  }
};

export const parseGetDownloadJobs = (data: any): GetDownloadJobsResponse => {
  if ("error" in data) {
    return { error: data.error };
  } else if (
    "complete" in data &&
    "incomplete" in data &&
    Array.isArray(data.complete) &&
    Array.isArray(data.incomplete)
  ) {
    return {
      complete: data.complete,
      incomplete: data.incomplete,
    };
  } else {
    return { error: "Unrecognized get download jobs response" };
  }
};
