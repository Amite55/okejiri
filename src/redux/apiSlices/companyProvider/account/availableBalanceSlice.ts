import { api } from "@/src/redux/base/baseApi";

export const companyAvailableBalanceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    recentTransactions: builder.query<any, any>({
      query: (per_page = 10) => ({
        url: `/my-transactions?per_page=10`,
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
    transferBalance: builder.mutation<any, any>({
      query: (requestBody) => ({
        url: "/transfer-balance",
        method: "POST",
        body: requestBody,
      }),
      invalidatesTags: [
        "balance",
        "order",
        "withdraw",
        "booking",
        "notifications",
        "order_approve",
        "order_reject",
        "payment",
      ],
    }),
    withdrawRequest: builder.mutation<any, any>({
      query: (requestBody) => ({
        url: "/withdraw",
        method: "POST",
        body: requestBody,
      }),
      invalidatesTags: [
        "balance",
        "withdraw",
        "order",
        "booking",
        "notifications",
        "payment",
      ],
    }),
  }),
});

export const {
  useLazyRecentTransactionsQuery,
  useTransferBalanceMutation,
  useWithdrawRequestMutation,
} = companyAvailableBalanceSlice;
