import { api } from "../../base/baseApi";

export const companyProviderOrderSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        orderDetails: builder.query({
            query: (id) => ({
                url: `/order-details/${id}`,
                method: "GET"
            }),
            providesTags: ["order"]
        }),
        getAllProviderOrders: builder.query({
            query: ()=>({
                url: "/get-provider-orders",
                method: "GET"
            }),
            providesTags: ["order"]
        }),
        getProviderOrders: builder.query({
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
                        ? `/get-provider-orders?${queryString}`
                        : `/get-provider-orders`,
                    method: "GET"
                }
            },
            providesTags:["order"]
        }),
        requestExtendDeliveryTime: builder.mutation({
            query: (reasons)=>({
                url: "/request-extend-delivery-time",
                method:"POST",
                body: reasons
            }),
            invalidatesTags:["order"]
        }),
        orderApprove: builder.mutation({
            query:(id)=>({
                url: `/order-approve/${id}`,
                method: "POST"
            }),
            invalidatesTags:["order"]
        }),
        addDispute: builder.mutation({
            query: (dispute)=>({
                url:"/add-dispute",
                method: "POST",
                body: dispute
            }),
            invalidatesTags:["dispute"]
        }),
        orderReject: builder.mutation({
            query: (id)=>({
                url: `/order-reject/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["order"]
        }),
        requestForDelivery:builder.mutation({
            query:(id)=>({
                url: `/request-for-delivery/${id}`,
                method: "POST"
            })
        }),
        


    }),
    overrideExisting: true
})


export const {
    useLazyOrderDetailsQuery,
    useOrderDetailsQuery,
    useLazyGetProviderOrdersQuery,
    useRequestExtendDeliveryTimeMutation,
    useOrderApproveMutation,
    useAddDisputeMutation,
    useOrderRejectMutation,
    useRequestForDeliveryMutation,
    useGetAllProviderOrdersQuery,
    
} = companyProviderOrderSlice; 