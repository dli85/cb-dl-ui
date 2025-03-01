import { Box, Text } from "@chakra-ui/react";
import Comic from "../../models/ComicModels";

interface BookmarkItemProps {
  bookmark: Comic;
  getIssuesById: (id: number, link: string) => void;
}

const BookmarkItem = (props: BookmarkItemProps) => {
  const { bookmark, getIssuesById } = props;
  return (
    <Box
      border="2px solid #000"
      maxWidth="100%"
      borderRadius="8px"
      my="10px"
      p="8px"
      onClick={() => getIssuesById(bookmark.id, bookmark.link)}
    >
      <Text>{bookmark.title}</Text>
    </Box>
  );
};

export default BookmarkItem;
