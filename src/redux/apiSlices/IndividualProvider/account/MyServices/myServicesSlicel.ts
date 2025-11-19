import { api } from "../../../../base/baseApi";

export const myServicesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    my_services: builder.query({
      query: (page) => ({
        url: `my-services?page=${page}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),

    //................pakages all slice ...............//

    my_service_packages: builder.query({
      query: ({ page, service_id }) => ({
        url: `/my-service-package?page=${page}&service_id=${service_id}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    my_service_package_details: builder.query({
      query: (id) => ({
        url: `my-service-package/${id}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    my_service_package_post: builder.mutation({
      query: (data) => ({
        url: "/my-service-package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    edit_my_service_package: builder.mutation({
      query: ({ id, data }) => ({
        url: `/my-service-package/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),

    add_service_package_detail_items: builder.mutation({
      query: ({ id, data }) => ({
        url: `/add-service-package-detail-item`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    delete_service_package_detail: builder.mutation({
      query: (id) => ({
        url: `/delete-service-package-detail-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
    add_service_available_time: builder.mutation({
      query: (data) => ({
        url: `/add-service-available-time`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    update_service_available_time: builder.mutation({
      query: ({ data, id }) => ({
        url: `/update-service-available-time/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useMy_servicesQuery,
  useLazyMy_servicesQuery,
  useMy_service_packagesQuery,
  useLazyMy_service_packagesQuery,
  useMy_service_package_detailsQuery,
  useMy_service_package_postMutation,
  useUpdate_service_available_timeMutation,
  useAdd_service_available_timeMutation,
  useDelete_service_package_detailMutation,
  useAdd_service_package_detail_itemsMutation,
} = myServicesSlice;
