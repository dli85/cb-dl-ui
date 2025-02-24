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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const {
    url,
    setUrl,
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
  } = useViewComic();

  return (
    <ChakraProvider value={system}>
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
            <Routes>
              <Route path="/download-jobs" element={<DownloadJobs />} />
              <Route path="/create-job" element={<h1>Create Job Page</h1>} />
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
                    setIssues={setIssues}
                    errorMessage={errorMessage}
                    errorType={errorType}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    updateIssueItem={updateIssueItem}
                    updateAllIssueItems={updateAllIssueItems}
                    getIssuesByLink={getIssuesByLink}
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
