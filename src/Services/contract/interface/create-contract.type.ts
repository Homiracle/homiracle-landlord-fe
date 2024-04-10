export type Contract = {
    house_id: string | undefined;
    floor_id: string  | undefined;
    room_id: string | undefined;
    start_date: string;
    end_date: string;
    couting_fee_day:string;
    paying_cost_cycle: number;
    maximum_number_of_peoples: number;
    reference_cost: {
        deposit?: number;
        room_cost?: number;
        water_cost?: number;
        power_cost?: number;
        cost_per_person?: number;
        cost_per_room?: number;
      };
      [key: string]: any;
      tenant_id?: string;

};