import { api } from "@/src/redux/base/baseApi";

export const referralFriendsSlices = api.injectEndpoints({
  endpoints: (build) => ({
    getMyReferrals: build.query({
      query: (page) => ({
        url: `/my-referrals&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyReferralsQuery, useLazyGetMyReferralsQuery } =
  referralFriendsSlices;
