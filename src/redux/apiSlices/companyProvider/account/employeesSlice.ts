import { api } from "@/src/redux/base/baseApi";

export const companyEmployeesSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        addEmployee: builder.mutation({
            query: (requestBody)=>({
                url: "/add-employee",
                method: "POST",
                body: requestBody
            }),
            invalidatesTags:["settings"]
        }),
        assignEmployee: builder.mutation({
            query: (requestBody)=>({
                url: "/assign-Employee",
                method: "POST",
                body: requestBody,
            }),
            invalidatesTags: ["settings"]
        }),
        editEmployee: builder.mutation({
            query: ({id, requestBody})=>({
                url: `/edit-employee/${id}`,
                method: "POST",
                body: requestBody,
            }),
            invalidatesTags: ["settings"]
        }),

        employeeDetails: builder.query({
            query: (id)=>({
                url: `/employee/${id}`,
                method: "GET"
            }),
            providesTags: ["settings"]
        }),
        myEmployee: builder.query({
            query: (per_page = 10)=>({
                url: `/my-employee?per_page=${per_page}`,
                method: "GET"
            }),
            providesTags: ["settings"]
        })
    })
})

export const {
    useAddEmployeeMutation,
    useAssignEmployeeMutation,
    useEditEmployeeMutation,
    useEmployeeDetailsQuery,
    useMyEmployeeQuery,
} = companyEmployeesSlice;