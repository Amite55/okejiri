import { api } from "../base/baseApi";

export const messagingSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "/send-message",
        method: "POST",
        body: message,
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
      query: (id, page = 10) => ({
        url: `/get-message?per_page=${page}&receiver_id=${id}`,
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
      query: ({ userRole, search, page }) => ({
        url: `/chat-list?per_page=${page}&search=${search}&role=${userRole}`,
        method: "GET",
      }),
      providesTags: ["search"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useMarkAsReadMutation,
  useUnSendForMeMutation,
  useUnSendEveryoneMutation,
  useSearchNewUserQuery,
  useEditMessageMutation,
} = messagingSlices;
