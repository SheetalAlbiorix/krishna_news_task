import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEWS_API_KEY; // Or from env

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
  endpoints: (builder) => ({
    getNewsByCategory: builder.query<any, string>({
      query: (category) =>
        `everything?q=${category}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`,
    }),
  }),
});

export const { useGetNewsByCategoryQuery } = newsApi;
