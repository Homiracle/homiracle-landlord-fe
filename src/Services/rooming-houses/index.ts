import { API } from '../base';

export type RoomingHouse = {
  name: string;
  opening_hour: string;
  closing_hour: string;
  number_of_period_days: number;
  closing_money_date: number;
  start_receiving_money_date: number;
  end_receiving_money_date: number;
  address: {
    province: string;
    district: string;
    commune: string;
    street: string;
  };
  reference_cost: {
    deposit: number;
    water_cost: number;
    power_cost: number;
    cost_per_person: number;
    cost_per_room: number;
  };
  [key: string]: any;
};