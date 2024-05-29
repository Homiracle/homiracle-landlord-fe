import { invalid } from 'moment';
import { API } from '../base';
import { Attendance } from './type';

const attendanceApi = API.injectEndpoints({
  endpoints: build => ({
    addTenant: build.mutation<void, { contract_id: string; tenant_id: string }>(
      {
        query: data => ({
          url: 'attendances',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Attendance', 'Contract', 'Room', 'Floor', 'RoomingHouse'],
      },
    ),
    getListTenant: build.query<
      Attendance[],
      { house_id: string; floor_id?: string; room_id?: string }
    >({
      query: ({ house_id, floor_id, room_id }) => {
        const hasFloor =
          floor_id !== undefined && floor_id !== null && floor_id !== '';
        const hasRoom =
          room_id !== undefined && room_id !== null && room_id !== '';
        if (hasFloor && hasRoom) {
          return `attendances/landlord?house_id=${house_id}&floor_id=${floor_id}&room_id=${room_id}`;
        }
        if (hasFloor) {
          return `attendances/landlord?house_id=${house_id}&floor_id=${floor_id}`;
        }
        return `attendances/landlord?house_id=${house_id}`;
      },
      transformResponse: (data: any) => {
        return data.map((item: any) => ({
          attendance_id: item.attendance_id,
          attendance_date: item.attendance_date,
          status: item.status,
          tenant: {
            user_id: item.tenant.user_id,
            user_name: item.tenant.user_name,
            phone: item.tenant.phone,
            role: item.tenant.user_id === item.contract.tenant.user_id ? 'Trưởng phòng' : 'Thành viên',
          },
          room: {
            // room_id: item.room.room_id,
            name: item.contract.room.name,
          },
        }));
      },
      providesTags: ['Attendance'],
    }),
  }),
  overrideExisting: true,
});

export const { useAddTenantMutation, useLazyGetListTenantQuery } = attendanceApi;
