import { api } from "../../../base/baseApi";

export const manageDiscountsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    manage_discountse: builder.mutation({
      query: (data) => ({
        url: `/manage-discounts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["editService"],
    }),
  }),
  overrideExisting: true,
});

export const { useManage_discountseMutation } = manageDiscountsSlice;
