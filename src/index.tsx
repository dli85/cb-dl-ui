import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DownloadJobs from "./components/DownloadJobs";
import AddComic from "./components/AddComic";
import { system } from "./theme";
import SearchComics from "./components/SearchComics";
import useViewComic from "./hooks/useViewComic";
import ViewComic from "./components/ViewComic";
import { error } from "console";
import CreateJob from "./components/CreateJob";
import useCreateJob from "./hooks/useCreateJob";
import useBookmark from "./hooks/useBookmark";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const {
    url,
    setUrl,
    comic,
    issues,
    setIssues,
    getIssuesById,
    errorMessage,
    errorType,
    isVisible,
    setIsVisible,
    updateIssueItem,
    updateAllIssueItems,
    getIssuesByLink,
    clearIssues,
    hq,
    setHq,
  } = useViewComic();

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
  } = useCreateJob();

  const {
    bookmarks,
    addBookmark,
    removeBookmark,
    getBookmarkById,
    containsBookmark,
  } = useBookmark();

  return (
    <ChakraProvider value={system}>
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
            <Routes>
              <Route path="/download-jobs" element={<DownloadJobs />} />
              <Route
                path="/create-job"
                element={
                  <CreateJob
                    jobName={jobName}
                    setJobName={setJobName}
                    issuesWorkload={issuesWorkload}
                    setIssuesWorkload={setIssuesWorkload}
                    addIssuesToJob={addIssuesToJob}
                    updateIssueWorkloadItem={updateIssueWorkloadItem}
                    deleteIssueById={deleteIssueById}
                    jobErrorMessage={jobErrorMessage}
                    jobErrorType={jobErrorType}
                    jobErrorVisible={jobErrorVisible}
                    setJobErrorVisible={setJobErrorVisible}
                    clearAll={clearAll}
                    createAndStartJob={createAndStartJob}
                  />
                }
              />
              <Route
                path="/search-comics"
                element={<SearchComics getIssuesById={getIssuesById} />}
              />
              <Route
                path="/view-comic"
                element={
                  <ViewComic
                    url={url}
                    setUrl={setUrl}
                    issues={issues}
                    comic={comic}
                    setIssues={setIssues}
                    errorMessage={errorMessage}
                    errorType={errorType}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    updateIssueItem={updateIssueItem}
                    updateAllIssueItems={updateAllIssueItems}
                    getIssuesByLink={getIssuesByLink}
                    addIssuesToJob={addIssuesToJob}
                    bookmarks={bookmarks}
                    addBookmark={addBookmark}
                    removeBookmark={removeBookmark}
                    getBookmarkById={getBookmarkById}
                    containsBookmark={containsBookmark}
                    clearIssues={clearIssues}
                    getIssuesById={getIssuesById}
                    hq={hq}
                    setHq={setHq}
                  />
                }
              />
              <Route path="/add-comic" element={<AddComic />} />
              <Route path="*" element={<h1>Welcome! Select an option.</h1>} />
            </Routes>
          </div>
        </div>
      </Router>
    </ChakraProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
