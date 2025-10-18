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
      }),
      login: builder.mutation({
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),
      }),
      socialLogin: builder.mutation({
        query: (credentials) => ({
          url: "/auth/social-login",
          method: "POST",
          body: credentials,
        }),
      }),
      verifyOtp: builder.mutation({
        query: (credentials) => ({
          url: "/auth/otp-verification",
          method: "POST",
          body: credentials,
        }),
      }),
      forgotPassword: builder.mutation({
        query: (credentials) => ({
          url: "/auth/forgot-password",
          method: "POST",
          body: credentials,
        }),
      }),
      resetPassword: builder.mutation({
        query: (credentials) => ({
          url: "/auth/reset-password",
          method: "POST",
          body: credentials,
        }),
      }),
      profile: builder.query({
        query: () => ({
          url: "/profile",
          method: "GET",
        }),
      }),
      editProfile: builder.mutation({
        query: (credentials) => ({
          url: "/edit-profile",
          method: "POST",
          body: credentials,
        }),
      }),
      editProfilePicture: builder.mutation({
        query: (credentials) => ({
          url: "/edit-profile-picture",
          method: "POST",
          body: credentials,
        }),
      }),
      changePassword: builder.mutation({
        query: (credentials) => ({
          url: "/change-password",
          method: "POST",
          body: credentials,
        }),
      }),
      deleteProfile: builder.mutation({
        query: () => ({
          url: "/delete-profile",
          method: "DELETE",
        }),
      }),
      checkToken: builder.mutation({
        query: () => ({
          url: "/auth/check-token",
          method: "POST",
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: "/logout",
          method: "POST",
        }),
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
