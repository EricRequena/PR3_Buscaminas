import { Casilla } from './Casilla.js';
export class Tablero {
    constructor(filas, columnas, numBombas) {
        this.filas = filas;
        this.columnas = columnas;
        this.numBombas = numBombas;
        this.matriz = [];
    }

    configurar(filas, columnas, numBombas) {
        this.filas = filas;
        this.columnas = columnas;
        this.numBombas = numBombas;
    }

    generarTablero() {
        this.matriz = [];
        for (let i = 0; i < this.filas; i++) {
            this.matriz[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                this.matriz[i][j] = new Casilla(i, j);
            }
        }
        this.colocarBombas();
        this.calcularBombasAdyacentes();
    }

    colocarBombas() {
        let bombasColocadas = 0;
        while (bombasColocadas < this.numBombas) {
            const fila = Math.floor(Math.random() * this.filas);
            const columna = Math.floor(Math.random() * this.columnas);
            if (!this.matriz[fila][columna].mina) {
                this.matriz[fila][columna].ponerMina();
                bombasColocadas++;
            }
        }
    }

    calcularBombasAdyacentes() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (!this.matriz[i][j].mina) {
                    let count = 0;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            const filaVecina = i + x;
                            const columnaVecina = j + y;
                            if (filaVecina >= 0 && filaVecina < this.filas && columnaVecina >= 0 && columnaVecina < this.columnas) {
                                if (this.matriz[filaVecina][columnaVecina].mina) {
                                    count++;
                                }
                            }
                        }
                    }
                    this.matriz[i][j].minasAdyacentes = count;
                }
            }
        }
    }

    destapaCasilla(row, col) {
        const casilla = this.matriz[row][col];
        if (!casilla.revelar && !casilla.marcada) {
            casilla.revelar = true;
            if (casilla.minasAdyacentes === 0 && !casilla.mina) {
                this.destapaVecinos(row, col);
            }
        }
    }

    destapaVecinos(row, col) {
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                const filaVecina = row + x;
                const columnaVecina = col + y;
                if (filaVecina >= 0 && filaVecina < this.filas && columnaVecina >= 0 && columnaVecina < this.columnas) {
                    this.destapaCasilla(filaVecina, columnaVecina);
                }
            }
        }
    }

    toggleBandera(row, col) {
        const casilla = this.matriz[row][col];
        casilla.bandera = !casilla.bandera;
    }

    verificarGanador() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                const casilla = this.matriz[i][j];
                if (!casilla.mina && !casilla.revelar) {
                    return false;
                }
            }
        }
        return true;
    }
}
