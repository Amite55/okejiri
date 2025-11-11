import { api } from "../../base/baseApi";

export const individualOrderSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    get_provider_Orders: builder.query({
      query: (filter = "this_week") => ({
        url: `/home-data?filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    order_details: builder.query({
      query: (id) => ({
        url: `/order-details/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    request_extend_delivery_time: builder.mutation({
      query: (data) => ({
        url: "/request-extend-delivery-time",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["extend_delivery"],
    }),
    order_approve: builder.mutation({
      query: (id) => ({
        url: `/order-approve/${id}`,
        method: "POST",
      }),

      invalidatesTags: ["order_approve"],
    }),
    add_dispute: builder.mutation({
      query: (data) => ({
        url: "/add-dispute",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["add_dispute"],
    }),
    order_reject: builder.mutation({
      query: (id) => ({
        url: `/order-reject/${id}`,
        method: "POST",
      }),

      invalidatesTags: ["order_reject"],
    }),
    request_for_delivery: builder.mutation({
      query: (id) => ({
        url: `/order-reject/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["request_delivery"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGet_provider_OrdersQuery,
  useOrder_detailsQuery,
  useRequest_extend_delivery_timeMutation,
} = individualOrderSlices;
