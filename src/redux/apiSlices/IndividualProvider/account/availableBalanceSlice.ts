import { api } from "../../../base/baseApi";

export const availableBalanceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    recent_transactions: builder.query({
      query: (page = 10) => ({
        url: `/my-transactions?page=${page}`,
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),
    transfer_balance: builder.mutation({
      query: (data) => ({
        url: "/transfer-balance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["balance"],
    }),
    withdraw: builder.mutation({
      query: (data) => ({
        url: "/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["withdraw"],
    }),
  }),
  overrideExisting: true,
});

export const { useRecent_transactionsQuery, useTransfer_balanceMutation } =
  availableBalanceSlice;
