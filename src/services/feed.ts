import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {FeedResponse, SupportedLanguage, WikipediaDateParam} from '../types'

interface IFeedApiHookParams {
  language: string;
  date: WikipediaDateParam;
  targetLanguage?: string;
}

// Define a service using a base URL and expected endpoints
export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
  endpoints: (builder) => ({
    getFeed: builder.query<FeedResponse, IFeedApiHookParams>({
      query: ({language, date, targetLanguage}) =>
        targetLanguage ?
          `/feed/translate/${language}/featured/${date.year}/${date.month}/${date.day}/${targetLanguage}` :
          `/feed/${language}/featured/${date.year}/${date.month}/${date.day}`,
    }),
    getSupportedLanguages: builder.query<SupportedLanguage[], any>({
      query: () => '/feed/languages',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetFeedQuery, useGetSupportedLanguagesQuery} = feedApi
