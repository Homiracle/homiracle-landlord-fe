import { API } from '../base';
import {
    CreateDevice,
    CreateDeviceResponse
} from './type';

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
  }),
  overrideExisting: true,
});

export const {
  useCreateDeviceMutation,
} = deviceApi;
