export interface LightingDevice {
  id?: number;
  location: string;
  energyConsumption: number; // kWh
  status: 'active' | 'inactive' | 'optimized';
}

export interface LightingRepository {
  getAll(): Promise<LightingDevice[]>;
  create(device: LightingDevice): Promise<LightingDevice>;
}