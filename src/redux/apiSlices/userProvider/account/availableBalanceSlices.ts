import { api } from "@/src/redux/base/baseApi";

export const availableBalanceSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentTransactions: builder.query({
      query: ({ page, per_page }) => ({
        url: `/my-transactions?per_page=${per_page}&page=${page}`,
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
  useGetRecentTransactionsQuery,
  useLazyGetRecentTransactionsQuery,
  useDepositSuccessMutation,
  useTransferBalanceMutation,
} = availableBalanceSlices;
