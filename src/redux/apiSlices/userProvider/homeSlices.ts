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
      query: ({ per_page, page, radius }) => ({
        url: `/services-nearby?per_page=${per_page}&page=${page}&radius=${radius}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
  }),
});

export const {
  usePromotionsQuery,
  useServicesQuery,
  useLazyServiceNearbyQuery,
  useServiceNearbyQuery,
} = userProviderHomeSlice;
