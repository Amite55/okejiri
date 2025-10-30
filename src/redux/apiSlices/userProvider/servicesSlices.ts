import { api } from "../../base/baseApi";

export const servicesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    packagesByServiceId: builder.query({
      query: (id) => ({
        url: `/get-packages/${id}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    packageDetails: builder.query({
      query: (id) => ({
        url: `/get-package-detail/${id}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    providerPortfolio: builder.query({
      query: (id, page = 10) => ({
        url: `get-provider-portfolio/${id}?per_page=${page}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),
    providerProfile: builder.query({
      query: (id) => ({
        url: `/get-provider-profile/${id}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),
    getProviderReviews: builder.query({
      query: (id) => ({
        url: `/get-provider-review/${id}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),
    getProviderServices: builder.query({
      query: (id) => ({
        url: `/get-provider-services/${id}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),
  }),
});

export const {
  usePackagesByServiceIdQuery,
  usePackageDetailsQuery,
  useProviderPortfolioQuery,
  useProviderProfileQuery,
  useGetProviderReviewsQuery,
  useGetProviderServicesQuery,
} = servicesSlice;
