import { api } from "../../base/baseApi";

export const userProviderHomeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    promotions: builder.query({
      query: () => ({
        url: "/promotions",
        method: "GET",
      }),
      providesTags: ["promotions"],
    }),
    services: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    serviceNearby: builder.query({
      query: () => ({
        url: "/services-nearby?per_page=10&radius=500",
        method: "GET",
      }),
      providesTags: ["services"],
    }),
  }),
});

export const { usePromotionsQuery, useServicesQuery, useServiceNearbyQuery } =
  userProviderHomeSlice;
