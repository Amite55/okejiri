import { api } from "@/src/redux/base/baseApi";

export const clickProviderORRatingSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    clickProvider: builder.mutation({
      query: (id) => ({
        url: `/click/${id}`,
        method: "GET",
      }),
      invalidatesTags: [
        "services",
        "boost",
        "profile",
        "servicePackages",
        "user",
        "transfer_balance",
      ],
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
