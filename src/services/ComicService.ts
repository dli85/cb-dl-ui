const API_URL = "http://127.0.0.1:8000";

export const SearchComicsByTitle = async (title: string) => {
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
