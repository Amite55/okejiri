import { api } from "@/src/redux/base/baseApi";

export const settingsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getPages: builder.query({
      query: (pageName) => ({
        url: `/pages?type=${pageName}`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    getFAQ: builder.query({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
  }),
});

export const { useGetPagesQuery, useGetFAQQuery } = settingsSlices;
