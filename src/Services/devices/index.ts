import { API } from '../base';
import { CreateDevice, CreateDeviceResponse, Device, ListDevice } from './type';

const deviceApi = API.injectEndpoints({
  endpoints: build => ({
    createDevice: build.mutation<CreateDevice, Partial<CreateDeviceResponse>>({
      query: data => ({
        url: 'iot-devices',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Device'],
    }),
    getDevices: build.query<
      ListDevice,
      { accessable_scope: string; accessable_scope_id: string }
    >({
      query: ({ accessable_scope, accessable_scope_id }) => ({
        url: `iot-devices?accessable_scope=${accessable_scope}&accessable_scope_id=${accessable_scope_id}`,
        method: 'GET',
      }),
      providesTags: ['Device'],
    }),
    getDevice: build.query<Device, string>({
      query: device_id => {
        return {
          url: `iot-devices/${device_id}`,
          method: 'GET',
        };
      },
    }),
    connectDevice: build.mutation<void, string>({
      query: id => ({
        url: `iot-devices/${id}/connect`,
        method: 'PUT',
      }),
      invalidatesTags: ['Device'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateDeviceMutation,
  useGetDevicesQuery,
  useGetDeviceQuery,
  useConnectDeviceMutation,
} = deviceApi;
