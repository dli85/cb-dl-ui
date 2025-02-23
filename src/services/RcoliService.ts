import Comic from "../models/ComicModels";
import { AddComicResponse } from "../models/ComicModels";
const API_URL = "http://127.0.0.1:8000";

export const addSingleNewComic = async (
  url: string
): Promise<AddComicResponse> => {
  try {
    const response = await fetch(`${API_URL}/rcoli/add_comics_and_issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls: [url] }),
    });
    if (!response) {
      console.log("got here");
      return { error: "Failed to connect to server" };
    }

    const data = response.json();
    return data;
  } catch (error) {
    return { error: `Fetch error: ${error}` };
  }
};

export const addOrUpdateSingleComic = async (
  url: string
): Promise<AddComicResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/rcoli/add_or_update_comic_and_issues`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls: [url] }),
      }
    );

    if (!response) {
      return { error: "Failed to connect to server" };
    }

    const data = response.json();
    return data;
  } catch (error) {
    return { error: `Fetch error: ${error}` };
  }
};
