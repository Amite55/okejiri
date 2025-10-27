import { api } from "@/src/redux/base/baseApi";

export const referralFriendsSlices = api.injectEndpoints({
  endpoints: (build) => ({
    myReferrals: build.query({
      query: (page) => ({
        url: `/my-referrals?per_page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useMyReferralsQuery } = referralFriendsSlices;
