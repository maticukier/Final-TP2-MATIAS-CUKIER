import ServicioJuegos from '../services/ServicioJuegos.js';

class ControladorJuegos {
    servicio = new ServicioJuegos();

    registrarJuego = async (req, res) => {
        try {
            const { nombre, categoria, precio, stock } = req.body;
            if (!nombre || !categoria || !precio || !stock) {
                return res.status(400).json({ errorMsg: 'Los datos ingresados no son válidos' });
            }

            const juego = await this.servicio.registrarJuegoServicio(nombre, categoria, precio, stock);
            res.status(201).json(juego);
        } catch (error) {
            res.status(500).json({ errorMsg: error.message || 'Hubo un problema al registrar el juego' });
        }
    };

    registrarVenta = async (req, res) => {
        try {
            const { id, cantidad } = req.body;
    
            if (!id || !cantidad) {
                return res.status(400).json({ errorMsg: 'Los datos ingresados no son válidos' });
            }
    
            if (typeof cantidad !== 'number' || cantidad <= 0) {
                return res.status(400).json({ errorMsg: 'La cantidad tiene que ser mayor a 0' });
            }
    
            const venta = await this.servicio.registrarVentaServicio(id, cantidad);
            res.status(201).json(venta);
        } catch (error) {
            console.error('Error en Controlador al registrar venta:', error.message);
            res.status(error.statusCode || 500).json({ errorMsg: error.message || 'Hubo un problema al registrar la venta' });
        }
    };
    
    listarInventario = async (req, res) => {
        try {
            const inventario = await this.servicio.listarInventarioServicio();
            res.status(200).json(inventario);
        } catch (error) {
            console.error('Error al listar el inventario:', error.message);
            res.status(500).json({ errorMsg: 'No se pudo obtener el inventario' });
        }
    };
    

    obtenerEstadisticas = async (req, res) => {
        try {
            const estadisticas = await this.servicio.obtenerEstadisticasServicio();
            res.status(200).json({ totalUnidadesVendidas: estadisticas });
        } catch (error) {
            console.error('Error al obtener estadísticas:', error.message); 
            res.status(404).json({ errorMsg: 'No se pudieron leer las estadisticcas' });
        }
    };
    

    obtenerEstadisticasPorCategoria = async (req, res) => {
        try {
            const estadisticasCategoria = await this.servicio.obtenerEstadisticasPorCategoriaServicio();
            res.status(200).json({ unidadesVendidasPorCategoria: estadisticasCategoria });
        } catch (error) {
            res.status(404).json({ errorMsg: 'No se pudieron leer las estadisticas por categoría' });
        }
    };
}

export default ControladorJuegos;
