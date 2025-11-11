import { api } from "@/src/redux/base/baseApi";

export const companyPackageSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        myServicePackages: builder.query({
            query: ({per_page=10, service_id})=>({
                url: `/my-service-package?per_page=${per_page}&service_id=${service_id}`,
                method: "GET",

            }),
            providesTags: ["services"]
        }),
        myServicePackageDetails: builder.query({
            query: (id)=>({
                url: `/my-service-package/${id}`,
                method: "GET"
            }),
            providesTags: ["services"]
        }),
        myServicePackage: builder.mutation({
            query: (requestBody)=>({
                url:"/my-service-package",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags: ["services"]
        }),
        editMyServicePackage: builder.mutation({
            query: ({id, requestBody})=>({
                url: `/my-service-package/${id}`,
                method: "POST",
                body: requestBody
            }),
            invalidatesTags: ["services"]
        }),
        addServicePackageDetailItem : builder.mutation({
            query: (requestBody)=>({
                url: "/add-service-package-detail-item",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags: ["services"]
        }),
        deleteServicePackageDetailItem: builder.mutation({
            query: (id)=>({
                url: `delete-service-package-detail-item/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["services"]
        }),
        addServiceAvailableTime: builder.mutation({
            query: (requestBody)=>({
                url: "add-service-available-time",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags:["services"]
        }),
        updateServiceAvailableTime: builder.mutation({
            query: ({id, requestBody}) =>({
                url: `/update-service-available-time/${id}`,
                method: "POST",
                body: requestBody
            }),
            invalidatesTags:["services"]
        }),

    })
})



export const {
    useMyServicePackagesQuery,
    useMyServicePackageDetailsQuery,
    useMyServicePackageMutation,
    useEditMyServicePackageMutation, // maybe lazy fetch
    useAddServicePackageDetailItemMutation,
    useDeleteServicePackageDetailItemMutation,
    useAddServiceAvailableTimeMutation,
    useUpdateServiceAvailableTimeMutation // maybe lazy fetch
} = companyPackageSlice;