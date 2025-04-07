/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tipos ejemplo: ["C", "D", "H", "S"]
 * @param {Array<String>} especiales ejemplo: ["A", "J", "Q", "K"]
 * @returns {Array<String>} retorna un nuevo deck de cartas
 */


export const crearDeck = () => {
    const tipos = ["C", "D", "H", "S"];
    const especiales = ["A", "J", "Q", "K"];
    let deck = [];

    // Añadir cartas numéricas (2-10)
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    // Añadir cartas especiales (A, J, Q, K)
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // Mezclar el mazo con el algoritmo Fisher-Yates
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    console.log(deck);
    return deck;
};

// export default crearDeck;