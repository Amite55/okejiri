import { api } from "../../base/baseApi";

export const bookingsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    reportProvider: builder.mutation({
      query: (reports) => ({
        url: "/report-provider",
        method: "POST",
        body: reports,
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
      query: (bookings) => ({
        url: "/booking",
        method: "POST",
        body: bookings,
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
      query: (page = 10) => ({
        url: `/my-bookings?per_page=${page}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    bookingsHistory: builder.query({
      query: (page = 10) => ({
        url: `/bookings-history?per_page=${page}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    addDisputeAppeal: builder.mutation({
      query: (disputes) => ({
        url: `/add-dispute-appeal`,
        method: "POST",
        body: disputes,
      }),
      invalidatesTags: ["dispute"],
    }),
    addDispute: builder.mutation({
      query: (disputes) => {
        return {
          url: `/add-dispute`,
          method: "POST",
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
  useAddDisputeAppealMutation,
  useAddDisputeMutation,
} = bookingsSlice;
