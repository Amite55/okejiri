import { api } from "@/src/redux/base/baseApi";

export const companyServicesSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        getServices: builder.query({
            query: ()=>({
                url: "/services",
                method: "GET"
            }),
            providesTags: ["services"]
        }),
        myServices: builder.query({
            query: (per_page=10)=>({
                url: `/my-services?per_page=${per_page}`,
                method: "GET"
            }),
            providesTags: ["services"]
        }),
        deleteMyServices: builder.mutation({
            query: (id)=>({
                url: `/delete-my-services/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["services"]
        }),
        addNewServices: builder.mutation({
            query: (requestBody)=>({
                url: "/add-new-services",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags:["services"]
        })
    })
})

export const {
    useGetServicesQuery,
    useMyServicesQuery,
    useDeleteMyServicesMutation,
    useAddNewServicesMutation
} = companyServicesSlice;