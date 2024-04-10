import { getClosestBreakpoint } from 'native-base/lib/typescript/theme/tools';
import { API } from '../base';
import {Contract,ContractDetails } from './interface'


export type ContractResponse = Partial<Contract> & {
    house_id: string;
  };
export type ContractMini = Partial<Contract> & {
    house_id: string;
    floor_id: string;
    room_id: string;
    reference_cost:{
      room_cost: number;
    }
};
const contractApi = API.injectEndpoints({
  endpoints: build => ({
    createContract: build.mutation<ContractResponse, Partial<Contract>>({
      query: data => ({
        url: 'contracts',
        method: 'POST',
        body: data,
      }),
    invalidatesTags: ['Contract'],
    }),
    getContractList: build.query<ContractDetails[], {house_id: string, floor_id:string, room_id: string}>({
      query: ({house_id,floor_id,room_id})=> `contracts?house_id=${house_id}&floor_id=${floor_id}&room_id=${room_id}`,
      providesTags:['Contract'],
    }),
    getContract: build.query<ContractMini, string>({
      query: contract_id => `contracts/${contract_id}`
    })


  }),
  overrideExisting: true,
});

export const {
  useCreateContractMutation,
  useGetContractListQuery,
  useGetContractQuery,
} = contractApi;
