import { api } from "@/src/redux/base/baseApi";

export const companyMyDisputeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    myDispute: builder.query({
      query: ({ per_page, page }) => ({
        url: `/my-dispute?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["settings", "addPortfolio", "add_dispute", "dispute"],
    }),
    disputeDetails: builder.query({
      query: (id) => ({
        url: `/dispute-details/${id}`,
        method: "GET",
      }),
      providesTags: ["settings", "add_dispute", "dispute"],
    }),
    disputeDelete: builder.mutation({
      query: (id) => ({
        url: `/dispute-details/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["settings", "add_dispute", "dispute"],
    }),
    addDisputeAppeal: builder.mutation({
      query: (requestBody) => ({
        url: "/add-dispute-appeal",
        method: "POST",
        body: requestBody,
        headers: {
          "Content-Type": "multipart/form-data",
          // "Accept": "application/json",
        },
      }),
      invalidatesTags: ["settings", "add_dispute", "dispute"],
    }),
  }),
  overrideExisting: true,
});
export const {
  useMyDisputeQuery,
  useLazyMyDisputeQuery,
  useDisputeDetailsQuery,
  useDisputeDeleteMutation,
  useAddDisputeAppealMutation,
} = companyMyDisputeSlice;
