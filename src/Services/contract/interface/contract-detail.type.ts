export type ContractDetails = {
    contract_id: string;
    cost: {
        cost_per_person: number;
        cost_per_room: number;
        deposit: number;
        power_cost: number;
        room_cost: number;
        water_cost: number;
    };
    couting_fee_day: string;
    createdAt: string;
    end_date: string;
    landlord: {
        CID: null | string;
        email: string;
        phone: string;
        user_id: string;
        user_name: string;
    };
    maximum_number_of_peoples: number;
    paying_cost_cycle: number;
    room: {
        name: string;
        rooming_house: {
            address: Record<string, any>; // Assuming the structure of address is not known
            name: string;
        };
    };
    start_date: string;
    status: string;
    tenant: {
        CID: null | string;
        email: string;
        phone: string;
        user_id: string;
        user_name: string;
    };
    updatedAt: string;
};

