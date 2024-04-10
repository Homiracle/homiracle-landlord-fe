export type ContractDetails = {
    room_id: string;
    contract_id: number;
    start_date: string;
    end_date: string;
    couting_fee_day:string;
    paying_cost_cycle: string;
    maximmum_number_of_people: number;
    reference_cost: {
        deposit?: number;
        room_cost?: number;
        water_cost?: number;
        power_cost?: number;
        cost_per_person?: number;
        cost_per_room?: number;
      };
    tenant_id?: string;
    status: string;
}