import { api } from "@/src/redux/base/baseApi";

export const serviceNearBySlices = api.injectEndpoints({
  endpoints: (builder) => ({
    servicesNearBy: builder.query({
      query: (radius = 2, page = 10) => ({
        url: `/services-nearby?per_page=${page}&radius=${radius}`,
        method: "POST",
      }),
      providesTags: ["services"],
    }),
  }),
});

export const { useServicesNearByQuery } = serviceNearBySlices;
