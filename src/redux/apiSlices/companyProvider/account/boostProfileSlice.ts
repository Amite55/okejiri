import { api } from "@/src/redux/base/baseApi";

export const companyBoostProfileSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        boostMyProfilePost: builder.mutation({
            query: (requestBody) =>({
                url: "/boost-my-profile",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags: ["settings"]
        }) ,
        boostMyProfileGet: builder.query({
            query: ()=>({
                url: "/boost-my-profile",
                method: "GET"
            }),
            providesTags: ["settings"]
        }),
        getSetting: builder.query({
            query: ()=>({
                url: "/get-settings",
                method: "GET"
            }),
            providesTags: ["settings"]
        }),


    })
})

export const {
    useBoostMyProfileGetQuery,
    useBoostMyProfilePostMutation,
    useGetSettingQuery,
    // useLazyGetSettingQuery
}= companyBoostProfileSlice;