import { api } from "@/src/redux/base/baseApi";

export const companyReferAFriendSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        myReferrals: builder.query({
             query: (per_page=10)=>({
                url: `/my-referrals?per_page=${per_page}`,
                method: "GET"
            }),
            providesTags: ["settings"]
        })
    })
})

export const {
    useMyReferralsQuery,
}=companyReferAFriendSlice;