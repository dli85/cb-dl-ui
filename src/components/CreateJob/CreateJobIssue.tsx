import { Box, Button, HStack, Text } from "@chakra-ui/react";
import Checkbox from "@mui/material/Checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from "react";
import { ViewIssueItem } from "../../hooks/useViewComic";

interface CreateJobIssueProps {
  issue: ViewIssueItem;
  updateIssueWorkloadItem: (
    id: number,
    updates: Partial<ViewIssueItem>
  ) => void;
  deleteIssueById: (id: number) => void;
}

const CreateJobIssue = memo(
  ({
    issue,
    updateIssueWorkloadItem,
    deleteIssueById,
  }: CreateJobIssueProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: issue.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style}>
        <Box
          border="2px solid #000"
          maxWidth="100%"
          borderRadius="8px"
          my="10px"
          p="8px"
        >
          <HStack justifyContent="space-between" width="100%">
            <HStack
              {...attributes}
              {...listeners}
              style={{ cursor: "grab" }}
              width="74%"
            >
              <Text>
                {issue.comic_title} {issue.title}
              </Text>
            </HStack>
            <HStack>
              <Box>High Quality:</Box>
              <Checkbox
                checked={issue.hq}
                onChange={() => {
                  updateIssueWorkloadItem(issue.id, { hq: !issue.hq });
                }}
                data-no-dnd
              />
              <Button
                bg="red"
                onClick={() => {
                  deleteIssueById(issue.id);
                }}
                data-no-dnd
              >
                Delete
              </Button>
            </HStack>
          </HStack>
        </Box>
      </div>
    );
  }
);

export default CreateJobIssue;
