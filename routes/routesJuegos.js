import { Router } from 'express';
import ControladorJuegos from '../Controller/ControladorJuegos.js';

const routes = Router();
const controlador = new ControladorJuegos();

routes.post('/juegos', controlador.registrarJuego);
routes.post('/ventas', controlador.registrarVenta);
routes.get('/juegos', controlador.listarInventario);
routes.get('/juegos/estadisticas', controlador.obtenerEstadisticas);

export default routes;
