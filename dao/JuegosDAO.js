class JuegosDAO {
    juegos = [];

    registrarJuego = (juego) => { 
        try {
            if (!juego.nombre || !juego.categoria || !juego.precio || !juego.stock) 
                { throw new Error('Los datos ingresados no son válidos'); } 
            if (typeof juego.precio !== 'number' || juego.precio <= 0) 
                { throw new Error('El precio tiene que ser mayor a $0'); } 
            if (typeof juego.stock !== 'number' || juego.stock < 0) 
                { throw new Error('La cantidad de stock no puede ser negativa'); }
             this.juegos.push(juego); console.log('Juego registrado', juego); 
             return juego; } catch (error) 
             { console.error('Error en DAO al registrar juego:', error.message); throw error; } };

    registrarVenta = (id, cantidad) => {
        const juego = this.juegos.find(i => i.id === id);
        if (!juego) {
            throw { statusCode: 404, message: "Juego no encontrado" };
        }
        if (juego.stock < cantidad) {
            throw { statusCode: 400, message: "Stock insuficiente" };
        }
        juego.stock -= cantidad;
        juego.vendidos += cantidad;
        return juego;
    };

    obtenerInventario = () => {
        return this.juegos;
    };

    calcularEstadisticas = () => {
        const estadisticas = {
            unidadesVendidas: {}
        };
        this.juegos.forEach(juego => {
            estadisticas.unidadesVendidas[juego.categoria] = 
                (estadisticas.unidadesVendidas[juego.categoria] || 0) + juego.vendidos;
        });
        return estadisticas;
    };
}

export default JuegosDAO;
