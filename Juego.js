import { Tablero } from "./Tablero.js";
import { Jugador } from "./Jugador.js";
export class Juego {
    constructor() {
        this.tablero = null;
        this.jugador = null;
        this.gameOver = false;
    }

    initJuego(filas, columnas, numBombas) {
        this.tablero = new Tablero(filas, columnas, numBombas);
        this.tablero.generarTablero();
        this.jugador = new Jugador();
        this.crearTablaDOM();
    }

    configurar(filas, columnas, numBombas) {
        this.tablero.configurar(filas, columnas, numBombas);
    }

    crearTablaDOM() {
        const tableContainer = document.getElementById("board");
        tableContainer.innerHTML = "";
        for (let i = 0; i < this.tablero.filas; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < this.tablero.columnas; j++) {
                const cell = document.createElement("td");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", (event) => this.revelarCasilla(event));
                cell.addEventListener("contextmenu", (event) => this.colocarBandera(event));
                row.appendChild(cell);
            }
            tableContainer.appendChild(row);
        }
    }

    revelarCasilla(event) {
        if (this.gameOver) return;

        event.preventDefault();
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const casilla = this.tablero.matriz[row][col];

        if (event.button === 0) {
            if (casilla.mina) {
                this.gameOver = true;
                this.revelarBombas();
                alert("¡Has perdido!");
                return;
            }
        }

        this.tablero.destapaCasilla(row, col);
        this.actualizaTablaDOM();

        if (this.tablero.verificarGanador()) {
            alert("¡Felicidades, has ganado!");
        }
    }

    colocarBandera(event) {
        event.preventDefault();
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        this.tablero.toggleBandera(row, col);
        this.actualizaTablaDOM();
    }

    actualizaTablaDOM() {
        const tableContainer = document.getElementById("board");
        const cells = tableContainer.getElementsByTagName("td");
        for (let i = 0; i < cells.length; i++) {
            const row = parseInt(cells[i].dataset.row);
            const col = parseInt(cells[i].dataset.col);
            const casilla = this.tablero.matriz[row][col];
            if (casilla.revelar) {
                cells[i].classList.add("revelada");
                if (casilla.mina) {
                    cells[i].classList.add("mina");
                } else {
                    if (casilla.minasAdyacentes > 0){
                        cells[i].textContent = casilla.minasAdyacentes;
                    if(cells[i].textContent == 1){
                        cells[i].classList.add("uno");
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("uno");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("uno1");
                        }
                        else{
                            cells[i].classList.add("uno2");
                        }
                    }
                    if(cells[i].textContent == 2){
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("dos");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("dos1");
                        }
                        else{
                            cells[i].classList.add("dos2");
                        }
                    }
                    if(cells[i].textContent == 3){
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("tres");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("tres1");
                        }
                        else{
                            cells[i].classList.add("tres2");
                        }
                    }
                    if(cells[i].textContent == 4){
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("cuatro");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("cuatro1");
                        }
                        else{
                            cells[i].classList.add("cuatro2");
                        }
                    }
                    if(cells[i].textContent == 5){
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("cinco");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("zero2");
                        }
                        else{
                            cells[i].classList.add("zero3");
                        }
                    }
                    if(cells[i].textContent == 6){
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("seis");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("zero2");
                        }
                        else{
                            cells[i].classList.add("zero3");
                        }
                    }
                    if(cells[i].textContent == 7){
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("siete");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("zero2");
                        }
                        else{
                            cells[i].classList.add("zero3");
                        }
                    }
                    if(cells[i].textContent == 8){
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("ocho");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("zero2");
                        }
                        else{
                            cells[i].classList.add("zero3");
                        }
                    }
                    }
                    if (casilla.minasAdyacentes == 0){
                        if(row % 3 === 0 && col % 3 === 0){
                            cells[i].classList.add("zero1");
                        }
                        else if (row % 3 === 0){
                            cells[i].classList.add("zero2");
                        }
                        else{
                            cells[i].classList.add("zero3");
                        }
                    }
                }
            } else {
                cells[i].classList.remove("revelada");
                cells[i].textContent = "";
            }
            if (casilla.bandera && !casilla.revelar) {
                cells[i].textContent = "🚩";
                cells[i].classList.add("bandera");
            } else {
                cells[i].classList.remove("bandera");
            }
        }
    }
    

    revelarBombas() {
        const tableContainer = document.getElementById("board");
        const cells = tableContainer.getElementsByTagName("td");
        let index = 0;
        const revealNextBomb = () => {
            if (index < cells.length) {
                const cell = cells[index];
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                const casilla = this.tablero.matriz[row][col];
                if (casilla.mina) {
                    cell.classList.add("revelada", "mina");
                }
                index++;
                setTimeout(revealNextBomb, 5);
            }
        };
        revealNextBomb();
    }
    
}