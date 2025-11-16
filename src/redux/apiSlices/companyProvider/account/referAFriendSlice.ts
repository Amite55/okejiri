import { api } from "@/src/redux/base/baseApi";

export const companyReferAFriendSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    myReferrals: builder.query({
      query: (page) => ({
        url: `/my-referrals&page=${page}`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
  }),
});

export const { useMyReferralsQuery } = companyReferAFriendSlice;
