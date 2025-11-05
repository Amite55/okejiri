import { api } from "@/src/redux/base/baseApi";

export const bookingHistory = api.injectEndpoints({
  endpoints: (builder) => ({
    bookingHistory: builder.query({
      query: (page) => ({
        url: `/bookings-history?page=${page}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const { useLazyBookingHistoryQuery } = bookingHistory;
