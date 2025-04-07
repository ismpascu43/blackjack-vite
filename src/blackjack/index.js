import {
    crearDeck,
    pedirCarta,
    valorCarta,
    turnoCrupier,
    crearCartaHTML,
    mostrarMensaje,
} from "./usecases/index.js";

let deck = [];
let puntosJugador = 0,
    puntosComputadora = 0;

// Variables para controlar el estado del juego
window.juegoActivo = true;
window.temporizadoresActivos = [];

// Referencias del HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasCrupier = document.querySelector("#computadora-cartas");

const puntosHTML = document.querySelectorAll("small");

crearDeck();

// Eventos
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta(deck);

    // Reproducir sonido de carta
    const audioCartaNueva = new Audio("/assets/audio/card01.mp3");
    audioCartaNueva.play();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = crearCartaHTML(carta);
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        mostrarMensaje("¡Te has pasado!", "mensaje-derrota");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCrupier(
            puntosJugador,
            puntosHTML[1],
            divCartasCrupier,
            deck,
            window.temporizadoresActivos,
            window.juegoActivo
        );
    } else if (puntosJugador === 21) {
        mostrarMensaje("¡21, genial!", "mensaje-victoria");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCrupier(
            puntosJugador,
            puntosHTML[1],
            divCartasCrupier,
            deck,
            window.temporizadoresActivos,
            window.juegoActivo
        );
    }
});

btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoCrupier(
        puntosJugador,
        puntosHTML[1],
        divCartasCrupier,
        deck,
        window.temporizadoresActivos,
        window.juegoActivo
    );
});

btnNuevo.addEventListener("click", () => {
    console.clear();

    // Cancelar todos los temporizadores activos
    window.temporizadoresActivos.forEach((id) => clearTimeout(id));
    window.temporizadoresActivos = [];

    // Indicar que el juego actual debe detenerse
    window.juegoActivo = false;

    // Pequeño retraso para asegurar que todos los procesos pendientes se hayan cancelado
    setTimeout(() => {
        window.juegoActivo = true;

        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasCrupier.innerHTML = "";
        divCartasJugador.innerHTML = "";

        // Ocultar cualquier mensaje que esté visible
        const mensajeResultado = document.querySelector("#mensaje-resultado");
        mensajeResultado.style.display = "none";

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }, 100);
});
