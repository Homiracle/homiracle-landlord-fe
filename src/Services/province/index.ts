import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const provinceApi = createApi({
  reducerPath: 'provinceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://esgoo.net/api-tinhthanh' }),
  endpoints: builder => ({
    getProvinces: builder.query({
      query: () => '/1/0.htm',
      transformResponse: response => {
        const data = (response as { data: any })?.data;
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
      },
    }),
    getDistricts: builder.query({
      query: (id: string) => `/2/${id}.htm`,
      transformResponse: response => {
        const data = (response as { data: any })?.data;
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
      },
    }),
    getWards: builder.query({
      query: (id: string) => `/3/${id}.htm`,
      transformResponse: response => {
        const data = (response as { data: any })?.data;
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
      },
    }),
  }),
});

export const { useGetProvincesQuery, useGetDistrictsQuery, useGetWardsQuery } = provinceApi;
