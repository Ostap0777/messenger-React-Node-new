import { baseApi } from "../../../shared/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useAuthMutation } = authApi;
