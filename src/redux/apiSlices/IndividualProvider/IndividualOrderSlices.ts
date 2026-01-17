import { api } from "../../base/baseApi";

export const individualOrderSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    get_provider_Orders: builder.query({
      query: (filter = "this_week") => ({
        url: `/home-data?filter=${filter}`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "order_approve",
        "order_reject",
        "provider",
        "notifications",
        "payment",
      ],
    }),
    order_details: builder.query({
      query: (id) => ({
        url: `/order-details/${id}`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "order_approve",
        "order_reject",
        "provider",
        "notifications",
      ],
    }),
    request_extend_delivery_time: builder.mutation({
      query: (data) => ({
        url: "/request-extend-delivery-time",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "extend_delivery",
        "booking",
        "order_approve",
        "order_reject",
        "notifications",
        "payment",
      ],
    }),
    order_approve: builder.mutation({
      query: (id) => ({
        url: `/order-approve/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["order_approve", "order_reject", "order"],
    }),
    add_dispute: builder.mutation({
      query: (data) => ({
        url: "/add-dispute",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["add_dispute", "dispute", "order"],
    }),
    order_reject: builder.mutation({
      query: (id) => ({
        url: `/order-reject/${id}`,
        method: "POST",
      }),

      invalidatesTags: ["order_reject", "order", "dispute", "order_approve"],
    }),
    request_for_delivery: builder.mutation({
      query: (id) => ({
        url: `/order-reject/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["request_delivery", "order", "order_approve"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGet_provider_OrdersQuery,
  useOrder_detailsQuery,
  useRequest_extend_delivery_timeMutation,
} = individualOrderSlices;
