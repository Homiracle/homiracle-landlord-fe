import { API } from '../base';
import { House, HouseDetails, RoomingHouse } from './interface';


const roomingHouseApi = API.injectEndpoints({
  endpoints: build => ({
    createRoomingHouse: build.mutation<RoomingHouse, Partial<RoomingHouse>>({
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
      transformResponse: (respone: any) => {
        return {
          house_id: respone.house_id, 
          house_name: respone.house_name,
          num_of_room: respone.num_of_room,
          num_of_tenant: respone.num_of_tenant,
          floor: { ...respone.floor },
        } as HouseDetails;
      }
    })
  }),
  overrideExisting: true,
});

export const { useCreateRoomingHouseMutation, useLazyGetRoomingHousesQuery, useLazyGetRoomingHouseDetailsQuery } =
  roomingHouseApi;
