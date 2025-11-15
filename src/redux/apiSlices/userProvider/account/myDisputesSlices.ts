import { api } from "@/src/redux/base/baseApi";
// "http://103.186.20.114:8005/api/my-dispute?per_page=10&page=1"
export const myDisputesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    myDispute: builder.query({
      query: (page) => ({
        url: `/my-dispute`,
      }),
      providesTags: ["dispute"],
    }),
    disputeDetails: builder.query({
      query: (id) => ({
        url: `/dispute-details/${id}`,
        method: "GET",
      }),
      providesTags: ["dispute"],
    }),
    disputeDelete: builder.mutation({
      query: (id) => ({
        url: `/remove-dispute/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["dispute"],
    }),
    addDisputeAppeal: builder.mutation({
      query: (data) => ({
        url: `/add-dispute-appeal`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dispute"],
    }),
  }),
});

export const {
  useMyDisputeQuery,
  useLazyMyDisputeQuery,
  useDisputeDetailsQuery,
  useDisputeDeleteMutation,
  useAddDisputeAppealMutation,
} = myDisputesSlices;
