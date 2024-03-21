export type HouseDetails = {
    house_id: string, 
    house_name: string,
    num_of_room: number,
    num_of_tenant: number,
    num_of_floor: number,
    num_of_device: number,
    floor: {
        floor_id: number,
        floor_name: string,
        num_of_room: number,
    }[],
}