import { useState } from "react";
import { ViewIssueItem } from "./useViewComic";
import { addPagesMissingIssues } from "../services/RcoliService";
import { validateAddMissingPagesResponse } from "../Util/ComicUtil";
import { createAndStartDownload } from "../services/ComicService";

const useCreateJob = () => {
  const [jobName, setJobName] = useState<string>("");
  const [issuesWorkload, setIssuesWorkload] = useState<ViewIssueItem[]>([]);

  const [jobErrorMessage, setJobErrorMessage] = useState<string>("");
  const [jobErrorType, setJobErrorType] = useState<"failure" | "success">(
    "failure"
  );
  const [jobErrorVisible, setJobErrorVisible] = useState<boolean>(false);

  const addIssuesToJob = (issues: ViewIssueItem[]) => {
    setIssuesWorkload((prevIssues) => {
      const checked = issues.filter((issue) => issue.checked);
      const newIssues = checked.filter(
        (issue) => !prevIssues.some((prevIssue) => prevIssue.id === issue.id)
      );
      return [...newIssues, ...prevIssues];
    });
  };

  const updateIssueWorkloadItem = (
    id: number,
    updates: Partial<ViewIssueItem>
  ) => {
    console.log("got here");
    console.log(id, updates);
    setIssuesWorkload((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, ...updates } : issue
      )
    );
  };

  const deleteIssueById = (id: number) => {
    setIssuesWorkload((prevIssues) =>
      prevIssues.filter((issue) => issue.id !== id)
    );
  };

  const clearAll = () => {
    setJobName("");
    setIssuesWorkload([]);
  };

  const createAndStartJob = async () => {
    if (!jobName || issuesWorkload.length === 0) {
      setJobErrorMessage("Must defined a name and at least one issue");
      setJobErrorType("failure");
      setJobErrorVisible(true);
      return;
    }
    const reversed = issuesWorkload.reverse();
    const idsList = reversed.map((issue: ViewIssueItem) => {
      return issue.id;
    });
    const missingPagesPayload = reversed.map((issue: ViewIssueItem) => {
      return { id: issue.id, high_quality: issue.hq };
    });
    const missingPagesResponse = validateAddMissingPagesResponse(
      await addPagesMissingIssues(missingPagesPayload)
    );

    if ("error" in missingPagesResponse) {
      setJobErrorMessage("error: " + missingPagesResponse.error);
      setJobErrorType("failure");
      setJobErrorVisible(true);
      return;
    } else if (missingPagesResponse.failures.length > 0) {
      setJobErrorMessage(
        "error: failed to add pages for some issues, check console"
      );
      setJobErrorType("failure");
      setJobErrorVisible(true);
      console.log(missingPagesResponse);
      return;
    }
    const payload = {
      issue_ids: idsList,
      name: jobName,
    };

    const createDownloadResponse = await createAndStartDownload(payload);
  };

  return {
    jobName,
    setJobName,
    issuesWorkload,
    setIssuesWorkload,
    jobErrorMessage,
    jobErrorType,
    jobErrorVisible,
    setJobErrorVisible,
    addIssuesToJob,
    updateIssueWorkloadItem,
    deleteIssueById,
    clearAll,
    createAndStartJob,
  };
};

export default useCreateJob;
