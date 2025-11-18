import { api } from "../base/baseApi";

export const stripeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createConnectAccount: builder.mutation({
      query: (data) => ({
        url: "/stripe/connected/account-create",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/stripe/payment/payment-intent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    getAvailableBalance: builder.query({
      query: (id: string) => ({
        url: `/stripe/connected/balance?account_id=${id}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
  }),
});

export const {
  useCreateConnectAccountMutation,
  useCreatePaymentIntentMutation,
  useGetAvailableBalanceQuery,
} = stripeSlice;
