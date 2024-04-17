import { API } from '../base';

export interface Address {
  province: string;
  district: string;
  commune: string;
  street: string;
}

export interface User {
  email: string;
  user_name: string;
  user_id: string;
  phone: string;
  CID: string;
  date_of_birth: string;
  isMale: boolean;
  role: 'landlord' | 'tenant';
}

const userApi = API.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<User, string>({
      query: id => `users/${id}`,
    }),
    searchUser: build.query<
      User,
      { phone?: string; email?: string; CID?: string }
    >({
      query: ({ phone, email, CID }) => {
        if (phone) return `users/search?query=${phone}`;
        if (email) return `users/search?query=${email}`;
        if (CID) return `users/search?query=${CID}`;
        return 'users/search';
      }
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetUserQuery, useLazySearchUserQuery } = userApi;
