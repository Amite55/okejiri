import { api } from "../base/baseApi";

export const messagingSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (messageInfo) => ({
        url: "/send-message",
        method: "POST",
        body: messageInfo,
      }),
      invalidatesTags: ["message"],
    }),
    editMessage: builder.mutation({
      query: (message) => ({
        url: `/edit-message/${message.id}`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["message"],
    }),
    getMessages: builder.query({
      query: ({ receiver_id, per_page, page }) => ({
        url: `/get-message?per_page=${per_page}&receiver_id=${receiver_id}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    markAsRead: builder.mutation({
      query: (receiver_id) => ({
        url: `/mark-as-read`,
        method: "POST",
        body: receiver_id,
      }),
      invalidatesTags: ["message"],
    }),
    unSendForMe: builder.mutation({
      query: (id) => ({
        url: `/unsend-for-me/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
    unSendEveryone: builder.mutation({
      query: (id) => ({
        url: `/unsend-for-everyone/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
    searchNewUser: builder.query({
      query: ({ role, search, page, per_page }) => ({
        url: `/search-new-user?per_page=${per_page}&search=${search}&role=${role}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["search"],
    }),
    getChartList: builder.query({
      query: ({ search, per_page, page }) => ({
        url: `/chat-list?per_page=${per_page}&search=${search}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useMarkAsReadMutation,
  useUnSendForMeMutation,
  useUnSendEveryoneMutation,
  useSearchNewUserQuery,
  useEditMessageMutation,
  useGetChartListQuery,
  useLazyGetChartListQuery,
} = messagingSlices;
