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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  return (
    <ChakraProvider value={system}>
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
            <Routes>
              <Route path="/download-jobs" element={<DownloadJobs />} />
              <Route path="/create-job" element={<h1>Create Job Page</h1>} />
              <Route path="/search-comics" element={<SearchComics />} />
              <Route path="/view-comic" element={<h1>View Comic Page</h1>} />
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
