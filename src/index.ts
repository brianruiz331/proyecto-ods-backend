import express, { Application } from 'express';
import dotenv from 'dotenv';
import { LightingController, PostgresLightingRepository } from './infraestructure/controllers/LightingController.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Instanciar arquitectura
const lightingRepo = new PostgresLightingRepository();
const lightingController = new LightingController(lightingRepo);

// Rutas
app.get('/api/lighting', lightingController.getDevices);
app.post('/api/lighting', lightingController.createDevice);

app.listen(PORT, () => {
  console.log(`Servidor ODS 13 corriendo en el puerto: ${PORT}`);
});