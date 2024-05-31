import { RoomDetail } from '../../Services/rooms/type';
import { FloorDetail } from '../../Services/floors/type';
import { HouseDetails } from '../../Services/rooming-houses/interface';
import { createSlice, createSelector } from '@reduxjs/toolkit';

export interface roomingHouseState {
  house_id: string;
  floor_id?: string;
  room_id?: string;
  house: HouseDetails;
  floor: FloorDetail;
  room: RoomDetail;
}

const slice = createSlice({
  name: 'roomingHouse',
  initialState: {} as roomingHouseState,
  reducers: {
    storeId : (
      state: roomingHouseState,
      { payload: { field, id } }: { payload: { field: string; id: string } },
    ) => {
      return {
        ...state,
        [field]: id,
      };
    },
    storeHouse: (
      state: roomingHouseState,
      { payload: { house } }: { payload: { house: HouseDetails } },
    ) => {
      return {
        ...state,
        house: house,
      };
    },
    storeFloor: (
      state: roomingHouseState,
      { payload: { floor } }: { payload: { floor: FloorDetail } },
    ) => {
      return {
        ...state,
        floor: floor,
      };
    },
    storeRoom: (
      state: roomingHouseState,
      { payload: { room } }: { payload: { room: RoomDetail } },
    ) => {
      return {
        ...state,
        room: room,
      };
    },
    reset: (
      state: roomingHouseState,
      { payload: { field } }: { payload: { field: string } },
    ) => {
      return {
        ...state,
        [field]: {},
      };
    },
    resetId: (
      state: roomingHouseState,
      { payload: { field } }: { payload: { field: string } },
    ) => {
      return {
        ...state,
        [field]: '',
      };
    },
  },
});

export const getHouseId = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse['house_id'],
);

export const getFloorId = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse['floor_id'],
);

export const getRoomId = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse['room_id'],
);

export const getHouse = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse.house,
);

export const getFloor = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse.floor,
);

export const getRoom = createSelector(
  (state: { roomingHouse: roomingHouseState }) => state['roomingHouse'],
  (roomingHouse: roomingHouseState) => roomingHouse.room,
);

export const { storeHouse, storeFloor, storeRoom, reset, storeId, resetId } = slice.actions;
export const roomingHouseReducers = slice.reducer;
