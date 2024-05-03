export class Casilla {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mina = false;
        this.marcada = false;
        this.revelar = false;
        this.minasAdyacentes = 0;
        this.bandera = false;
    }

    ponerMina() {
        this.mina = true;
    }
}