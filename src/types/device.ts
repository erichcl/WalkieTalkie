type device = {
  deviceAddress: string;
  deviceName: string;
  isGroupOwner: boolean;
  primaryDeviceType: string;
  secondaryDeviceType: string | null | undefined;
  status: number;
};

export default device;
