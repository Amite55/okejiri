import { api } from "@/src/redux/base/baseApi";

export const availableBalanceSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    recentTransactions: builder.query({
      query: (page) => ({
        url: `/my-transactions?per_page=${page}`,
        method: "GET",
      }),
      providesTags: ["balance"],
    }),
    depositSuccess: builder.mutation({
      query: (deposit_amount) => ({
        url: "/deposit-success",
        method: "POST",
        body: deposit_amount,
      }),
      invalidatesTags: ["balance"],
    }),
    transferBalance: builder.mutation({
      query: (amount) => ({
        url: "/transfer-balance",
        method: "POST",
        body: amount,
      }),
      invalidatesTags: ["balance"],
    }),
  }),
});

export const {
  useRecentTransactionsQuery,
  useDepositSuccessMutation,
  useTransferBalanceMutation,
} = availableBalanceSlices;
