class Juego {
    static contadorId = 1; 

    constructor(nombre, categoria, precio, stock) {
        this.id = Juego.contadorId++; 
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
        this.vendidos = 0;
    }
}

export default Juego;
