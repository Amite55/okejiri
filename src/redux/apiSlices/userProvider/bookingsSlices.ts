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
      invalidatesTags: ["provider"],
    }),
    providerDiscount: builder.query({
      query: (id) => ({
        url: `/get-provider-discount?provider_id=${id}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),
    bookingSuccess: builder.mutation({
      query: (bookingInfo) => ({
        url: "/booking",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["booking"],
    }),
    deliveryTimeExtensionDetails: builder.query({
      query: (id) => ({
        url: `/delivery-time-extension_details/${id}`,
        method: "GET",
      }),
      providesTags: ["delivery"],
    }),
    acceptDeliveryTimeExtension: builder.mutation({
      query: (id) => ({
        url: `/delivery-time-extension/accept/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["delivery"],
    }),
    declineDeliveryTimeExtension: builder.mutation({
      query: (id) => ({
        url: `/delivery-time-extension/decline/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["delivery"],
    }),
    acceptDeliveryRequest: builder.mutation({
      query: (id) => ({
        url: `/accept-delivery-request/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["delivery"],
    }),
    declineDeliveryRequest: builder.mutation({
      query: (id) => ({
        url: `/decline-delivery-request/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["delivery"],
    }),
    orderDetails: builder.query({
      query: (id) => ({
        url: `/order-details/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    orderCancel: builder.mutation({
      query: (id) => ({
        url: `/order-cancel/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["order"],
    }),
    myBookings: builder.query({
      query: ({ page, per_page }) => ({
        url: `/my-bookings?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    bookingsHistory: builder.query({
      query: ({ page, per_page }) => ({
        url: `/bookings-history?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    addDispute: builder.mutation({
      query: (disputes) => {
        return {
          url: `/add-dispute`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: disputes,
        };
      },
      invalidatesTags: ["dispute"],
    }),
  }),
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
