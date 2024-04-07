export type CreateDevice = {
    name: string,
    type: string,
    [key: string]: any,
};

export type CreateDeviceResponse = Partial<CreateDevice> & {
    device_id: string;
    status: string;
    path: string;
};