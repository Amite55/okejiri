import { api } from "../base/baseApi";

const personalizationSlice = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      completePersonalization: builder.mutation({
        query: (information) => {
          return {
            url: `/auth/complete-personalizations/${information.id}`,
            method: "PUT",
            body: information,
          };
        },
        invalidatesTags: ["user"],
      }),
      completeKYC: builder.mutation({
        query: (formData) => {
          return {
            url: "/complete-kyc",
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
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
    };
  },
});

export const {
  useCompletePersonalizationMutation,
  useCompleteKYCMutation,
  useRequestAddServiceMutation,
} = personalizationSlice;
