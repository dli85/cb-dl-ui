const API_URL = "http://127.0.0.1:8000";

export const searchComicsByTitle = async (title: string) => {
  try {
    const response = await fetch(
      `${API_URL}/comics/search_comics?title=${title}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    return { error: `Fetch error: ${error}` };
  }
};

export const getIssuesByComicId = async (id: number) => {
  try {
    const response = await fetch(
      `${API_URL}/comics/get_issues_for_comic/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    return { error: `Fetch error: ${error}` };
  }
};

// get_issues_by_link
export const getIssuesByComicLink = async (link: string) => {
  try {
    const response = await fetch(
      `${API_URL}/comics/get_issues_by_link?url=${link}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    return { error: `Fetch error: ${error}` };
  }
};
