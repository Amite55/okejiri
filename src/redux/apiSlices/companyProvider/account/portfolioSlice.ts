import { api } from "@/src/redux/base/baseApi";

export const companyPortfolioSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (page) => ({
        url: `/portfolios?page=${page}`,
        method: "GET",
      }),
      providesTags: ["portfolio"],
    }),
    addPortfolio: builder.mutation({
      query: (requestBody) => ({
        url: "/portfolios",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: requestBody,
      }),
      invalidatesTags: ["portfolio", "addPortfolio"],
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, requestBody }) => ({
        url: `/portfolios/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: requestBody,
      }),
      invalidatesTags: ["portfolio", "addPortfolio"],
    }),
    deletePortfolios: builder.mutation({
      query: (id) => ({
        url: `/portfolios/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["portfolio"],
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useLazyGetPortfoliosQuery,
  useAddPortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfoliosMutation,
} = companyPortfolioSlice;
