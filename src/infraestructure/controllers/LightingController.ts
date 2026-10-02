import { Request, Response } from 'express';
import { LightingRepository, LightingDevice } from '../../domain/LightingDevice.js';
import { pool } from '../config/db.js';

// Implementación del repositorio usando PostgreSQL nativo
export class PostgresLightingRepository implements LightingRepository {
  async getAll(): Promise<LightingDevice[]> {
    const result = await pool.query('SELECT * FROM lighting_devices');
    return result.rows;
  }

  async create(device: LightingDevice): Promise<LightingDevice> {
    const { location, energyConsumption, status } = device;
    const result = await pool.query(
      'INSERT INTO lighting_devices (location, energy_consumption, status) VALUES ($1, $2, $3) RETURNING *',
      [location, energyConsumption, status]
    );
    return result.rows[0];
  }
}

// Controlador de Express
export class LightingController {
  constructor(private repository: PostgresLightingRepository) {}

  getDevices = async (req: Request, res: Response) => {
    try {
      const devices = await this.repository.getAll();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los dispositivos' });
    }
  };

  createDevice = async (req: Request, res: Response) => {
    try {
      const newDevice = await this.repository.create(req.body);
      res.status(201).json(newDevice);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el dispositivo' });
    }
  };
}