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
  email: string;
  phone: string;
  contactUserId: string;
  customName: string | null;
  createdAt: string;
  contactUser: ContactUser;
}

export interface CreateContactDto {
  email: string;
  phone: string;
  customName?: string;
}
export interface UpdateContactBody {
  customName?: string;
  id?: string;
}
export const contactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // userId лише для ключа кешу RTK — на сервер не відправляється
    getContacts: builder.query<Contact[], string>({
      query: () => ({
        url: "/contacts",
        method: "GET",
      }),
    }),

    createContact: builder.mutation<
      Contact,
      CreateContactDto,
      Partial<Contact>
    >({
      query: (body) => ({
        url: "/contacts",
        method: "POST",
        body,
      }),
    }),
    updateContact: builder.mutation<
      Contact,
      UpdateContactBody,
      Partial<Contact>
    >({
      query: ({ id, customName }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: { customName },
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
} = contactsApi;
