import { api } from "@/src/redux/base/baseApi";
export const myDisputesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    myDispute: builder.query({
      query: (page) => ({
        url: `/my-dispute`,
      }),
      providesTags: ["dispute", "add_dispute"],
    }),
    disputeDetails: builder.query({
      query: (id) => ({
        url: `/dispute-details/${id}`,
        method: "GET",
      }),
      providesTags: ["dispute"],
    }),
    disputeDeleteONE: builder.mutation({
      query: (id) => {
        return {
          url: `/dispute-delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["dispute", "add_dispute", "add_dispute"],
    }),
    addDisputeAppeal: builder.mutation({
      query: (data) => ({
        url: `/add-dispute-appeal`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dispute", "add_dispute"],
    }),
  }),
});

export const {
  useMyDisputeQuery,
  useLazyMyDisputeQuery,
  useDisputeDetailsQuery,
  useDisputeDeleteONEMutation,
  useAddDisputeAppealMutation,
} = myDisputesSlices;
