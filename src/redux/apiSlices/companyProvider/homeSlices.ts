import { api } from "../../base/baseApi";

export const companyProviderHomeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    homeData: builder.query({
      query: (filter = "this_week") => ({
        url: `/home-data?filter=${filter}`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "notifications",
        "order_approve",
        "order_reject",
        "payment",
        "withdraw",
        "balance",
      ],
    }),
    recentTransactions: builder.query({
      query: (per_page = 10) => ({
        url: `/my-transactions?per_page=10`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "notifications",
        "order_approve",
        "order_reject",
        "payment",
        "balance",
        "withdraw",
      ],
    }),
    recentOrder: builder.query({
      query: (status) => ({
        url: status
          ? `/get-provider-orders?status=${status}`
          : `get-provider-orders`,
        method: "GET",
      }),
      providesTags: [
        "order",
        "booking",
        "notifications",
        "order_approve",
        "order_reject",
        "payment",
        "balance",
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useHomeDataQuery,
  useRecentTransactionsQuery,
  useRecentOrderQuery,
} = companyProviderHomeSlice;
