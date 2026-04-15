import { api } from "../base/baseApi";

export const flutterWaveSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => ({
        url: `/flutterwave/get-banks`,
        method: "GET",
      }),
      providesTags: [
        "payment",
        "profile",
        "boost",
        "provider",
        "balance",
        "transfer_balance",
      ],
    }),
    createSubAccount: builder.mutation({
      query: (subAccountInfo) => {
        return {
          url: `/flutterwave/create-sub-account`,
          method: "POST",
          body: subAccountInfo,
        };
      },
      invalidatesTags: ["payment", "profile", "boost", "provider"],
    }),
    verifyPayment: builder.mutation({
      query: (info) => ({
        url: `/flutterwave/verify-payment`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["payment", "profile", "boost", "provider"],
    }),
  }),
});

export const { useGetBanksQuery, useCreateSubAccountMutation } =
  flutterWaveSlice;
