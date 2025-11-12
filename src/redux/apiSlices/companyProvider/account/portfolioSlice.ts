import { api } from "@/src/redux/base/baseApi";

export const companyPortfolioSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (page = 10) => ({
        url: `/portfolios?page=${page}`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    addPortfolio: builder.mutation({
      query: (requestBody) => ({
        url: "/portfolios",
        method: "POST",
        body: requestBody,
      }),
      invalidatesTags: ["settings"],
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, requestBody }) => ({
        url: `/portfolios/${id}`,
        method: "POST",
        body: requestBody,
      }),
      invalidatesTags: ["settings"],
    }),
    deletePortfolios: builder.mutation({
      query: (id) => ({
        url: `/porfolios/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useAddPortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfoliosMutation,
} = companyPortfolioSlice;
