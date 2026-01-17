import { api } from "../../../base/baseApi";

export const portfolioSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    homeProvider: builder.query({
      query: (filter = "this_week") => ({
        url: `home-data?filter=${filter}`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "order_approve",
        "order_reject",
        "payment",
        "notifications",
      ],
    }),
    recentTransactions: builder.query({
      query: () => ({
        url: `my-transactions`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "order_approve",
        "order_reject",
        "notifications",
        "payment",
        "balance",
        "withdraw",
      ],
    }),
    recentOrder: builder.query({
      query: () => ({
        url: `get-provider-orders`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "order_approve",
        "order_reject",
        "notifications",
        "payment",
        "balance",
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useRecentTransactionsQuery, useRecentOrderQuery } =
  portfolioSlice;
