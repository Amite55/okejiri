import { api } from "../../base/baseApi";

export const bookingsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    reportProvider: builder.mutation({
      query: (reports) => ({
        url: "/report-provider",
        method: "POST",
        body: reports,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["provider", "notifications"],
    }),
    providerDiscount: builder.query({
      query: (id) => ({
        url: `/get-provider-discount?provider_id=${id}`,
        method: "GET",
      }),
      providesTags: ["provider", "order", "services"],
    }),
    bookingSuccess: builder.mutation({
      query: (bookingInfo) => ({
        url: "/booking",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: [
        "booking",
        "order",
        "notifications",
        "payment",
        "balance",
        "order_approve",
        "order_reject",
      ],
    }),
    deliveryTimeExtensionDetails: builder.query({
      query: (id) => ({
        url: `/delivery-time-extension_details/${id}`,
        method: "GET",
      }),
      providesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
      ],
    }),
    acceptDeliveryTimeExtension: builder.mutation({
      query: (id) => ({
        url: `/delivery-time-extension/accept/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
      ],
    }),
    declineDeliveryTimeExtension: builder.mutation({
      query: (id) => ({
        url: `/delivery-time-extension/decline/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
      ],
    }),
    acceptDeliveryRequest: builder.mutation({
      query: (id) => ({
        url: `/accept-delivery-request/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
      ],
    }),
    declineDeliveryRequest: builder.mutation({
      query: (id) => ({
        url: `/decline-delivery-request/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
      ],
    }),
    orderDetails: builder.query({
      query: (id) => ({
        url: `/order-details/${id}`,
        method: "GET",
      }),
      providesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
        "payment",
      ],
    }),
    orderCancel: builder.mutation({
      query: (id) => ({
        url: `/order-cancel/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
        "profile",
        "services",
      ],
    }),
    myBookings: builder.query({
      query: ({ page, per_page }) => ({
        url: `/my-bookings?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
      ],
    }),
    bookingsHistory: builder.query({
      query: ({ page, per_page }) => ({
        url: `/bookings-history?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: [
        "delivery",
        "order",
        "services",
        "booking",
        "order_approve",
        "order_reject",
      ],
    }),
    addDispute: builder.mutation({
      query: (formData) => {
        return {
          url: `/add-dispute`,
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: [
        "dispute",
        "profile",
        "settings",
        "add_dispute",
        "services",
        "provider",
        "notifications",
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useReportProviderMutation,
  useProviderDiscountQuery,
  useBookingSuccessMutation,
  useDeliveryTimeExtensionDetailsQuery,
  useAcceptDeliveryTimeExtensionMutation,
  useDeclineDeliveryTimeExtensionMutation,
  useAcceptDeliveryRequestMutation,
  useDeclineDeliveryRequestMutation,
  useOrderDetailsQuery,
  useOrderCancelMutation,
  useMyBookingsQuery,
  useBookingsHistoryQuery,
  useAddDisputeMutation,
} = bookingsSlice;
