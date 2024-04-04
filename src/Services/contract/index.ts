import { getClosestBreakpoint } from 'native-base/lib/typescript/theme/tools';
import { API } from '../base';
import {Contract } from './interface'


export type ContractResponse = Partial<Contract> & {
    house_id: string;
  };
  
const contractApi = API.injectEndpoints({
  endpoints: build => ({
    createContract: build.mutation<ContractResponse, Partial<Contract>>({
      query: data => ({
        url: 'contracts',
        method: 'POST',
        body: data,
      }),
    }),
    getContractList: build.query<ContractResponse, {house_id: string, floor_id:string,room_id: string}>({
      query: ({house_id,floor_id,room_id})=> `contracts?house_id=${house_id}&floor_id=${floor_id}&room_id=${room_id}`
    }),
    getContract: build.query<ContractResponse, string>({
      query: contract_id => `contracts.${contract_id}`
    })


  }),
  overrideExisting: true,
});

export const {
  useCreateContractMutation,
} = contractApi;
