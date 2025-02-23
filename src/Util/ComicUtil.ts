import { AddComicResponse } from "../models/ComicModels";
import Comic from "../models/ComicModels";

export const parseAddComicResponse = (data: any): AddComicResponse => {
  console.log(data);
  if (Array.isArray(data)) {
    console.log("here");
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
