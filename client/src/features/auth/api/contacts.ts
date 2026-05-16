import { baseApi } from "../../../shared/api/baseApi";

export interface ContactUser {
  id: string;
  name: string;
  email: string | null;
  userTag: string | null;
  avatar: string | null;
}

export interface Contact {
  id: string;
  ownerId: string;
  contactUserId: string;
  customName: string | null;
  createdAt: string;
  contactUser: ContactUser;
}
export const constactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => ({
        url: "/contacts",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetContactsQuery } = constactsApi;
