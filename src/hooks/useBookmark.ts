import { useState } from "react";
import Comic from "../models/ComicModels";
import { getComicById } from "../services/ComicService";

const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState<Comic[]>([]);

  const addBookmark = async (id: number) => {
    if (!bookmarks.some((comic) => comic.id === id)) {
      const comic = await getComicById(id);
      if (comic) {
        setBookmarks((prev) => [...prev, comic]);
      }
    }
  };

  const removeBookmark = (id: number) => {
    setBookmarks((prev) => prev.filter((comic) => comic.id !== id));
  };

  const getBookmarkById = (id: number): Comic | undefined => {
    return bookmarks.find((comic) => comic.id === id);
  };

  const containsBookmark = (id: number) => {
    return bookmarks.some((comic) => comic.id === id);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    getBookmarkById,
    containsBookmark,
  };
};

export default useBookmark;
