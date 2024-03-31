import { API } from '../base';
import {
  House,
  HouseDetails,
  RoomingHouse,
  RoomingHouseResponse,
} from './interface';

const roomingHouseApi = API.injectEndpoints({
  endpoints: build => ({
    createRoomingHouse: build.mutation<RoomingHouseResponse, Partial<RoomingHouse>>({
      query: data => ({
        url: 'rooming-houses',
        method: 'POST',
        body: data,
      }),
    }),
    getRoomingHouses: build.query<House[], void>({
      query: () => `rooming-houses`,
    }),
    getRoomingHouseDetails: build.query<HouseDetails, string>({
      query: id => `rooming-houses/${id}`
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateRoomingHouseMutation,
  useGetRoomingHousesQuery,
  useGetRoomingHouseDetailsQuery,
} = roomingHouseApi;
