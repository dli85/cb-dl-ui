import {
  Box,
  Text,
  Input,
  Button,
  HStack,
  ListItem,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Issue } from "../../models/ComicModels";
import { ViewIssueItem } from "../../hooks/useViewComic";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import CreateJobIssue from "./CreateJobIssue";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

export interface CreateJobProps {
  jobName: string;
  setJobName: (n: string) => void;
  issuesWorkload: ViewIssueItem[];
  setIssuesWorkload: any;
  addIssuesToJob: (n: ViewIssueItem[]) => void;
  updateIssueWorkloadItem: (
    id: number,
    updates: Partial<ViewIssueItem>
  ) => void;
  deleteIssueById: (id: number) => void;
  jobErrorMessage: string;
  jobErrorType: string;
  jobErrorVisible: boolean;
  setJobErrorVisible: (n: boolean) => void;
  clearAll: () => void;
  createAndStartJob: () => void;
}

const CreateJob = (props: CreateJobProps) => {
  const {
    jobName,
    setJobName,
    issuesWorkload,
    setIssuesWorkload,
    addIssuesToJob,
    updateIssueWorkloadItem,
    deleteIssueById,
    jobErrorMessage,
    jobErrorType,
    jobErrorVisible,
    setJobErrorVisible,
    clearAll,
    createAndStartJob,
  } = props;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setIssuesWorkload((items: ViewIssueItem[]) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex !== newIndex) {
        return arrayMove(items, oldIndex, newIndex);
      }
      return items;
    });
  };

  return (
    <>
      <Box
        className="centered-container-search"
        p={4}
        position="fixed"
        top="25px"
        left="400px"
        width="1000px"
        maxWidth="1000px"
      >
        {jobErrorVisible && (
          <Box
            bg={jobErrorType === "success" ? "green.200" : "red.200"}
            p={3}
            mt={4}
            borderRadius="md"
            position="relative"
            width="75%"
            mb="10px"
          >
            <Text fontWeight="bold">{jobErrorMessage}</Text>
            <CloseButton
              position="absolute"
              size="sm"
              right="1px"
              top="1px"
              onClick={() => setJobErrorVisible(false)}
            />
          </Box>
        )}
        <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
          Create Download Job (Top is last)
        </Text>
        <HStack mt={4} gap={4} width="50%">
          <Input
            placeholder="Job Name"
            bg="white"
            color="black"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
          />
          <Button onClick={createAndStartJob}>Create and Start job</Button>
        </HStack>
        <Box
          mt={4}
          maxHeight="600px"
          overflowY="auto"
          width="100%"
          bg="white"
          p={2}
          borderRadius="md"
          position="relative"
        >
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={issuesWorkload}>
              <List
                height={600}
                itemCount={issuesWorkload.length}
                itemSize={80}
                width="100%"
              >
                {({ index, style }: ListChildComponentProps) => {
                  const issue = issuesWorkload[index];

                  if (!issue) return null;

                  return (
                    <div style={style}>
                      <CreateJobIssue
                        key={issue.id}
                        issue={issue}
                        updateIssueWorkloadItem={updateIssueWorkloadItem}
                        deleteIssueById={deleteIssueById}
                      />
                    </div>
                  );
                }}
              </List>
            </SortableContext>
          </DndContext>
        </Box>
      </Box>
    </>
  );
};

export default CreateJob;
