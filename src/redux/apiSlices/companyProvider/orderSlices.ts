import { api } from "../../base/baseApi";

export const companyProviderOrderSlice = api.injectEndpoints({
    endpoints:(builder)=>({
         orderDetails: builder.query({
            query:(id)=>({
                url:`order-details/${id}`,
                method: "GET"
            }),
            providesTags:["order"]
         })

    }),
    overrideExisting:true
})


export const {
    useLazyOrderDetailsQuery
} = companyProviderOrderSlice; 