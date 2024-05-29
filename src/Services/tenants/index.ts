import { API } from '../base';

// export interface Address {
//   province: string;
//   district: string;
//   commune: string;
//   street: string;
// }

export interface Tenant {
  email: string;
  user_name: string;
  user_id: string;
  phone: string;
  CID: string;
  date_of_birth: string;
  isMale: boolean;
  role: 'tenant';
}

const tenantApi = API.injectEndpoints({
  endpoints: build => ({
    // getUser: build.query<User, string>({
    //   query: id => `users/${id}`,
    // }),
    searchTenant: build.query<
      Tenant,
      { phone?: string; email?: string; CID?: string }
    >({
      query: ({ phone, email, CID }) => {
        if (phone) return `tenants/search?query=${phone}`;
        if (email) return `tenants/search?query=${email}`;
        if (CID) return `tenants/search?query=${CID}`;
        return 'tenants/search';
      }
    }),
  }),
  overrideExisting: true,
});

export const {  useLazySearchTenantQuery } = tenantApi;
