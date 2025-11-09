import { api } from "../base/baseApi";

export const notificationsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (page = 10) => ({
        url: `/notifications?per_page=${page}`,
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),
    singleMark: builder.mutation({
      query: (id) => ({
        url: `/mark-notification/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["notifications"],
    }),
    allMark: builder.mutation({
      query: () => ({
        url: `/mark-all-notification`,
        method: "POST",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSingleMarkMutation,
  useAllMarkMutation,
} = notificationsSlices;
