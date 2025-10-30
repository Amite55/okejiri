import { api } from "@/src/redux/base/baseApi";

export const favoritesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: (page = 10) => ({
        url: `/favorites?per_page=${page}`,
        method: "GET",
      }),
      providesTags: ["favorite"],
    }),
    addFavorite: builder.mutation({
      query: (package_id) => ({
        url: `/favorites`,
        method: "POST",
        body: package_id,
      }),
      invalidatesTags: ["favorite"],
    }),
    deleteFavorite: builder.mutation({
      query: (id) => ({
        url: `/remove-favorite/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["favorite"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoritesSlices;
