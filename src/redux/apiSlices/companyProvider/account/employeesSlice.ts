import { api } from "@/src/redux/base/baseApi";

export const companyEmployeesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addEmployee: builder.mutation({
      query: (requestBody) => ({
        url: "/add-employee",
        method: "POST",
        body: requestBody,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["settings"],
    }),
    assignEmployee: builder.mutation({
      query: (requestBody) => ({
        url: "/assign-employee",
        method: "POST",
        body: requestBody,
      }),
      invalidatesTags: ["settings"],
    }),
    editEmployee: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/edit-employee/${id}`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["settings"],
    }),

    employeeDetails: builder.query({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    myEmployee: builder.query({
      query: ({ page, per_page, search }) => {
        return {
          url: `/my-employee?page=${page}&per_page=${per_page}&search=${search}`,
          method: "GET",
        };
      },
      providesTags: ["settings"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => {
        return {
          url: `/delete-employee/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["settings"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddEmployeeMutation,
  useAssignEmployeeMutation,
  useEditEmployeeMutation,
  useEmployeeDetailsQuery,
  useMyEmployeeQuery,
  useLazyMyEmployeeQuery,
  useDeleteEmployeeMutation,
} = companyEmployeesSlice;
