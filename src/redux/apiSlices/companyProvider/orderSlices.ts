import { api } from "../../base/baseApi";

export const companyProviderOrderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orderDetails: builder.query({
      query: (id) => ({
        url: `/order-details/${id}`,
        method: "GET",
      }),
      providesTags: ["order", "booking", "order_approve", "order_reject"],
    }),
    getAllProviderOrders: builder.query({
      query: () => ({
        url: "/get-provider-orders",
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "order_approve",
        "order_reject",
        "provider",
        "payment",
      ],
    }),
    getProviderOrders: builder.query({
      query: ({ status, booking_process = "instant" }) => {
        let queryString;
        if (status && booking_process) {
          queryString = `status=${status}&booking_process=${booking_process}`;
        } else if (status) {
          queryString = `status=${status}&booking_process=${booking_process}`;
        }
        return {
          url: queryString
            ? `/get-provider-orders?${queryString}`
            : `/get-provider-orders`,
          method: "GET",
        };
      },
      providesTags: [
        "order",
        "booking",
        "order_approve",
        "order_reject",
        "provider",
        "payment",
      ],
    }),
    requestExtendDeliveryTime: builder.mutation({
      query: (reasons) => ({
        url: "/request-extend-delivery-time",
        method: "POST",
        body: reasons,
      }),
      invalidatesTags: [
        "order",
        "booking",
        "notifications",
        "provider",
        "order_approve",
        "order_reject",
        "payment",
      ],
    }),
    orderApprove: builder.mutation({
      query: (id) => ({
        url: `/order-approve/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        "order",
        "booking",
        "notifications",
        "provider",
        "order_approve",
        "order_reject",
      ],
    }),
    addDispute: builder.mutation({
      query: (dispute) => ({
        url: "/add-dispute",
        method: "POST",
        body: dispute,
      }),
      invalidatesTags: ["dispute", "order", "booking", "notifications"],
    }),
    orderReject: builder.mutation({
      query: (id) => ({
        url: `/order-reject/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        "order",
        "booking",
        "notifications",
        "provider",
        "order_approve",
        "order_reject",
      ],
    }),
    requestForDelivery: builder.mutation({
      query: (id) => ({
        url: `/request-for-delivery/${id}`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

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
