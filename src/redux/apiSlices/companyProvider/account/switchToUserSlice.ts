import { api } from "@/src/redux/base/baseApi";


export const companySwitchToUserSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        switchRole: builder.mutation<any, any>({
            query: ()=>({
                url: "/switch-role",
                method: "POST"
            }),
            invalidatesTags:["settings"]
        })
    })
})

export const {
    useSwitchRoleMutation
} = companySwitchToUserSlice;