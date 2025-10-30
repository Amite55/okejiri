import { api } from "../../base/baseApi";

export const cartSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getCartItem: builder.query({
      query: () => ({
        url: "/get-cart-items",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    storeDeleteCartItem: builder.mutation({
      query: (package_id) => ({
        url: `/store-delete-cart-item`,
        method: "POST",
        body: package_id,
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: () => ({
        url: `/delete-cart-items`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartItemQuery,
  useStoreDeleteCartItemMutation,
  useDeleteCartItemMutation,
} = cartSlices;
