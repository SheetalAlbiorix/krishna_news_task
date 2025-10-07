import axios from "axios";

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const getNewsByQuery = async (query: string) => {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        from: fromDate.toISOString().split("T")[0],
        sortBy: "publishedAt",
        language: "en",
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
