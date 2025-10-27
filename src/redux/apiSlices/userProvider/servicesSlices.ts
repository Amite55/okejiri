import { api } from "../../base/baseApi";

export const servicesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["services"],
    }),
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
    providerReviews: builder.query({
      query: (id) => ({
        url: `/get-provider-review/${id}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),
    providerServices: builder.query({
      query: (id) => ({
        url: `/get-provider-services/${id}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  usePackagesByServiceIdQuery,
  usePackageDetailsQuery,
  useProviderPortfolioQuery,
  useProviderProfileQuery,
  useProviderReviewsQuery,
  useProviderServicesQuery,
} = servicesSlice;
