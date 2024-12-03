import Juego from '../models/Juego.js';
import JuegosDAO from '../dao/JuegosDAO.js';

class ServicioJuegos {
    dao = new JuegosDAO();

    async registrarJuegoServicio(nombre, categoria, precio, stock) {
        console.log('Validando los datos recibidos...', { nombre, categoria, precio, stock });

        if (typeof nombre !== 'string' || nombre.trim() === '') {
            throw new Error('El nombre debe ser una cadena de texto no vacía');
        }
        if (typeof categoria !== 'string' || categoria.trim() === '') {
            throw new Error('La categoría debe ser una cadena de texto no vacía');
        }
        if (typeof precio !== 'number' || precio <= 0) {
            throw new Error('El precio debe ser un número mayor que 0');
        }
        if (typeof stock !== 'number' || stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        const juego = new Juego(nombre, categoria, precio, stock);
        console.log('Juego validado:', juego);

        // Guardar el juego
        const juegoGuardado = await this.dao.registrarJuego(juego);
        console.log('Juego guardado:', juegoGuardado);
        return juegoGuardado;
    }
    async registrarVentaServicio(id, cantidad) {
        console.log('Validando los datos recibidos para la venta...', { id, cantidad });
    
        if (typeof id !== 'number' || id <= 0) {
            throw new Error('El ID debe ser un número mayor que 0');
        }
        if (typeof cantidad !== 'number' || cantidad <= 0) {
            throw new Error('La cantidad debe ser un número mayor que 0');
        }
    
        const venta = this.dao.registrarVenta(id, cantidad);
        console.log('Venta registrada:', venta);
        return venta;
    }
    async listarInventarioServicio() {
        try {
            const inventario = this.dao.obtenerInventario();
            console.log('Inventario obtenido:', inventario);
            return inventario;
        } catch (error) {
            console.error('Error en ServicioJuegos al obtener inventario:', error.message);
            throw new Error('No se pudo obtener el inventario');
        }
    }
    async obtenerEstadisticasServicio() {
        try {
            const estadisticas = this.dao.calcularEstadisticas();
            console.log('Estadísticas obtenidas:', estadisticas);
            return estadisticas;
        } catch (error) {
            console.error('Error en ServicioJuegos al obtener estadísticas:', error.message);
            throw new Error('No se pudieron obtener las estadísticas');
        }
    }
        }
    

export default ServicioJuegos;
