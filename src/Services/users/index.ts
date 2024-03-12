import { API } from '../base';

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface User {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface userSignin {
  email: string;
  password: string;
} 

const userApi = API.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<User, string>({
      query: id => `users/${id}`,
    }),
    signin: build.mutation<userSignin, Partial<userSignin>>({
      query: credentials => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSigninMutation, useLazyGetUserQuery } = userApi;
