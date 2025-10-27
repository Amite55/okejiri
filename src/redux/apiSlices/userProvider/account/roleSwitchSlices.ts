import { api } from "@/src/redux/base/baseApi";

export const roleSwitchSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    roleSwitch: builder.mutation({
      query: () => ({
        url: "/switch-role",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useRoleSwitchMutation } = roleSwitchSlices;
