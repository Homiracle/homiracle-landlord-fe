import { getClosestBreakpoint } from 'native-base/lib/typescript/theme/tools';
import { API } from '../base';
import { Contract, ContractDetails } from './interface';

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
      invalidatesTags: ['Contract'],
    }),
    getContractList: build.query<ContractDetails[], {house_id: string, floor_id:string, room_id: string, src: string}>({
      query: ({house_id,floor_id,room_id, src})=> `contracts/landlord?house_id=${house_id}&floor_id=${floor_id}&room_id=${room_id}&src=${src}`,
      providesTags:['Contract'],
    }),
    getContract: build.query<ContractDetails, string>({
      query: contract_id => `contracts/${contract_id}`
    }),
    getContractIdByRoomId: build.query<{ contract_id: string } | null, string>({
      query: room_id => `contracts/rooms/${room_id}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateContractMutation,
  useGetContractListQuery,
  useGetContractQuery,
  useGetContractIdByRoomIdQuery,
} = contractApi;
