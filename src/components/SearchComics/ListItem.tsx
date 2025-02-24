import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import Comic from "../../models/ComicModels";
import { useNavigate } from "react-router-dom";

export interface SearchComicListItemProps {
  comic: Comic;
  getIssuesById: (id: number, link: string) => void;
}

const SearchComicListItem = (props: SearchComicListItemProps) => {
  const navigate = useNavigate();
  const { comic, getIssuesById } = props;
  return (
    <Box
      border="2px solid #000"
      maxWidth="100%"
      borderRadius="8px"
      my="10px"
      p="8px"
    >
      <HStack>
        <VStack>
          <Box width="auto" maxWidth="90%">
            {comic.title}
          </Box>
          <HStack maxWidth="90%">
            <Box fontSize="sm">
              Date Published: {comic.date_published.substring(0, 4)}
            </Box>
            <Box fontSize="sm">Writers: {comic.writers}</Box>
            <Box fontSize="sm">Artists: {comic.artists}</Box>
            <Box fontSize="sm">Number of issues: {comic.number_issues}</Box>
          </HStack>
        </VStack>
        <Button
          ml="auto"
          bg="green"
          onClick={() => {
            getIssuesById(comic.id, comic.link);
            navigate("/view-comic");
          }}
        >
          View Issues
        </Button>
      </HStack>
    </Box>
  );
};

export default SearchComicListItem;
