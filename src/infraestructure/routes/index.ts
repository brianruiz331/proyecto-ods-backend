import { Router } from 'express';
import { LightingController, PostgresLightingRepository } from '../controllers/LightingController';

const router = Router();

// Instanciamos el repositorio y el controlador
const lightingRepository = new PostgresLightingRepository();
const lightingController = new LightingController(lightingRepository);

// Rutas mapeadas a los métodos del controlador
router.post('/lighting-devices', (req, res) => lightingController.createDevice(req, res));
router.get('/lighting-devices', (req, res) => lightingController.getDevices(req, res));

export default router;