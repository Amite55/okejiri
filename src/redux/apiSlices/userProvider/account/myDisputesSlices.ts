import { api } from "@/src/redux/base/baseApi";

export const myDisputesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    myDispute: builder.query({
      query: (page = 10) => ({
        url: `/my-dispute?per_page=${page}`,
        method: "GET",
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
