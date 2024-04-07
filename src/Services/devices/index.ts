import { API } from '../base';
import {
    CreateDevice,
    CreateDeviceResponse
} from './type';

const deviceApi = API.injectEndpoints({
  endpoints: build => ({
    createDevice: build.mutation<CreateDevice, Partial<CreateDeviceResponse>>({
      query: data => ({
        url: 'devices',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['RoomingHouse'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateDeviceMutation,
} = deviceApi;
