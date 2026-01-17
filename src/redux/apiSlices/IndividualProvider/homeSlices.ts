import { api } from "../../base/baseApi";

export const IndividualProvider = api.injectEndpoints({
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
      ],
    }),
    recentTransactions: builder.query({
      query: () => ({
        url: `my-transactions`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "withdraw",
        "balance",
        "booking",
        "notifications",
        "order_approve",
        "order_reject",
        "payment",
      ],
    }),
    recentOrder: builder.query({
      query: () => ({
        url: `get-provider-orders`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "withdraw",
        "balance",
        "booking",
        "notifications",
        "order_approve",
        "order_reject",
        "payment",
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRecentTransactionsQuery,
  useRecentOrderQuery,
  useHomeProviderQuery,
} = IndividualProvider;
