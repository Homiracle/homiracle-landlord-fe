import { API } from '../base';
import {
  House,
  HouseDetails,
  RoomingHouse,
  RoomingHouseResponse,
} from './interface';

const roomingHouseApi = API.injectEndpoints({
  endpoints: build => ({
    createRoomingHouse: build.mutation<
      RoomingHouseResponse,
      Partial<RoomingHouse>
    >({
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
      query: id => 'rooming-houses/${id}',
      transformResponse: (response: any) => {
        return {
          house_id: response.house_id,
          house_name: response.house_name,
          num_of_room: response.num_of_room,
          num_of_tenant: response.num_of_tenant,
        } as HouseDetails;
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateRoomingHouseMutation,
  useGetRoomingHousesQuery,
  useLazyGetRoomingHouseDetailsQuery,
} = roomingHouseApi;
