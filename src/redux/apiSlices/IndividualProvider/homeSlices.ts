import { api } from "../../base/baseApi";

export const IndividualProvider = api.injectEndpoints({
  endpoints: (builder) => ({
    homeProvider: builder.query({
      query: (filter = "this_week") => ({
        url: `home-data?filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    recentTransactions: builder.query({
      query: () => ({
        url: `my-transactions`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    recentOrder: builder.query({
      query: () => ({
        url: `get-provider-orders`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
  overrideExisting: true,
});

export const { useRecentTransactionsQuery, useRecentOrderQuery } =
  IndividualProvider;
