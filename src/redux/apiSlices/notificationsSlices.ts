import { api } from "../base/baseApi";

export const notificationsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (page) => ({
        url: `/notifications?page=${page}`,
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
    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: `/delete-all-notifications`,
        method: "POST",
      }),
      invalidatesTags: ["notifications"],
    }),
    deleteSingleNotification: builder.mutation({
      query: (id) => ({
        url: `/delete-notification/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotificationsQuery,
  useSingleMarkMutation,
  useAllMarkMutation,
  useDeleteAllNotificationsMutation,
  useDeleteSingleNotificationMutation,
} = notificationsSlices;
