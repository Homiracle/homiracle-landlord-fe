import { API } from '../base';

const attendanceApi = API.injectEndpoints({
  endpoints: build => ({
    addTenant : build.mutation<void, { contract_id: string, tenant_id: string }>({
      query: data => ({
        url: 'attendances',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useAddTenantMutation } = attendanceApi;