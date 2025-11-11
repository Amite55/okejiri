import { api } from "@/src/redux/base/baseApi";

export const companySettingsSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        getPage: builder.query({
            query: (type = "About Us")=>({
                url: `/pages?type=${type}`,
                method: "GET"
            }),
            providesTags: ["settings"]
        }),
        getFaqs: builder.query({
            query: ()=>({
                url: "/faqs",
                method: "GET"
            }),
            providesTags: ["settings"]
        })
    })
})

export const {
    useGetFaqsQuery,
    useGetPageQuery
}=companySettingsSlice;