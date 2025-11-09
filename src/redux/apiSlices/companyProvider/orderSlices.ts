import { api } from "../../base/baseApi";

export const companyProviderOrderSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        orderDetails: builder.query({
            query: (id) => ({
                url: `order-details/${id}`,
                method: "GET"
            }),
            providesTags: ["order"]
        }),
        getOrders: builder.query({
            query: ({status, booking_process}) => {
                let queryString;
                if(status && booking_process){
                    queryString = `status=${status}&booking_process=${booking_process}`;
                }
                else if(status){
                    queryString = `status=${status}`;
                }
                
                // const queryString = new URLSearchParams(params).toString();
                console.log("Query string ========== ", queryString!)
                return {
                    url: queryString
                        ? `get-provider-orders?${queryString}`
                        : `get-provider-orders`,
                    method: "GET"
                }
            },
            providesTags:["order"]
        })

    }),
    overrideExisting: true
})


export const {
    useLazyOrderDetailsQuery,
    useLazyGetOrdersQuery
} = companyProviderOrderSlice; 