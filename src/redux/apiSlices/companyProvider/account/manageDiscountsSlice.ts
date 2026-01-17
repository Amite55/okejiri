import { api } from "@/src/redux/base/baseApi";

export const companyManageDiscountsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    manageDiscounts: builder.mutation({
      query: (requestBody) => ({
        url: "/manage-discounts",
        method: "POST",
        body: requestBody,
      }),
      invalidatesTags: ["payment", "order", "withdraw"],
    }),
  }),
});

export const { useManageDiscountsMutation } = companyManageDiscountsSlice;
