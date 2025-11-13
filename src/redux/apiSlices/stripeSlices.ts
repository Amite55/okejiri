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
      query: () => ({
        url: `/stripe/connected/balance?account_id=acct_1SPMLf3z6X4klhUr`,
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
