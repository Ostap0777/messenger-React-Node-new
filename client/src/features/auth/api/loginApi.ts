import { baseApi } from "../../../shared/api/baseApi";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useLoginMutation } = loginApi;
