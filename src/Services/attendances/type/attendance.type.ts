export type Attendance = {
  attendance_id: string;
  attendance_date: string;
  status: 'inviting' | 'denied' | 'accepted' | 'expired';
  tenant: {
    user_id: string;
    user_name: string;
    phone: string;
    role: 'Trưởng phòng' | 'Thành viên';
  };
  room: {
    room_id: string;
    name: string;
  };
};