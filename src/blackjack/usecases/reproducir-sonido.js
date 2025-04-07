/**
 * Función para reproducir sonidos
 * @param {String} rutaSonido - Ruta relativa del archivo de sonido
 */
export const reproducirSonido = (rutaSonido) => {
    const audio = new Audio(rutaSonido);
    audio.play();
};
