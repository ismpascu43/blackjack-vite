/**
 * Muestra un mensaje en pantalla con animación
 * @param {String} texto Texto a mostrar
 * @param {String} tipo Clase CSS para el estilo (mensaje-victoria, mensaje-empate, mensaje-derrota)
 */
export const mostrarMensaje = (texto, tipo) => {
    // Obtener la referencia a juegoActivo del objeto window
    const juegoActivo =
        window.juegoActivo !== undefined ? window.juegoActivo : true;

    // No mostrar mensajes si el juego no está activo
    if (!juegoActivo) return;

    const mensajeResultado = document.querySelector("#mensaje-resultado");

    // Eliminar clases anteriores
    mensajeResultado.classList.remove(
        "mensaje-victoria",
        "mensaje-empate",
        "mensaje-derrota",
        "mensaje-oculto"
    );

    // Agregar clase según tipo de mensaje
    mensajeResultado.classList.add(tipo);

    // Establecer texto
    mensajeResultado.textContent = texto;

    // Reproducir sonido según el tipo de mensaje
    if (tipo === "mensaje-victoria") {
        const audio = new Audio("/assets/audio/win01.mp3");
        audio.play();
    } else if (tipo === "mensaje-empate") {
        const audio = new Audio("/assets/audio/matchedCards01.mp3");
        audio.play();
    } else if (tipo === "mensaje-derrota") {
        const audio = new Audio("/assets/audio/lost01.mp3");
        audio.play();
    }

    // Mostrar mensaje
    mensajeResultado.style.display = "block";

    // Ocultar después de 5 segundos
    const timerId = setTimeout(() => {
        // Verificar nuevamente si el juego sigue activo
        if (window.juegoActivo !== undefined && !window.juegoActivo) return;
        mensajeResultado.style.display = "none";
    }, 5000);

    // Agregar el timer al arreglo global de temporizadores
    if (window.temporizadoresActivos) {
        window.temporizadoresActivos.push(timerId);
    }
};
