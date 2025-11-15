import { api } from "@/src/redux/base/baseApi";

export const referralFriendsSlices = api.injectEndpoints({
  endpoints: (build) => ({
    getMyReferrals: build.query({
      query: ({ per_page, page }) => ({
        url: `/my-referrals?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyReferralsQuery } = referralFriendsSlices;
