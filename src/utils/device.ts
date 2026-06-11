const DEVICE_KEY = "groovelympics_device_id";

export const getDeviceId = (): string => {
  let deviceId = localStorage.getItem(DEVICE_KEY);

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, deviceId);
  }

  return deviceId;
};
