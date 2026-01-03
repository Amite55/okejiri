import { api } from "../base/baseApi";

export const flutterWaveSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => ({
        url: `/flutterwave/get-banks`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
    createSubAccount: builder.mutation({
      query: (subAccountInfo) => {
        return {
          url: `/flutterwave/create-sub-account`,
          method: "POST",
          body: subAccountInfo,
        };
      },
      invalidatesTags: ["payment"],
    }),
    verifyPayment: builder.mutation({
      query: (info) => ({
        url: `/flutterwave/verify-payment`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useGetBanksQuery, useCreateSubAccountMutation } =
  flutterWaveSlice;
