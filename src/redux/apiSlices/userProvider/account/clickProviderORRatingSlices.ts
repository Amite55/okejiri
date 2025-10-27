import { api } from "@/src/redux/base/baseApi";

export const clickProviderORRatingSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    clickProvider: builder.mutation({
      query: (provider_id) => ({
        url: `/click`,
        method: "POST",
        body: provider_id,
      }),
    }),
    rating: builder.mutation({
      query: (data) => ({
        url: `/rating`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useClickProviderMutation, useRatingMutation } =
  clickProviderORRatingSlices;
