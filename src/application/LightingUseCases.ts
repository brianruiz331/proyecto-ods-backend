import { LightingDevice, LightingRepository } from '../domain/LightingDevice.js';

export class LightingUseCases {
  constructor(private lightingRepository: LightingRepository) {}

  async getDevices() {
    return await this.lightingRepository.getAll();
  }

  async createDevice(device: LightingDevice) {
    return await this.lightingRepository.create(device);
  }
}