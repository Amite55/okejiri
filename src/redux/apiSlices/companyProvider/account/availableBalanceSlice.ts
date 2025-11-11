import { api } from "@/src/redux/base/baseApi";


export const companyAvailableBalanceSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        recentTransactions: builder.query<any, any>({
            query: (per_page = 10)=>({
                url: `/my-transactions?per_page=10`,
                method: "GET"
            }),
            providesTags:["order"]
        }),
        transferBalance: builder.mutation<any, any>({
            query: (requestBody)=>({
                url: "/transfer-balance",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags: ["balance"]
        }),
        withdrawRequest: builder.mutation<any, any>({
            query: (requestBody)=>({
                url: "/withdraw",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags:["balance"]
        })
    })
})


export const {
    useLazyRecentTransactionsQuery,
    useTransferBalanceMutation,
    useWithdrawRequestMutation
}  = companyAvailableBalanceSlice;