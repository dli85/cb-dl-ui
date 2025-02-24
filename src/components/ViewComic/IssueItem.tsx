import { Box, HStack } from "@chakra-ui/react";
import Checkbox from "@mui/material/Checkbox";
import { Issue } from "../../models/ComicModels";
import { ViewIssueItem } from "../../hooks/useViewComic";

export interface IssueItemProps {
  issue: ViewIssueItem;
  updateIssueItem: (id: number, updates: Partial<ViewIssueItem>) => void;
}

const IssueItem = (props: IssueItemProps) => {
  const { issue, updateIssueItem } = props;
  return (
    <Box
      border="2px solid #000"
      maxWidth="100%"
      borderRadius="8px"
      my="10px"
      p="8px"
    >
      <HStack justifyContent="space-between" width="100%">
        <HStack>
          <Checkbox
            checked={issue.checked}
            onChange={() =>
              updateIssueItem(issue.id, { checked: !issue.checked })
            }
          />
          <Box>{issue.title}</Box>
        </HStack>
        <HStack>
          <Box>High Quality:</Box>
          <Checkbox
            checked={issue.hq}
            onChange={() => updateIssueItem(issue.id, { hq: !issue.hq })}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default IssueItem;
