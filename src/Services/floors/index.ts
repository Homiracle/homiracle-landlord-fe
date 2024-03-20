import { API } from '../base';

export type Floor = {
  name: string;
  rooming_house: {
    rooming_house_id: string;
  };
  reference_cost: {
    deposit?: number;
    room_cost?: number;
    water_cost?: number;
    power_cost?: number;
    cost_per_person?: number;
    cost_per_room?: number;
  };
  [key: string]: any;
};

export type FloorResponse = Partial<Floor> & {
  rooming_house_id: string;
};

const FloorApi = API.injectEndpoints({
  endpoints: build => ({
    createFloor: build.mutation<
      FloorResponse,
      Partial<Floor>
    >({
      query: data => ({
        url: 'floors',
        method: 'POST',
        body: data,
      }),
    }),
    getFloors: build.query<Floor[], void>({
      query: id => `rooming-houses/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useCreateFloorMutation, useGetFloorsQuery } =
  FloorApi;
