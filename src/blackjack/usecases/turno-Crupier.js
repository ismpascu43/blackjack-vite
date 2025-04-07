import { pedirCarta, valorCarta, crearCartaHTML, mostrarMensaje } from "./";

/**
 *
 * @param {Number} puntosMinimos puntos minimos para ganar
 * @param {HTMLElement} puntosHTML elemento HTML para mostar los puntos
 * @param {HTMLElement} divCartasComputadora elemento HTML para mostar las cartas
 * @param {Array<String>} deck
 * @param {Array<Number>} temporizadoresActivos array para almacenar los IDs de los temporizadores
 * @param {Boolean} juegoActivo indica si el juego actual está activo
 */

export const turnoCrupier = (
    puntosMinimos,
    puntosHTML,
    divCartasComputadora,
    deck = [],
    temporizadoresActivos = [],
    juegoActivo = true
) => {
    if (!puntosMinimos) throw new Error("puntosMinimos es requerido");
    if (!puntosHTML) throw new Error("puntosHTML es requerido");
    let puntosComputadora = 0;

    const tomarCarta = () => {
        // Verificar si el juego sigue activo
        if (!juegoActivo) return;

        const carta = pedirCarta(deck);

        // Reproducir sonido de carta
        const audioCartaCrupier = new Audio("/assets/audio/card01.mp3");
        audioCartaCrupier.play();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML.innerText = puntosComputadora;

        const imgCarta = crearCartaHTML(carta);
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            return;
        }

        if (puntosComputadora < puntosMinimos && puntosMinimos <= 21) {
            const timerID = setTimeout(tomarCarta, 700);
            // Guardar el ID del temporizador para poder cancelarlo si es necesario
            temporizadoresActivos.push(timerID);
        } else {
            const timerID = setTimeout(() => {
                // Verificar si el juego sigue activo antes de mostrar el mensaje final
                if (!juegoActivo) return;

                if (puntosComputadora === puntosMinimos) {
                    mostrarMensaje("¡Empate!", "mensaje-empate");
                } else if (puntosMinimos > 21) {
                    mostrarMensaje("¡Crupier gana!", "mensaje-derrota");
                } else if (puntosComputadora > 21) {
                    mostrarMensaje("¡Jugador gana!", "mensaje-victoria");
                } else {
                    mostrarMensaje("¡Crupier gana!", "mensaje-derrota");
                }
            }, 100);

            // Guardar el ID del temporizador para poder cancelarlo si es necesario
            temporizadoresActivos.push(timerID);
        }
    };

    const timerID = setTimeout(tomarCarta, 700);
    // Guardar el ID del temporizador para poder cancelarlo si es necesario
    temporizadoresActivos.push(timerID);
};
