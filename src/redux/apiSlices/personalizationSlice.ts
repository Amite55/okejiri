import { api } from "../base/baseApi";

const personalizationSlice = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      completePersonalization: builder.mutation({
        query: (information) => ({
          url: "/auth/complete-personalizations/2",
          method: "PUT",
          body: information,
        }),
        invalidatesTags: ["user"],
      }),
      completeKYC: builder.mutation({
        query: (information) => {
          console.log(information, "this api end point ");
          return {
            url: "/complete-kyc",
            method: "POST",
            body: information,
            "Content-Type": "multipart/form-data",
          };
        },
        invalidatesTags: ["user"],
      }),
      requestAddService: builder.mutation({
        query: (information) => ({
          url: "/request-add-service",
          method: "POST",
          body: information,
        }),
        invalidatesTags: ["user"],
      }),
      getServices: builder.query({
        query: () => ({
          url: "/services",
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useCompletePersonalizationMutation,
  useCompleteKYCMutation,
  useRequestAddServiceMutation,
  useGetServicesQuery,
} = personalizationSlice;
