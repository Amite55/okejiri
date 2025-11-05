import { api } from "@/src/redux/base/baseApi";

export const favoritesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: (page) => ({
        url: `/favorites?page=${page}`,
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
      query: (packageId: number) => {
        console.log(packageId, "packageId end point--------> api");
        return {
          url: `/favorites/${packageId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["favorite"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoritesSlices;
