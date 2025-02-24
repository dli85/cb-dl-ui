import "./index.css";
import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  HStack,
  StackProps,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import {
  addSingleNewComic,
  addOrUpdateSingleComic,
} from "../../services/RcoliService";
import { parseListOfComicsResponse } from "../../Util/ComicUtil";

const AddComic = () => {
  const [url, setUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [errorType, setErrorType] = useState("success");
  const [isVisible, setIsVisible] = useState(false);

  const addSingleComic = async () => {
    const response = parseListOfComicsResponse(await addSingleNewComic(url));
    if (
      "error" in response &&
      (response.error as string).includes("duplicate")
    ) {
      setErrorMessage("Comic has already been added");
      setErrorType("failure");
      setIsVisible(true);
    } else if ("error" in response) {
      setErrorMessage("Error: " + response.error);
      setErrorType("failure");
      setIsVisible(true);
    } else {
      setErrorMessage("Comic added successfully!");
      setErrorType("success");
      setIsVisible(true);
    }
  };

  const addOrUpdateComic = async () => {
    const response = parseListOfComicsResponse(
      await addOrUpdateSingleComic(url)
    );
    if ("error" in response) {
      setErrorMessage("Error: " + response.error);
      setErrorType("failure");
      setIsVisible(true);
    } else {
      setErrorMessage("Comic added successfully!");
      setErrorType("success");
      setIsVisible(true);
    }
  };

  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <Box className="centered-container" p={4}>
      <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
        Add a comic to the database
      </Text>
      <Text fontFamily="body">Or update a comic that already exists</Text>

      <HStack mt={4} gap={4} width="100%">
        <Input
          placeholder="Search..."
          bg="white"
          color="black"
          value={url}
          onChange={onChangeUrl}
        />
        <Button onClick={addSingleComic}>Add</Button>
        <Button onClick={addOrUpdateComic}>Add/Update</Button>
      </HStack>

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
    </Box>
  );
};

export default AddComic;
