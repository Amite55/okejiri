import { api } from "../base/baseApi";

const authSlices = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (credentials) => ({
          url: "/auth/register",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["register"],
      }),
      login: builder.mutation({
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["login"],
      }),
      socialLogin: builder.mutation({
        query: (credentials) => ({
          url: "/auth/social-login",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["login"],
      }),
      verifyOtp: builder.mutation({
        query: (credentials) => ({
          url: "/auth/otp-verification",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["login"],
      }),
      forgotPassword: builder.mutation({
        query: (credentials) => ({
          url: "/auth/forgot-password",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["login"],
      }),
      resetPassword: builder.mutation({
        query: (credentials) => ({
          url: "/auth/reset-password",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["login"],
      }),
      profile: builder.query({
        query: () => ({
          url: "/profile",
          method: "GET",
        }),
        providesTags: ["profile"],
      }),
      editProfile: builder.mutation({
        query: (credentials) => ({
          url: "/edit-profile",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: credentials,
        }),
        invalidatesTags: ["profile"],
      }),
      editProfilePicture: builder.mutation({
        query: (credentials) => ({
          url: "/edit-profile-picture",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: credentials,
        }),
        invalidatesTags: ["profile"],
      }),
      changePassword: builder.mutation({
        query: (credentials) => ({
          url: "/change-password",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["profile"],
      }),
      deleteProfile: builder.mutation({
        query: () => ({
          url: "/delete-profile",
          method: "DELETE",
        }),
        invalidatesTags: ["profile"],
      }),
      checkToken: builder.mutation({
        query: () => ({
          url: "/auth/check-token",
          method: "POST",
        }),
        invalidatesTags: ["profile"],
      }),
      logout: builder.mutation({
        query: () => ({
          url: "/logout",
          method: "POST",
        }),
        invalidatesTags: ["profile"],
      }),
    };
  },
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useSocialLoginMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useProfileQuery,
  useEditProfileMutation,
  useEditProfilePictureMutation,
  useChangePasswordMutation,
  useDeleteProfileMutation,
  useCheckTokenMutation,
  useLogoutMutation,
} = authSlices;
