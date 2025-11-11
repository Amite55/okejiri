import { api } from "@/src/redux/base/baseApi";

export const companyMyDisputeSlice = api.injectEndpoints({
    endpoints:(builder)=>({
        myDispute: builder.query({
            query: (per_page = 10) =>({
                url: `/my-dispute?per_page=${per_page}`,
                method: "GET",
            }),
            providesTags: ["settings"]
        }),
        disputeDetails: builder.query({
            query: (id)=>({
                url: `/dispute-details/${id}`,
                method: "GET"
            }),
            providesTags: ["settings"]
        }),
        disputeDelete: builder.mutation({
            query: (id)=>({
                url: `/dispute-details/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["settings"]
        }),
        addDisputeAppeal: builder.mutation({
            query: (requestBody) =>({
                url: "/add-dispute-appeal",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags: ["settings"]
        }),
    })
})
export const {
    useMyDisputeQuery,
    useDisputeDetailsQuery,
    useDisputeDeleteMutation,
    useAddDisputeAppealMutation
}= companyMyDisputeSlice;