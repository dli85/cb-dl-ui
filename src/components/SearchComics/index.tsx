import "./index.css";
import React, { useState, useEffect } from "react";
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
import { SearchComicsByTitle } from "../../services/ComicService";
import Comic from "../../models/ComicModels";
import { parseAddComicResponse } from "../../Util/ComicUtil";
import SearchComicListItem from "./ListItem";
const SearchComics = () => {
  const [title, setTitle] = useState("");
  const [comics, setComics] = useState<Comic[]>([]);

  //   const [errorMessage, setErrorMessage] = useState("");

  //   const [errorType, setErrorType] = useState("success");
  //   const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (title.trim() === "") {
      setComics([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      console.log(title);
      const results = parseAddComicResponse(await SearchComicsByTitle(title));
      if (!("error" in results)) {
        setComics(results);
      }
      console.log(results);
    }, 300); // Adding a debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [title]);

  return (
    <Box
      className="centered-container-search"
      p={4}
      position="fixed"
      top="100px"
      left="400px"
      width="1000px"
      maxWidth="1000px"
    >
      <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
        Search for comics in the database
      </Text>
      <HStack mt={4} gap={4} width="100%">
        <Input
          placeholder="Search..."
          bg="white"
          color="black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
        {comics.map((comic) => (
          <SearchComicListItem key={comic.id} comic={comic} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchComics;
